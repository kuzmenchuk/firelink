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

// /api/data-change/card/links
router.post(
    '/card/links',
    isAuth,
    CardDataController.postLinks
)

// /api/data-change/get-data
router.get(
    '/get-data',
    isAuth,
    CardDataController.getData
)


module.exports = router;