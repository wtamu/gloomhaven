const mongoose = require('mongoose');

// const TYPES = new Set([
//     'Null',
//     '-2',
//     '-1',
//     '+0',
//     '+1',
//     '+2',
//     'x2',
//     // supplementary cards
//     'x2 - Bless',
//     'Null - Curse',
// ]);

const attackModifierDeckSchema = mongoose.Schema({
    type: String
});

const AttackModifierDeck = mongoose.model('AttackModifierDeck', attackModifierDeckSchema);

module.exports = { AttackModifierDeck };