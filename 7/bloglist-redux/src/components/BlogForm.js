import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleBlogSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleBlogSubmit({
      title,
      author,
      url,
      likes: 0
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <label>
              title: <input id='title' type="text" name="name" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </label>
        <br />
        <label>
              author: <input id='author' type="text" name="name" value={author} onChange={(e) => setAuthor(e.target.value)}/>
        </label>
        <br />
        <label>
              url: <input id='url' type="text" name="name" value={url} onChange={(e) => setUrl(e.target.value)}/>
        </label>
        <br />
        <br />
        <button id='create-button' type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleBlogSubmit: PropTypes.func.isRequired

}

export default BlogForm