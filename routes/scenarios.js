const { Scenario } = require('../models/scenarios');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Scenarios at /')
})

module.exports = { scenariosRouter: router };