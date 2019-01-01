const mongoose = require('mongoose');

const difficultyLevelSchema = mongoose.Schema({
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
        level:      this.levels[difficultyLevel].level,
        health:     this.levels[difficultyLevel].health,
        movement:   this.levels[difficultyLevel].movement,
        attack:     this.levels[difficultyLevel].attack,
        range:      this.levels[difficultyLevel].range,
        abilities:  this.levels[difficultyLevel].abilities,
    };
};

const Monster = mongoose.model("Monster", monsterSchema);

module.exports = { Monster };