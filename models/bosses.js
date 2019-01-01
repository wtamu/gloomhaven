const mongoose = require('mongoose');

const difficultyLevelSchema = mongoose.Schema({
    level: Number,
    health: Number,
    move: Number,
    attack: Number,
    range: Number,
    abilities: [String],
    immunities: [String],
    special1: String,
    special2: String,
});

const bossSchema = mongoose.Schema({
    name: String,
    deck: [{
        initiative: Number,
        description: String,
        reshuffle: Boolean,
    }],
    // array index represents difficulty levels (0...7)
    levels: [difficultyLevelSchema]
});

bossSchema.methods.serialize = function (difficultyLevel = 0) {
    return {
        id: this._id,
        name: this.name,
        deck: this.deck,
        level:      this.levels[difficultyLevel].level,
        health:     this.levels[difficultyLevel].health,
        movement:   this.levels[difficultyLevel].movement,
        attack:     this.levels[difficultyLevel].attack,
        range:      this.levels[difficultyLevel].range,
        abilities:  this.levels[difficultyLevel].abilities,
        immunities: this.levels[difficultyLevel].immunities,
        special1:   this.levels[difficultyLevel].special1,
        special2:   this.levels[difficultyLevel].special2,
    };
};

const Boss = mongoose.model("Boss", bossSchema);

module.exports = { Boss };