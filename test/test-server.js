const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);

describe('Server Tests', function () {

    before(function () {
        return runServer(TEST_DATABASE_URL);
    });

    after(function () {
        return closeServer();
    });

    it('should list items on GET', function () {
        return chai.request(app).get('/')
            .then(res => {
                expect(res).to.have.status(200);
            });
    });

});