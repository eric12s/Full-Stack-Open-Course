import React, { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'

const User = ({ userToShow }) => {
  const history = useHistory()

  useEffect(() => {
    if (!userToShow)
      history.push('/users')
  }, [])

  if(!userToShow)
    return null

  return(
    <div>
      <h2>{userToShow.name}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {userToShow.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
      <Link to='/users'>back</Link>
    </div>
  )
}

export default User

