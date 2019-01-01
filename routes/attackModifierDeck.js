const { AttackModifierDeck } = require('../models/attackModifierDeck');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('AttackModifierDeck at /');
});

module.exports = { router };