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

        // <! -- The Link chanigin -- >
        // console.log(card.links.find(card => card._id.toString() === '5eceb5d77366cf90f1ee1549'))
        // const myLink = card.links.find(card => card._id.toString() === '5eceb5d77366cf90f1ee1549');
        // myLink.subheader = 'jojo';

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

// change Card Links
// /api/data-change/card/links
exports.postLinks = async (req, res, next) => {
    try {
        const card = await Card.findOne({
            userId: req.userId
        })

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

// /api/data-change/card/single-link
exports.postSingleLink = async (req, res, next) => {
    try {
        let {
            id,
            header,
            subheader,
            href
        } = req.body;

        const card = await Card.findOne({
            userId: req.userId
        })

        const myLink = card.links.find(card => card.id === id);
        myLink.header = header;
        myLink.subheader = subheader;
        myLink.href = href;

        await card.save()

        res.status(201).json({
            message: 'Zmieniłeś dane na swoim linku!'
        })

    } catch (e) {
        if (!e.statusCode) e.statusCode = 500;
        next(e);
    }
}