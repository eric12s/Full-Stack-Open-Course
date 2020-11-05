import React, { useState, useEffect } from 'react'
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom'
import Notification from './components/Notification'
import userService from './services/users'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { loginUser, setUser } from './reducers/userReducer'
import User from './components/User'
import Users from './components/Users'
import BlogsList from './components/BlogsList'
import DetailedBlog from './components/DetailedBlog'
import Navigation from './components/Navigation'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await userService.getAll()
      setUsers(users)
    }
    fetchUsers()
  }, [blogs])

  const handleClick = async (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
  }

  const changeUsername = (event) => {
    setUsername(event.target.value)
  }

  const changePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
    dispatch(setNotification('You logged out succesfully', 'green', 5))
  }

  const match = useRouteMatch('/users/:id')
  const userToShow = match
    ? users.find(user => user.id === match.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogToShow = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null
  console.log(blogToShow)
  return (
    user === null
      ? (
        <div>
          <h2>Log in to application</h2>
          <Notification />
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
          <Navigation user={user} handleLogout={handleLogout} />
          <h2>blogs</h2>
          <Notification />
          <p>
            {/* {user.name} is logged in <button onClick={handleLogout}>logout</button> */}
            {/* &nbsp;<Link to='/users'>users</Link> */}
          </p>
          <Switch>
            <Route path='/users/:id'>
              <User userToShow={userToShow} />
            </Route>
            <Route path='/users'>
              <Users users={users}/>
            </Route>
            <Route path='/blogs/:id'>
              <DetailedBlog blog={blogToShow} />
            </Route>
            <Route path='/'>
              <BlogsList blogs={blogs}/>
            </Route>
          </Switch>
        </div>
      )
  )
}

export default App