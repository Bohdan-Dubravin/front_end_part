import { Container } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import AdminDashboard from './layouts/AdminDashboard'
import CreateItem from './components/CreateItem'
import Home from './layouts/Home'
import Login from './layouts/Login'
import Register from './layouts/Register'
import PrivateRoute from './utils/PrivateRoute'
import CreatePost from './components/CreatePost'
import { useDispatch } from 'react-redux'
import { checkAuth } from './redux/slices/userSlice'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth())
    }
  }, [])
  return (
    <Container maxWidth='xl'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path='/admin' element={<AdminDashboard />}>
            <Route path='createProduct' element={<CreateItem />} />
            <Route path='createPost' element={<CreatePost />} />
          </Route>
        </Route>
      </Routes>
    </Container>
  )
}

export default App
