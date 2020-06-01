const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const config = require('config');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/svg+xml') {
        cb(null, true)
    } else {
        cb(null, false)
        const error = new Error('Niepoprawny format zdjęcia. Wybierz PNG, JPG, JPEG lub SVG');
        error.statusCode = 500;
        req.error = error;
    }
}

app.use(express.json({
    extended: true
}))
app.use(
    multer({
        storage: fileStorage,
        fileFilter
    }).single('photofile')
)
app.use(function (req, res, next) {
    if (req.error) throw req.error;
    next()
})
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/api/auth', require('./routes/auth.routes'));

app.use('/api/data-change', require('./routes/data-changes.routes'));

app.use('/api', require('./routes/link.routes'));


app.use((error, req, res, nest) => {
    console.log("\x1b[31m", error);
    const status = error.statusCode || 500;
    const message = error.message;
    // if we have express-validator errors
    if (error.validationErrors) {
        return res.status(status).json({
            errors: error.validationErrors,
            message
        });
    }
    // else
    res.status(status).json({
        message
    });
})

// starting the server
const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('MongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started at port ${PORT}`))
    } catch (e) {
        console.log('Error', e.message);
        process.exit();
    }
}

start()