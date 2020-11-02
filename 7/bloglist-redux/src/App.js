import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [errColor, setErrColor] = useState('green')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleClick = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setErrorMessage(`Welcome, ${user.name}`)
      setErrColor('green')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (e){
      console.log(e)
      setErrorMessage('Can\'t log in!')
      setErrColor('red')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const changeUsername = (event) => {
    setUsername(event.target.value)
  }

  const changePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setErrorMessage('You logged out succesfully')
    setErrColor('green')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleBlogSubmit = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author}`)
        setErrColor('green')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }).catch(() => {
        setErrorMessage('Error!')
        setErrColor('red')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm handleBlogSubmit={handleBlogSubmit} />
    </Togglable>
  )

  const compareLikes = (a, b) => b.props.blog.likes - a.props.blog.likes

  return (
    user === null
      ? (
        <div>
          <h2>Log in to application</h2>
          <Notification message={errorMessage} />
          <form onSubmit={handleClick}>
            <label>
            username: <input id='username' type="text" name="name" value={username} onChange={changeUsername}/>
            </label>
            <br />
            <label>
            password: <input id='password' type="password" name="password" value={password} onChange={changePassword}/>
            </label>
            <br />
            <button id='login-button' type="submit">login</button>
          </form>
        </div>
      )
      : (
        <div>
          <h2>blogs</h2>
          <Notification message={errorMessage} color={errColor}/>
          <p>{user.name} is logged in <button onClick={handleLogout}>logout</button></p>
          <div>
            {blogForm()}
            <br />
            <div>
              {blogs.map(blog => <Blog
                key={blog.id}
                blog={blog}
                update={blogService.update}
                setErrorMessage={setErrorMessage}
                setErrColor={setErrColor}
                remove={blogService.remove}
                blogs={blogs}
                setBlogs={setBlogs}
              />
              ).sort(compareLikes)}
            </div>
          </div>
        </div>
      )
  )
}

export default App