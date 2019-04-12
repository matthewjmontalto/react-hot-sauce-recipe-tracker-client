import React from 'react'
import { NavLink } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <NavLink to="/change-password">Change Password</NavLink>
    <NavLink to="/sign-out">Sign Out</NavLink>
    <NavLink to="/recipes">View Recipes</NavLink>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <NavLink to="/sign-up">Sign Up</NavLink>
    <NavLink to="/sign-in">Sign In</NavLink>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <NavLink to="/">Home</NavLink>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <h1>Hot Sauce Recipe Tracker</h1>
    <nav>
      { alwaysOptions }
      { user && <span>Welcome, {user.email}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
    </nav>
  </header>
)

export default Header
