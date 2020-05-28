const User = require('../models/User');
const Card = require('../models/Card');

const config = require('config');


// /api/data-change/get-data
exports.getData = async (req, res, next) => {
    try {

        const card = await Card.findOne({
            userId: req.userId
        })

        res.json({
            card
        })

    } catch (e) {
        if (!e.statusCode) e.statusCode = 500;
        next(e);
    }
}


// change Card Profile
// /api/data-change/card/profile
exports.postProfile = async (req, res, next) => {
    try {

        let {
            fullname,
            description,
            photoUrl
        } = req.body;

        if (req.file) {
            req.file.path ? photoUrl = config.get('domen') + req.file.path : null
        }

        const card = await Card.findOne({
            userId: req.userId
        })

        card.profileAbout = {
            fullname,
            description,
            photoUrl
        }


        await card.save()

        res.status(201).json({
            message: 'Zmieniłeś dane na swoim linku!'
        })

    } catch (e) {
        if (!e.statusCode) e.statusCode = 500;
        next(e);
    }
}

// change Card Profile
// /api/data-change/card/links
exports.postLinks = async (req, res, next) => {
    try {
        const card = await Card.findOne({
            userId: req.userId
        })

        // const linkTTT = {
        //     id: '111',
        //     header: 'link',
        //     subheader: 'subheader',
        //     href: '/'
        // }
        // card.links.push(linkTTT)
        card.links = req.body;

        await card.save()

        res.status(201).json({
            message: 'Zmieniłeś dane na swoim linku!'
        })

    } catch (e) {
        if (!e.statusCode) e.statusCode = 500;
        next(e);
    }
}