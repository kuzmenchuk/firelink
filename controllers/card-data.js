const User = require('../models/User');
const Card = require('../models/Card');


// /api/data-change/get-data
exports.getData = async (req, res, next) => {
    try {

        const card = await Card.findOne({
            userId: req.userId
        })

        res.json({
            card
        })

    } catch (error) {
        console.log("\x1b[31m", 'Error 500!', error)
        res.status(500).json({
            message: 'Coś poszło nie tak... Spróbuj jeszcze raz.'
        })
    }
}


// change Card Profile
// /api/data-change/card/profile
exports.postProfile = async (req, res, next) => {
    try {

        const {
            fullname,
            description,
            photoUrl
        } = req.body;

        const card = await Card.findOne({
            userId: req.userId
        })


        card.profileAbout = {
            fullname,
            description,
            photoUrl
        }


        await card.save()

        console.log(card)

        res.status(201).json({
            message: 'Zmieniłeś dane na swoim linku!'
        })

    } catch (error) {
        console.log("\x1b[31m", 'Error 500!', error)
        res.status(500).json({
            message: 'Coś poszło nie tak... Spróbuj jeszcze raz.'
        })
    }
}