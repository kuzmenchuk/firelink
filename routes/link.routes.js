const {
    Router
} = require('express');
const Link = require('../models/Card');
const router = Router();

router.get('/:linkname', async (req, res, next) => {
    try {
        const link = await Link.findOne({
            linkname: req.params.linkname
        })

        if (req.params.linkname === 'profile' || req.params.linkname === 'login' || req.params.linkname === 'singup') return res.json(null)

        if (link) {
            return res.json(link)
        }

        res.status(404).json({
            message: 'Taka strona nie istnieje. Sprawdź poprawność linku.'
        })

    } catch (e) {
        if (!e.statusCode) e.statusCode = 500;
        next(e);
    }
})

module.exports = router;