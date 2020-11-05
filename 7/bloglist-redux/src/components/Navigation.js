import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = ({ user, handleLogout }) => {
  return(
    <Navbar bg="primary" variant="dark">
      <Nav className="mr-auto">
        <Navbar.Brand  as={Link} to="/">
          blogs
        </Navbar.Brand>
        <Navbar.Brand  as={Link} to="/users">
          users
        </Navbar.Brand>
      </Nav>
      <Nav>
        <Navbar.Text>
          {user
            ? <em>{user.name} logged in <Button variant="danger" onClick={handleLogout}>logout</Button></em>
            : null
          }
        </Navbar.Text>
      </Nav>
    </Navbar>
  )
}

export default Navigation
