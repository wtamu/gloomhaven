const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const difficultyLevelSchema = mongoose.Schema({
    health: Number,
    movement: Number,
    attack: Number,
    range: Number,
    abilities: [String],
    // Boss attributes
    immunities: [String],
    special1: String,
    special2: String,
});

const monsterSchema = mongoose.Schema({
    name: String,
    deck: [{
        initiative: Number,
        description: String,
        reshuffle: Boolean,
    }],
    // array index represents difficulty levels (0...7)
    levels: [difficultyLevelSchema]
});

monsterSchema.methods.serialize = function (difficultyLevel = 0) {
    return {
        id: this._id,
        name: this.name,
        deck: this.deck,
        level: difficultyLevel,
        health:     this.levels[difficultyLevel].health,
        movement:   this.levels[difficultyLevel].movement,
        attack:     this.levels[difficultyLevel].attack,
        range:      this.levels[difficultyLevel].range,
        abilities:  this.levels[difficultyLevel].abilities,
        // Boss attributes
        immunities: this.levels[difficultyLevel].immunities,
        special1:   this.levels[difficultyLevel].special1,
        special2:   this.levels[difficultyLevel].special2,
    };
};

const Monster = mongoose.model("Monster", monsterSchema);

module.exports = { Monster };