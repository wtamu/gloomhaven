const mongoose = require('mongoose');

const bossSchema = mongoose.Schema({
    name: String,
    cards: [{
        name: String,
        initiative: Number,
        text: [String],
        reshuffle: Boolean,
    }],
    levels: [{
        level: Number,
        health: String,
        move: Number,
        attack: Number,
        range: Number,
        immunities: [String],
        special1: [String],
        special2: [String],
        notes: String
    }]
});

/**
 * Serialize the boss document into client-friendly format
 * level: Integer level of the boss, defaults 1
 */
bossSchema.methods.serialize = function (level = 1) {
    return {
        id: this._id,
        name: this.name,
        cards: this.cards,
        level:      this.levels[level].level,
        health:     this.levels[level].health,
        move:       this.levels[level].move,
        attack:     this.levels[level].attack,
        range:      this.levels[level].range,
        abilities:  this.levels[level].abilities,
        immunities: this.levels[level].immunities,
        special1:   this.levels[level].special1,
        special2:   this.levels[level].special2,
    };
};

const Boss = mongoose.model("Boss", bossSchema);

module.exports = { Boss };