const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const expect = chai.expect;

const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL } = require('../config');
const { Monster } = require('../models/monsters');

chai.use(chaiHttp);

function seedMonsterData() {
    console.log('seeding monsters data...');
};

function tearDownDatabase() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
};

describe('Monsters API resource', function () {

    before(function () {
        return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function () {
        return seedMonsterData();
    });

    afterEach(function () {
        return tearDownDatabase();
    });

    after(function () {
        return closeServer();
    });

    describe('GET monsters', function () {
        it('should return all existing monsters', function () {
            return chai.request(app).get('/monsters')
                .then((res) => {
                    expect(res).to.have.status(200);
                });
        });
    });

});