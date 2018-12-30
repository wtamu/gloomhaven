const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const scenarioSchema = mongoose.Schema({
    scenarioId: String,
    number: Number,
    name: String,
    monsters: [{ type: ObjectId, ref: 'Monster' }],
});

scenarioSchema.pre('find', function (next) {
    this.populate('monsters');
    next();
});

scenarioSchema.pre('findOne', function (next) {
    this.populate('monsters');
    next();
});

scenarioSchema.methods.serialize = function (difficultyLevel = 0) {
    return {
        id: this._id,
        scenarioId: this.scenarioId,
        number: this.number,
        name: this.name,
        monsters: this.monsters.map(monster => monster.serialize(difficultyLevel)),
    };
};

const Scenario = mongoose.model("Scenario", scenarioSchema);

module.exports = { Scenario };