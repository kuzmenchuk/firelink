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
            const error = new Error('Nieprawidłowe dane rejestracji');
            error.statusCode = 400;
            error.validationErrors = errors.array();
            throw error;
        }

        const {
            email,
            password,
            name,
            linkname
        } = req.body;

        const uniqueEmailCheck = await User.findOne({
            email
        });

        if (uniqueEmailCheck) {
            const error = new Error('Mamy już taki email w bazie');
            error.statusCode = 400;
            throw error;
        }

        const HashedPassword = await bcrypt.hash(password, 11)
        const user = new User({
            email: email,
            password: HashedPassword,
            createdAt: new Date()
        })


        const card = new Card({
            linkname: linkname,
            userId: user._id,
            profileAbout: {
                description: '',
                fullname: name,
                photoUrl: `${config.get('domen')}images/avatar_default.svg`
            },
            design: {
                background: {
                    color: '#8ED1FC',
                    isColor: true,
                    imageUrl: ''
                },
                branding: true
            }
        })

        const privateData = new UserPrivateData({
            userId: user._id,
            name: name
        })

        user.lastLogin = new Date();

        await card.save()
        await privateData.save()
        await user.save()

        const token = jwt.sign({
                userId: user.id
            },
            config.get('jwtSecret'), {
                expiresIn: '1h'
            }
        )

        res.status(201).json({
            token,
            userId: user.id,
            message: 'Konto zostało stworzone!'
        })


    } catch (e) {
        if (!e.statusCode) e.statusCode = 500;
        next(e);
    }
}

// login
exports.postLogin = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Nieprawidłowe dane logowania');
            error.statusCode = 400;
            error.validationErrors = errors.array();
            throw error;
        }

        const {
            email,
            password
        } = req.body;

        const user = await User.findOne({
            email
        });

        if (!user) {
            const error = new Error('Podany email lub hasło jest nieprawdiłowe');
            error.statusCode = 400;
            throw error;
        }

        const matchingPasswords = await bcrypt.compare(password, user.password);

        if (!matchingPasswords) {
            const error = new Error('Podany email lub hasło jest nieprawdiłowe');
            error.statusCode = 400;
            throw error;
        }

        user.lastLogin = new Date();
        await user.save()

        const token = jwt.sign({
                userId: user.id
            },
            config.get('jwtSecret'), {
                expiresIn: '1h'
            }
        )

        req.userId = user.id

        res.json({
            token,
            userId: user.id,
            message: 'Zalogowałeś się pomyślnie!'
        })

    } catch (e) {
        if (!e.statusCode) e.statusCode = 500;
        next(e);
    }

}