import React from 'react'
import { NavLink } from 'react-router-dom'

export function AppHeader() {
  return (
    <header className='app-header'>
      <nav>
        <NavLink activeClassName='active-nav' exact to='/'>
          Home
        </NavLink>
        <NavLink activeClassName='active-nav' exact to='/contact'>
          Contacts
        </NavLink>
        <NavLink activeClassName='active-nav' exact to='/Statistic'>
          Stats
        </NavLink>
      </nav>
    </header>
  )
}
