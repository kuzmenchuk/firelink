const {
    Router
} = require('express');

const router = Router();

const {
    check
} = require('express-validator');

const authController = require('../controllers/auth');


// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Ups, ten email nie wygląda prawidłowo.').normalizeEmail().isEmail(),
        check('password', 'Minimalna długość hasła - 8 znaków').isLength({
            min: 8
        }),
        check('linkname', 'Minimalna długość nazwy linku - 3 litery. Maksymalna - 25.').isLength({
            min: 3,
            max: 25
        }),
        check('fullname', 'Podaj proszę imię.').exists()
    ],
    authController.postSignup
)

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Podaj proszę prawidłowy email').normalizeEmail().isEmail(),
        check('password', 'Podaj proszę hasło').exists()
    ],
    authController.postLogin
)

module.exports = router;