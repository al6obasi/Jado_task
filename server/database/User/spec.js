const app = require('../../../server.js')
const request = require('supertest')
const expect = require('chai').expect

describe('users', function () {

  it('Should create a new User', function (done) {
    request(app)
        .post('/api/signup')
        .send({
              "username":"anas",
              "password":"1234",
              "email":"anas@hotmail.com"
              }
              )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, resp) {
        if (err) {
          console.log(err)
        }
        expect(resp.body).to.be.an('object')
        done()
      })
  })
    it('Should retrive wrong password', function (done) {
    request(app)
        .post('/api/signin')
        .send([{
              "username":"anas",
              "password":"1222",
              "email":"anas@hotmail.com"
              }
              ])
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, resp) {
        if (err) {
          console.log(err)
        }
        expect(resp.body).to.be.an('string')
        done()
      })
  })
    it('Should retrive this user already exisits ', function (done) {
    request(app)
        .post('/api/signup')
        .send({
              "username":"anas",
              "password":"1222",
              "email":"anas@hotmail.com"
              }
              )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, resp) {
        if (err) {
          console.log(err)
        }
        expect(resp.body).to.be.an('string')
        done()
      })
  })
 
  it('Should retrive token as response ', function (done) {
    request(app)
      .post('/api/signin')
      .send([{
              "username":"anas",
              "password":"1234"
              }
              ])
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, resp) {
        if (err) {
          console.log(err)
        }
        expect(resp.body).to.be.an('object')
        expect(resp.body).to.have.property('token')
        done()
          .end(function (err, resp) {
            if (err) {
              throw new Error(err)
            }
          })
      })
      done()
  })
})