import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import ItemInfo from '../components/ItemInfo'
import CreateIcon from '@mui/icons-material/Create'
import { Paper } from '@mui/material'

const AdminDashboard = () => {
  return (
    <div className='relative w-[100%]'>
      <Paper
        variant='outlined'
        square
        className='fixed w-[200px] bg-neutral-100  top-[60px] bottom-0'
      >
        <NavLink
          to='/admin/users'
          className={(navData) => (navData.isActive ? 'active' : 'link')}
        >
          Users
        </NavLink>
        <NavLink
          to='/admin/products'
          className={(navData) => (navData.isActive ? 'active' : 'link')}
        >
          Products
        </NavLink>
        <NavLink
          to='/admin/posts'
          className={(navData) => (navData.isActive ? 'active' : 'link')}
        >
          Posts
        </NavLink>
        <NavLink
          to='/admin/createProduct'
          className={(navData) => (navData.isActive ? 'active' : 'link')}
        >
          Create product
        </NavLink>
        <NavLink
          to='/admin/createPost'
          className={(navData) => (navData.isActive ? 'active' : 'link')}
        >
          Create post
        </NavLink>
      </Paper>
      <div className='grid ml-[220px] gap-2 '>
        {/* <ItemInfo />
        <ItemInfo />
        <ItemInfo />
        <ItemInfo />
        <ItemInfo /> */}
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard
