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

// /api/data-change/card/design
router.post(
    '/card/design',
    isAuth,
    CardDataController.postDesign
)

// /api/data-change/card/links
router.post(
    '/card/links',
    isAuth,
    CardDataController.postLinks
)

// /api/data-change/card/single-link
router.post(
    '/card/single-link',
    isAuth,
    CardDataController.postSingleLink
)

// /api/data-change/card/products
router.post(
    '/card/products',
    isAuth,
    CardDataController.postProducts
)

// /api/data-change/card/single-product
router.post(
    '/card/single-product',
    isAuth,
    CardDataController.postSingleProduct
)

// /api/data-change/get-data
router.get(
    '/get-data',
    isAuth,
    CardDataController.getData
)


module.exports = router;