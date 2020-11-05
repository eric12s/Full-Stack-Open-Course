import React, { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogsList = ({ blogs }) => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const handleBlogSubmit = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
  }

  const compareLikes = (a, b) => b.props.blog.likes - a.props.blog.likes

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm handleBlogSubmit={handleBlogSubmit} />
    </Togglable>
  )

  return(
    <div>
      {blogForm()}
      <br />
      <div>
        {blogs.map(blog => <Blog
          key={blog.id}
          blog={blog}
        />
        ).sort(compareLikes)}
      </div>
    </div>
  )
}

export default BlogsList
