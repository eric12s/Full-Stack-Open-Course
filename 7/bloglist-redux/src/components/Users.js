import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Table from 'react-bootstrap/Table'
import { setUser } from '../reducers/userReducer'
import { useHistory, Link } from 'react-router-dom'

const Users = ({ users }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      dispatch(setUser(JSON.parse(loggedUserJSON)))
    } else
      history.push('/')
  }, [dispatch, history])

  return(
    <div>
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br />
      <Link to='/'>back</Link>
    </div>
  )
}

export default Users