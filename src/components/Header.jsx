import { Button, InputAdornment, TextField } from '@mui/material'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import SearchIcon from '@mui/icons-material/Search'
import { useSelector } from 'react-redux'
import AppUser from './AppUser'
import { useEffect, useState } from 'react'
const Header = () => {
  const { role, username, auth, status } = useSelector((state) => state.user)

  return (
    <header className='flex items-center justify-between  h-[60px] border-b-2'>
      <Link className='block p-[15px] mr-[20px]' to='/'>
        <img src={logo} alt='logo' />
      </Link>
      <nav className='flex  items-center w-[150px] justify-between mr-[auto]'>
        {/* <NavLink
          className={(navData) => (navData.isActive ? 'active' : 'link')}
          to='/desktops'
        >
          Desktop PC
        </NavLink> */}
        <NavLink
          className={(navData) => (navData.isActive ? 'active' : 'link')}
          to='/'
        >
          News
        </NavLink>
        {/* <NavLink
          className={(navData) => (navData.isActive ? 'active' : 'link')}
          to="/services"
        >
          Services
        </NavLink> */}
        <NavLink
          className={(navData) => (navData.isActive ? 'active' : 'link')}
          to='/aboutus'
        >
          About us
        </NavLink>
      </nav>

      <div className='flex items-center relative'>
        {/* <TextField
          className={`rounded-2xl w-[200px] font-semibold transition-all `}
          id="filled-basic"
          label="Search"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        /> */}

        {(role === 'admin' || role === 'manager') && (
          <Link to='/admin/posts'>
            <Button
              size='small'
              className='mx-[20px] font-semibold text-[#fff] bg-[#d32f2f] mr-[10px]'
              variant='contained'
              color='error'
            >
              Admin Panel
            </Button>
          </Link>
        )}
        {!auth && (
          <Link to='/register'>
            <Button
              className='ml-[16px] font-semibold'
              variant='outlined'
              color='secondary'
            >
              Register
            </Button>
          </Link>
        )}
        {!auth ? (
          <Link to='/login'>
            <Button className='mx-[20px] font-bold bg-sky-500 text-white hover:bg-sky-600'>
              Login
            </Button>
          </Link>
        ) : (
          <AppUser />
        )}
      </div>
    </header>
  )
}

export default Header
