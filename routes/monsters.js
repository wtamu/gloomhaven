const { Monster, Boss } = require('../models/monsters');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Monsters at /');
});

module.exports = { monstersRouter: router };