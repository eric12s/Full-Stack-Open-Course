const User = require('../models/user')

const initialUsers = [
  {
    username: 'ericsabagtest',
    name: 'Eric Sabag',
    passwordHash: '123456'
  },
  {
    username: 'ericsabag2test',
    name: 'Eric Sabag2',
    passwordHash: '654321'
  }
]

const validUser = {
  username: 'validTest',
  name: 'Valid Test',
  password: '123456'
}

const invalidUser = [{
    username: 'er',
    name: 'Eric Sabag',
    passwordHash: '123456'
  },
  {
    username: 'ericsabag4',
    name: 'Eric Sabag',
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return user.map(user => user.toJSON())
}

module.exports = {
  initialUsers, invalidUser, usersInDb, validUser
}