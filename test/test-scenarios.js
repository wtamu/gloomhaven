const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const expect = chai.expect;

const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL } = require('../config');
const { Scenario } = require('../models/scenarios');

chai.use(chaiHttp);

function seedScenariosData() {
    console.log('seeding scenarios data...');
};

function tearDownDatabase() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
};

describe('Scenarios API resource', function () {

    before(function () {
        return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function () {
        return seedScenariosData();
    });

    afterEach(function () {
        return tearDownDatabase();
    });

    after(function () {
        return closeServer();
    });

    describe('GET scenarios', function () {
        it('should return all existing scenarios', function () {
            return chai.request(app).get('/scenarios')
                .then((res) => {
                    expect(res).to.have.status(200);
                });
        });
    });

});