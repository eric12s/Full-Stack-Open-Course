import React, { useEffect } from 'react'
import blogs from '../services/blogs'
import { useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'
import { Link, useHistory } from 'react-router-dom'
import Comments from './Comments'

const DetailedBlog = ({ blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!blog)
      history.push('/')
  }, [])

  const updateBlogLike = async () => {
    const newLikes = blog.likes += 1
    blog = {
      ...blog,
      likes: newLikes
    }
    dispatch(updateBlog(blog))
  }

  if(!blog)
    return null

  return(
    <div>
      <h2>{blogs.tite}</h2>
      <br />
      <p>
        {blog.url}
        <br />
        {blog.likes} likes <button onClick={() => updateBlogLike()}>like</button>
      </p>
      <Comments blog={blog} />
      <Link to='/'>back</Link>
    </div>
  )
}

export default DetailedBlog
