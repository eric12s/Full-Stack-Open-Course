import React, { useEffect } from 'react'
import blogs from '../services/blogs'
import { useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'
import { Link, useHistory } from 'react-router-dom'
import Comments from './Comments'
import { Button } from 'react-bootstrap'
import { HandThumbsUp, ArrowLeft } from 'react-bootstrap-icons';

const DetailedBlog = ({ blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!blog)
      history.push('/')
  }, [blog, history])

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
        {blog.likes} likes <Button size="sm" onClick={() => updateBlogLike()}><HandThumbsUp /></Button>
      </p>
      <Comments blog={blog} />
      <Link to='/'><ArrowLeft />back</Link>
    </div>
  )
}

export default DetailedBlog
