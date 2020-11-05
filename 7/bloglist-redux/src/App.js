import React, { useState, useEffect } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
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
// import Form from 'react-bootstrap/Form'
import { Form, Button } from 'react-bootstrap'

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
  }, [dispatch])

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

  return (
    user === null
      ? (
        <div className="container">
          <h2>Log in to application</h2>
          <Notification />
          <Form onSubmit={handleClick}>
            <Form.Row>
              <Form.Label>username:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={username}
                onChange={changeUsername}
              />
              <Form.Label>password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={changePassword}
              />
            </Form.Row>
            <Button id='login-button' variant="primary" type="submit">login</Button>
          </Form>
        </div>
      )
      : (
        <div className="container">
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