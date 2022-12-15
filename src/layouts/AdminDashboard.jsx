import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

const AdminDashboard = () => {
  return (
    <div className="relative flex w-[100%] px-[20px] ">
      <Box
        variant="outlined"
        square
        className="sticky w-[200px] top-[60px] left-[20px] sticky_full bg-[#3878b4eb] px-2"
      >
        <NavLink
          to="/admin/users"
          className={(navData) =>
            navData.isActive ? 'active-dash' : 'link-dash'
          }
        >
          Users
        </NavLink>
        {/* <NavLink
          to="/admin/products"
          className={(navData) =>
            navData.isActive ? 'active-dash' : 'link-dash'
          }
        >
          Products
        </NavLink> */}
        <NavLink
          to="/admin/posts"
          className={(navData) =>
            navData.isActive ? 'active-dash' : 'link-dash'
          }
        >
          Posts
        </NavLink>
        <NavLink
          to="/admin/createProduct"
          className={(navData) =>
            navData.isActive ? 'active-dash' : 'link-dash'
          }
        >
          Create product
        </NavLink>
        <NavLink
          to="/admin/createPost"
          className={(navData) =>
            navData.isActive ? 'active-dash' : 'link-dash'
          }
        >
          Create post
        </NavLink>
      </Box>
      <div className="ml-[20px] w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
