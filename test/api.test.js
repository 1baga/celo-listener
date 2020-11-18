const request = require('supertest')

const app = require('../src/app')

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        200,
        {
          message: 'V1-API good'
        },
        done
      )
  })
})

describe('GET /api/v1/wallet', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/wallet')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { status: 'good' }, done)
  })
})
