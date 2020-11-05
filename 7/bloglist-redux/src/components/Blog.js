import React from 'react'
import { useDispatch } from 'react-redux'
import { removeBlogAct } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Blog = ({ blog }) => {
  // const [ isVisable, setIsVisable ] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // const updateBlogLike = async () => {
  //   const newLikes = blog.likes += 1
  //   blog = {
  //     ...blog,
  //     likes: newLikes
  //   }
  //   dispatch(updateBlog(blog))
  // }

  const removeBlog = async () => {
    const ans = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ans) dispatch(removeBlogAct(blog))
  }

  // const hiddenBlog = () => (
  //   <div className='hiddenBlog'>
  //     {blog.title} {blog.author} <button onClick={() => setIsVisable(true)}>view</button>
  //   </div>
  // )

  const visableBlog = () => (
    <div className='visableBlog'>
      <Link to={`/blogs/${blog.id}`} >{blog.title} {blog.author}</Link>
      {/* <button onClick={() => setIsVisable(false)}>hide</button> */}
      {/* <br /> */}
      {/* {blog.url} */}
      {/* <br /> */}
      {/* {`likes ${blog.likes}`} <button onClick={() => updateBlogLike()}>like</button> */}
      <br />
      <Button variant="danger" size="sm" onClick={() => removeBlog()}>remove</Button>
    </div>
  )

  return(
    <div style={blogStyle} className='blog'>
      {/* {isVisable
        ? visableBlog()
        : hiddenBlog()} */}
      {visableBlog()}
    </div>)
}

export default Blog
