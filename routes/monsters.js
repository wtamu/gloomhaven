const { AttackModifierDeck } = require('../models/attackModifierDeck');
const { Monster } = require('../models/monsters');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Monsters at /');
});

module.exports = { router };