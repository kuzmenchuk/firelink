const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

const config = require('config');

const app = express();


app.use(express.json({
    extended: true
}))
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/api/auth', require('./routes/auth.routes'));

app.use('/api/data-change', require('./routes/data-changes.routes'));

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