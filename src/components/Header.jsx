import { Button, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import SearchIcon from '@mui/icons-material/Search'
import { useSelector } from 'react-redux'
const Header = () => {
  const [searh, setSearch] = useState('')
  const { role, username } = useSelector((state) => state.user)
  return (
    <header className='flex items-center justify-between h-[60px] border-b-2'>
      <Link className='block p-[15px]' to='/'>
        <img src={logo} alt='logo' />
      </Link>
      <nav className='flex items-center w-[300px] justify-between'>
        <NavLink
          className={(navData) => (navData.isActive ? 'active' : 'link')}
          to='/desktops'
        >
          Desktop PC
        </NavLink>
        <NavLink
          className={(navData) => (navData.isActive ? 'active' : 'link')}
          to='/services'
        >
          Services
        </NavLink>
        <NavLink
          className={(navData) => (navData.isActive ? 'active' : 'link')}
          to='/aboutus'
        >
          About us
        </NavLink>
      </nav>

      <div className='flex items-center'>
        <TextField
          className={`rounded-2xl w-[200px] font-semibold transition-all ${
            searh.length && 'w-[150%]'
          }`}
          id='filled-basic'
          label='Search'
          size='small'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to='/login'>
          <Button className='ml-[16px] font-bold bg-sky-500 text-white hover:bg-sky-600'>
            Login
          </Button>
        </Link>
        {role === 'admin' || role === 'manager' ? (
          <Link to='/register'>
            <Button
              className='ml-[16px] font-semibold'
              variant='outlined'
              color='secondary'
            >
              Register
            </Button>
          </Link>
        ) : (
          <Link to='/login'>
            <Button
              className='ml-[16px] font-semibold'
              variant='outlined'
              color='secondary'
            >
              Logout
            </Button>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
