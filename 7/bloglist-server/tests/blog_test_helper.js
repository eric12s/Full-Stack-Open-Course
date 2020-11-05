const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Eric Sabag',
    url: 'www',
    likes: 5
  },
  {

    title: 'Browser can execute only Javascript',
    author: 'Eric Sabag2',
    url: 'www.something',
    likes: 3
  }
]

const getNewUser = {
    username: "testtest",
    name: "test",
    password: "112233"
}

const loginUser = {
  username: "testtest",
  password: "112233"
}

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'Eric Sabag3', url: 'www/www', likes: 7 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, getNewUser, loginUser
}