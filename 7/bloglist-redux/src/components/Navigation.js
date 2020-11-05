import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = ({ user, handleLogout }) => {
  const padding = {
    padding: 5,
  }

  return(
    <Navbar collapseOnSelect expand="lg" bg="light" variant="dark" style={{ 'backgroundColor': '#e3f2fd' }}>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {user
              ? <em>{user.name} logged in <button onClick={handleLogout}>logout</button></em>
              : null
            }
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
