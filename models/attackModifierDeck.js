const mongoose = require('mongoose');

const attackModifierDeckSchema = mongoose.Schema({
    type: String
});

const AttackModifierDeck = mongoose.Model('AttackModifierDeck', attackModifierDeckSchema);

module.exports = { AttackModifierDeck };