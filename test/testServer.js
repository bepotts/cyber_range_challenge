/**
 * Test routes
 */

import assert from 'assert';

const request = require('supertest');
const check = require('check-types');


describe('loading express', () => {
  let server;
  beforeEach(() => {
    delete require.cache[require.resolve('../js/server')];
    server = require('../js/server');
  });

  afterEach(() => {
    server.close();
  });

  after(() => {
    server.close();
  });

  /* Test index route */
  describe('Testing root route. GET /', () => {
    it('responded with a html page', (done) => {
      request(server)
        .get('/')
        .expect('Content-Type', 'text/html; charset=UTF-8')
        .expect(200, done);
    });
  });

  /* Test return of JSON file with Fahrenheit */
  describe('Testing JSON serves. GET /locations/:zipCode', () =>{
    it('returned a JSON file', (done) => {
      request(server)
        .get('/locations/24060')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err, res) => {
          if(err) {
            return done(err);
          }

          assert.equal(res.body.scale, 'Fahrenheit');
          check.assert.match(res.body.temperature, '\\d+');
          done();
        })
    });
  });
});

