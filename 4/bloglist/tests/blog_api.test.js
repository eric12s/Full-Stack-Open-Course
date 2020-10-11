const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./blog_test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('get request for blogs', () => {
  test('blogs are returned as json and correct amount', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs are returned as with id defined', async () => {
    const response = await api.get('/api/blogs')
      
    expect(response.body[0].id).toBeDefined()
  })
})

describe('post request for a new blog', () => {
  test('a valid blog can be added', async () => {
    const newUser = helper.getNewUser
    await api
      .post('/api/users')
      .send(newUser)
    
    const res = await api
      .post('/api/login')
      .send(helper.loginUser)
    
    const token = res.body.token
    const newBlog = {
      title: 'This is a new blog',
      author: 'Eric Sabag4',
      url: 'www',
      likes: 9
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `Bearer ${token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'This is a new blog'
    )
  })

  test('a blog without token can\'t be added', async () => {
    const newBlog = {
      title: 'This is a new blog',
      author: 'Eric Sabag4',
      url: 'www',
      likes: 9
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('bad blog won\'t be added', async () => {
    const newUser = helper.getNewUser
    await api
      .post('/api/users')
      .send(newUser)
    
    const res = await api
      .post('/api/login')
      .send(helper.loginUser)
    
    const token = res.body.token
    const newBlog = {
      author: 'Eric Sabag6',
      likes: 7
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `Bearer ${token}` })
      .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('default value of likes is 0', async () => {
    const newUser = helper.getNewUser
    await api
      .post('/api/users')
      .send(newUser)
    
    const res = await api
      .post('/api/login')
      .send(helper.loginUser)
    
    const token = res.body.token
    const newBlog = {
      title: 'No likes',
      author: 'Eric Sabag5',
      url: 'www',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `Bearer ${token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[2].likes).toBe(0)
  })
}) 

describe('delete request can be made', () => {
  test('blog can be deleted', async () => {
    const newUser = helper.getNewUser
    await api
      .post('/api/users')
      .send(newUser)
    
    const res = await api
      .post('/api/login')
      .send(helper.loginUser)
    
    const token = res.body.token

    const newBlog = {
      title: 'This is a new blog',
      author: 'Eric Sabag4',
      url: 'www',
      likes: 9
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `Bearer ${token}` })

      const blogsAtMiddle = await helper.blogsInDb()
      expect(blogsAtMiddle).toHaveLength(helper.initialBlogs.length + 1)

    const idToDelete = response.body.id
    await api
      .delete(`/api/blogs/${idToDelete}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(204)
    
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('put request for an existing blog', () => {
  test('blog\'s likes can be updated', async () => {
    const response = await api.get('/api/blogs')
    const idToUpdate = response.body[0].id

    await api
      .put(`/api/blogs/${idToUpdate}`)
      .send({ likes: 20 })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(20)
  })
})

afterAll(() => {
  mongoose.connection.close()
})