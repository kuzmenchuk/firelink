const {
    Schema,
    model,
    Types
} = require('mongoose');

const cardSchema = new Schema({
    linkname: {
        type: String,
        // required: true,
        // unique: true
    },
    design: {
        background: {
            color: {
                type: String
            },
            isColor: {
                type: Boolean
            },
            imageUrl: {
                type: String
            }
        },
        branding: {
            type: Boolean
        }
    },
    links: [{
        id: {
            type: String,
            // required: true
        },
        active: {
            type: Boolean
        },
        header: {
            type: String,
            // required: true
        },
        subheader: {
            type: String,
            // required: true
        },
        href: {
            type: String,
            // required: true
        }
    }],
    messengers: [{}],
    products: [{
        id: {
            type: String,
            // required: true
        },
        active: {
            type: Boolean
        },
        header: {
            type: String,
            // required: true
        },
        subheader: {
            type: String,
            //required: true
        },
        href: {
            type: String,
            //required: true
        },
        imageUrl: {
            type: String
        }
    }],
    profileAbout: {
        description: {
            type: String
        },
        fullname: {
            type: String,
            // required: true
        },
        photoUrl: {
            type: String
        }
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = model('Card', cardSchema)