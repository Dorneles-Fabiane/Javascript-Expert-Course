const { describe, it, after, before } = require('mocha');
const supertest = require('supertest');
const assert = require('assert');

describe('API test suite', () => {
  let app;
  before((done) => {
    app = require('./api');
    app.once('listening', done)
  })

  after(done => app.close(done))

  describe('/contact', () => {
    it('should request the contact route and return HTTP Status 200', async () => {
      const response = await supertest(app)
      .get('/contact')
      .expect(200)

      assert.strictEqual(response.text, 'contact our page')
    })
  })
  describe('/login:post', () => {
    it('should request the login route and return HTTP Status 200', async () => {
      const response = await supertest(app)
      .post('/login')
      .send({ username: "FabianeDorneles", password: "123"})
      .expect(200)

      assert.strictEqual(response.text, 'Login successful')
    })
    it('should request the login route and return HTTP Status 401', async () => {
      const response = await supertest(app)
      .post('/login')
      .send({ username: "wrongusername", password: "123"})
      .expect(401)

      assert.ok(response.unauthorized)
      assert.strictEqual(response.text, 'Unauthorized!')
    })
  })
  describe('/notExist:post', () => {
    it('should request a non existent route and return HTTP Status 404', async () => {
      const response = await supertest(app)
      .get('/notExist')
      .expect(404)

      assert.strictEqual(response.text, 'This route does not exist!')
    })
  })
})