const mongoose = require('mongoose');

const monsterSchema = mongoose.Schema({
    name: { type: String, unique: true, required: true },
    cards: [{
        name: String,
        initiative: Number,
        text: [String],
        reshuffle: Boolean,
    }],
    levels: [{
        level: Number,
        normal: {
            health: Number,
            move: Number,
            attack: Number,
            range: Number,
            abilities: [String],
        },
        elite: {
            health: Number,
            move: Number,
            attack: Number,
            range: Number,
            abilities: [String],
        }
    }]
});

/**
 * Serialize the monster document into client-friendly format
 * level: Integer level of the monster, defaults 1
 */
monsterSchema.methods.serialize = function (level = 1) {
    return {
        id: this._id,
        name: this.name,
        cards: this.cards,
        level: this.levels[level].level,
        normal: this.levels[level].normal,
        elite: this.levels[level].elite,
    }
};

const Monster = mongoose.model("Monster", monsterSchema);

module.exports = { Monster };