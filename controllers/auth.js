const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
    validationResult
} = require('express-validator');

const config = require('config');

const User = require('../models/User');
const Card = require('../models/Card');
const UserPrivateData = require('../models/UserPrivateData');

// signup
exports.postSignup = async (req, res, next) => {
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
            password: HashedPassword,
            createdAt: new Date()
        })


        const card = new Card({
            linkname: '',
            userId: user._id,
            profileAbout: {
                description: '',
                fullname: 'Your name',
                photoUrl: 'https://mssg.me/static/avatars/avatar_default.svg'
            },
            design: {
                background: {
                    color: 'linear-gradient(135deg, rgb(81, 179, 247) 0%, rgba(81, 179, 247, 0.6) 100%)',
                    isColor: true,
                    imageName: '',
                    imageUrl: ''
                },
                branding: true
            }
        })

        const privateData = new UserPrivateData({
            userId: user._id
        })

        await card.save()
        await privateData.save()
        await user.save()

        res.status(201).json({
            message: 'Konto zostało stworzone!'
        })


    } catch (e) {
        console.log("\x1b[31m", 'Error 500!', e)
        res.status(500).json({
            message: 'Coś poszło nie tak, już pracujemy nad tym...'
        })
    }
}

// login
exports.postLogin = async (req, res, next) => {
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

        user.lastLogin = new Date();
        await user.save()

        const card = await Card.findOne({
            userId: user._id
        })

        const token = jwt.sign({
                userId: user.id
            },
            config.get('jwtSecret'), {
                expiresIn: '1h'
            }
        )

        req.userId = user.id

        res.json({
            card,
            token,
            userId: user.id,
            message: 'Zalogowałeś się pomyślnie!'
        })

    } catch (e) {
        console.log("\x1b[31m", 'Error 500!', e)
        res.status(500).json({
            message: 'Coś poszło innaczej, już pracujemy nad tym...'
        })
    }

}

// logout
exports.postLogout = async (req, res, next) => {
    try {
        res.json({
            message: 'Wylogowałeś się pomyślnie!'
        })

    } catch (e) {
        console.log("\x1b[31m", 'Error 500!', e)
        res.status(500).json({
            message: 'Coś poszło innaczej, już pracujemy nad tym...'
        })
    }
}