const {
    Router
} = require('express');

const isAuth = require('../middleware/is-auth');


const router = Router();

const CardDataController = require('../controllers/card-data');

// /api/data-change/card/profile
router.post(
    '/card/profile',
    isAuth,
    CardDataController.postProfile
)

// /api/data-change/get-data
router.get(
    '/get-data',
    isAuth,
    CardDataController.getData
)


module.exports = router;