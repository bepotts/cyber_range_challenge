/**
 * Test routes
 */

const request = require('supertest');


describe('loading express', () => {
  let server;
  beforeEach(() => {
    delete require.cache[require.resolve('../js/server')];
    server = require('../js/server');
  });

  afterEach(() => {
    console.log('server is about to be called');
    server.close();
    console.log('server was just called');
  });

  after(() => {
    server.close();
  });

  /* Test index route */
  describe('GET /', () => {
    it('responded with a html page', (done) => {
      request(server)
        .get('/')
        .expect('Content-Type', 'text/html; charset=UTF-8')
        .expect(200, done);
    });
  });
});

