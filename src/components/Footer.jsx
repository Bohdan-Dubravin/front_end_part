import { Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-[#232629] w-[100%] h-[60px] absolute  bottom-0  p-[10px]'>
      <a
        className='block text-center text-white font-bold'
        href='https://github.com/Bohdan-Dubravin/front_end_part/tree/develop'
        target='_blank'
      >
        See on Github
      </a>
      <a
        className='block text-center text-white font-bold'
        href='https://github.com/Bohdan-Dubravin/backend-online-shop/tree/develop'
        target='_blank'
      >
        Server part on Github
      </a>
    </footer>
  )
}

export default Footer
