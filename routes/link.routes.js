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

        if (link) {
            return res.json(link)
        }

        // res.status(404).json({
        //     message: 'Status 404: nie ma takiego linku.'
        // })

    } catch (e) {
        if (!e.statusCode) e.statusCode = 500;
        next(e);
    }
})

module.exports = router;