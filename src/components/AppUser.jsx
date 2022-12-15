import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../redux/slices/authSlice'

const AppUser = () => {
  const [showNav, setShowNav] = useState(null)
  const { role, username, auth, avatarUrl, status } = useSelector(
    (state) => state.user
  )

  const [isAuth, setIsAuth] = useState(auth)

  useEffect(() => {
    setIsAuth(auth)
  }, [status])

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logout = () => {
    setIsAuth(false)
    setShowNav(false)
    dispatch(logoutUser())
    navigate('/')
  }

  if (!isAuth) {
    return
  }

  return (
    <Box className='cursor-pointer' sx={{ flexGrow: 0 }}>
      <Box onClick={(e) => setShowNav(e.currentTarget)}>
        <Tooltip sx={{ p: 0 }} title='Open settings'>
          <IconButton>
            <Avatar alt={username} src={`${avatarUrl}`} />
          </IconButton>
        </Tooltip>
        <ExpandMoreIcon />
      </Box>
      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={showNav}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(showNav)}
        onClose={() => setShowNav(false)}
      >
        <MenuItem onClick={logout}>
          <Typography className=' font-bold' textAlign='left'>
            Logout
          </Typography>
        </MenuItem>
        {/* <MenuItem onClick={() => setShowNav(false)}>
          <Typography className=" font-bold" textAlign="left">
            My posts
          </Typography>
        </MenuItem> */}
      </Menu>
    </Box>
  )
}

export default AppUser
