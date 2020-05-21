const {
    Router
} = require('express');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
    check,
    validationResult
} = require('express-validator');

const config = require('config');

const User = require('../models/User');

const router = Router();


// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Ups, ten email nie wygląda prawidłowo.').isEmail(),
        check('password', 'Minimalna długość hasła - 8 znaków').isLength({
            min: 8
        })
    ],
    async (req, res, next) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Nieprawidłowe dane rejestracji'
                })
            }

            const {
                email,
                password
            } = req.body;

            const uniqueEmailCheck = await User.findOne({
                email
            });

            if (uniqueEmailCheck) {
                res.status(400).json({
                    message: 'Mamy już taki email w bazie.'
                })
            }

            const HashedPassword = await bcrypt.hash(password, 11)
            const user = new User({
                email: email,
                password: HashedPassword
            })

            await user.save()

            res.status(201).json({
                message: 'Konto zostało stworzone!'
            })


        } catch (e) {
            res.status(500).json({
                message: 'Coś poszło innaczej, już pracujemy nad tym...'
            })
        }
    })

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Podaj proszę prawidłowy email').normalizeEmail().isEmail(),
        check('password', 'Podaj proszę hasło').exists()
    ],
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Nieprawidłowe dane logowania'
                })
            }

            const {
                email,
                password
            } = req.body;
            const user = await User.findOne({
                email
            });

            if (!user) {
                return res.status(400).json({
                    message: 'Podany email lub hasło jest nieprawdiłowe'
                })
            }

            const matchingPasswords = await bcrypt.compare(password, user.password);

            if (!matchingPasswords) {
                return res.status(400).json({
                    message: 'Podany email lub hasło jest nieprawdiłowe'
                })
            }

            const token = jwt.sign({
                    userId: user.id
                },
                config.get('jwtSecret'), {
                    expiresIn: '1h'
                }
            )

            res.json({
                token,
                userId: user.id,
                message: 'Zalogowałeś się pomyślnie!'
            })

        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Coś poszło innaczej, już pracujemy nad tym...'
            })
        }

    })

module.exports = router;