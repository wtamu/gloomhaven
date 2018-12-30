const { PORT, DATABASE_URL } = require('./config');

const express = require('express');

const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { router: monstersRouter } = require('./routes/monsters');
const { router: scenariosRouter } = require('./routes/scenarios');

const app = express();

app.use(express.json());
app.use(morgan('common'));

app.use('/monsters', monstersRouter);
app.use('/scenarios', scenariosRouter);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

let server;

function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            console.log('Connected to database');
            server = app.listen(port, () => {
                console.log(`Listening on port ${port}`);
                resolve();
            })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log("Closing server");
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
};

module.exports = { app, runServer, closeServer };