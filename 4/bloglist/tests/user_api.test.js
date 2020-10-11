const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./user_test_helper')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  const userObjects = helper.initialUsers
    .map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

describe('get request for users', () => {
  test('users are returned as json and correct amount', async () => {
    const response = await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialUsers.length)
  })

  test('users are returned as with id defined', async () => {
    const response = await api.get('/api/users')
      
    expect(response.body[0].id).toBeDefined()
  })
})

describe('post request for users', () => {
  test('valid user can be added', async () => {
    await api
      .post('/api/users')
      .send(helper.validUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  })

  test('invalid user can\'t be sended', async () => {
    await api
      .post('/api/users')
      .send(helper.initialUsers[0])
      .expect(400)
      .expect(/error/)  
  })
})

describe('invalid user can\'t be added to database', () => {
  test('objects with missing properties are not saved', async () => {
    const initialLength = helper.usersInDb.length
    helper.initialUsers.map(async user => await api.post('/api/users').send(user).expect(400));
    expect(initialLength).toBe(helper.usersInDb.length);
  })
})

afterAll(() => {
  mongoose.connection.close()
})