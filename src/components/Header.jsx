import { Button, InputAdornment, TextField } from '@mui/material'

import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import SearchIcon from '@mui/icons-material/Search'
import { useSelector } from 'react-redux'
import { logoutUser } from '../redux/slices/authSlice'
import AppUser from './AppUser'
import { useEffect, useState } from 'react'
const Header = () => {
  const { role, username, auth, status } = useSelector((state) => state.user)

  const [isAuth, setIsAuth] = useState(auth)

  useEffect(() => {
    setIsAuth(auth)
  }, [status, auth])

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
          to='/news'
        >
          News
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

      <div className='flex items-center relative'>
        <TextField
          className={`rounded-2xl w-[200px] font-semibold transition-all `}
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
        />

        {(role === 'admin' || role === 'manager') && (
          <Link to='/admin'>
            <Button
              size='small'
              className='ml-[16px] font-semibold text-[#fff] bg-[#d32f2f] mr-[10px]'
              variant='contained'
              color='error'
            >
              Admin Panel
            </Button>
          </Link>
        )}
        {!isAuth && (
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
        {!isAuth ? (
          <Link to='/login'>
            <Button className='ml-[16px] font-bold bg-sky-500 text-white hover:bg-sky-600'>
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
