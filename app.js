const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({
    extended: true
}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/api/auth', require('./routes/auth.routes'));

const config = require('config');
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