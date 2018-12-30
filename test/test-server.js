const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Server Tests', function () {

    before(function () {
        return runServer();
    });

    after(function () {
        return closeServer();
    });

    it('should list items on GET', function () {
        return chai.request(app).get('/')
            .then(res => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;

                const expectedKeys = ['id', 'msg'];
                expect(res.body).to.include.keys(expectedKeys);
            });
    });

});