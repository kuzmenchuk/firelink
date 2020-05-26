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
        check('email', 'Ups, ten email nie wygląda prawidłowo.').isEmail(),
        check('password', 'Minimalna długość hasła - 8 znaków').isLength({
            min: 8
        })
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