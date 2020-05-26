const {
    Schema,
    model,
    Types
} = require('mongoose');



const userPrivateDataSchema = new Schema({
    lang: {
        type: String,
        // required: true
    },
    name: {
        type: String,
        // required: true
    },
    category: {
        type: String,
        // required: true
    },
    billing: {
        paid: {
            type: Boolean,
            // required: true
        },
        period: {
            type: Date,
            // required: true
        },
        plan: {
            type: String,
            // required: true
        },
        trialStart: {
            type: Date
        },
        trialEnd: {
            type: Date
        }
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = model('UserPrivateData', userPrivateDataSchema)