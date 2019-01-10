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
    this.populate('bosses');
    next();
});

scenarioSchema.pre('findOne', function (next) {
    this.populate('monsters');
    this.populate('bosses');
    next();
});

/**
 * Serialize the scenario document into client-friendly format
 * level: Integer level of the monsters and bosses, defaults 1
 */
scenarioSchema.methods.serialize = function (level = 1) {
    // Serialize monster and boss subdocuments
    const monsters = this.monsters.map(monster => monster.serialize(level));
    const bosses = this.bosses.map(boss => boss.serialize(level));

    return {
        id: this._id,
        scenarioId: this.scenarioId,
        number: this.number,
        name: this.name,
        monsters: monsters.concat(bosses)
    }
};

const Scenario = mongoose.model("Scenario", scenarioSchema);

module.exports = { Scenario };