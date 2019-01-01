const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const scenarioSchema = mongoose.Schema({
    scenarioId: String,
    number: Number,
    name: String,
    monsters: [{ type: ObjectId, ref: 'Monster' }],
    bosses: [{ type: ObjectId, ref: 'Boss' }]
});

scenarioSchema.pre('find', function (next) {
    this.populate('monsters');
    next();
});

scenarioSchema.pre('findOne', function (next) {
    this.populate('monsters');
    next();
});

scenarioSchema.pre('find', function (next) {
    this.populate('bosses');
    next();
});

scenarioSchema.pre('findOne', function (next) {
    this.populate('bosses');
    next();
});

scenarioSchema.methods.serialize = function (difficultyLevel = 0) {
    // Serialize monster and boss documents
    const monsters = this.monsters.map(monster => monster.serialize(difficultyLevel));
    const bosses = this.bosses.map(boss => boss.serialize(difficultyLevel));

    return {
        id: this._id,
        scenarioId: this.scenarioId,
        number: this.number,
        name: this.name,
        monsters: monsters.concat(bosses)
    };
};

const Scenario = mongoose.model("Scenario", scenarioSchema);

module.exports = { Scenario };