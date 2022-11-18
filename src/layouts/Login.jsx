import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/slices/userSlice'

const Login = () => {
  const { role, username } = useSelector((state) => state.user)
  const [info, setInfo] = useState({ username: '', password: '' })
  const dispatch = useDispatch()
  const handleChange = (e) => {
    const value = e.target.value
    setInfo((prev) => {
      return { ...prev, [e.target.name]: value }
    })
  }

  const login = async () => {
    console.log(info)
    dispatch(loginUser(info.username, info.password))
  }

  return (
    <Paper className='mx-auto w-[320px] mt-[20%] p-[20px]'>
      <Typography className='text-center mb-[10px]' variant='h6'>
        Login
      </Typography>
      <TextField
        className='mb-[10px]'
        label='User Name'
        size='small'
        error
        name='username'
        helperText='Неверно указана почта'
        fullWidth
        value={info.username}
        onChange={(e) => handleChange(e)}
      />
      <TextField
        size='small'
        label='Password'
        className='mb-[10px]'
        fullWidth
        name='password'
        value={info.password}
        onChange={(e) => handleChange(e)}
        type='password'
      />
      <Button
        className='font-bold bg-sky-500 text-white hover:bg-sky-600'
        size='large'
        variant='outline'
        fullWidth
        onClick={() => login()}
      >
        Login
      </Button>
    </Paper>
  )
}

export default Login
