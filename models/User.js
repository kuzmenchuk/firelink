const {
    Schema,
    model,
    Types
} = require('mongoose');



const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    lastLogin: {
        type: Date
    },
    cardData: {
        type: Types.ObjectId,
        ref: 'Card'
    },
    userPrivateData: {
        type: Types.ObjectId,
        ref: 'UserPrivateData'
    }
});

module.exports = model('User', userSchema)