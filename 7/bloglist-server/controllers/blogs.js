const { request, response } = require('express')
const jwt = require('jsonwebtoken')

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    ...request.body,
    user: user._id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)
  if(blog.user.toString() !== user.id)
    return response.status(401).json({ error: 'This isn\' your blog!' })
  
  const toDelete = await Blog.findByIdAndRemove(request.params.id)
  toDelete
    ? response.status(204).end()
    : response.status(404).end()
})

blogsRouter.put('/:id/comments', async (request, response) => {
  const body = request.body

  const blog = {
    comments: body.comments
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidator: true })
  response.json(updatedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidator: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter
