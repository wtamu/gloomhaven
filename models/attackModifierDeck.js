const mongoose = require('mongoose');

const attackModifierDeckSchema = mongoose.Schema({
    type: String
});

const AttackModifierDeck = mongoose.model('AttackModifierDeck', attackModifierDeckSchema);

module.exports = { AttackModifierDeck };