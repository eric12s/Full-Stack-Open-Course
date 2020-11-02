import React, { useState } from 'react'

const Blog = ({ blog, update,  setErrorMessage, setErrColor, remove, blogs, setBlogs }) => {
  const [ isVisable, setIsVisable ] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateBlog = async () => {
    const newLikes = blog.likes += 1
    blog = {
      ...blog,
      likes: newLikes
    }
    try {
      await update(blog, blog.id)
      setBlogs(blogs.filter((item) => item.id !== blog.id).concat(blog))
    } catch(err) {
      blog.likes -= 1
      setErrorMessage(`Can't add a like to ${blog.title}!`)
      setErrColor('red')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const removeBlog = async () => {
    const ans = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ans) {
      try {
        await remove(blog.id)
        setBlogs(blogs.filter((item) => item.id !== blog.id))
        setErrorMessage(`${blog.title} is removed successfully!`)
        setErrColor('green')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      } catch(err) {
        setErrorMessage(`You can't remove ${blog.title}!`)
        setErrColor('red')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  const hiddenBlog = () => (
    <div className='hiddenBlog'>
      {blog.title} {blog.author} <button onClick={() => setIsVisable(true)}>view</button>
    </div>
  )

  const visableBlog = () => (
    <div className='visableBlog'>
      {blog.title} <button onClick={() => setIsVisable(false)}>hide</button>
      <br />
      {blog.url}
      <br />
      {`likes ${blog.likes}`} <button onClick={() => updateBlog()}>like</button>
      <br />
      {blog.author}
      <br />
      <button onClick={() => removeBlog()}>remove</button>
    </div>
  )

  return(
    <div style={blogStyle} className='blog'>
      {isVisable
        ? visableBlog()
        : hiddenBlog()}
    </div>)
}

export default Blog
