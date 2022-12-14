import { Paper, Skeleton } from '@mui/material'
import React from 'react'

const TagsSkeleton = () => {
  return (
    <Paper className='mobile:hidden h-[400px] sticky w-[250px] top-[10px] right-0 ml-[10px]'>
      <Skeleton animation='wave' width='100%' height='20px' className='mt-3 ' />
      <Skeleton animation='wave' width='100%' height='20px' className='mt-3 ' />
      <Skeleton animation='wave' width='100%' height='20px' className='mt-3 ' />
      <Skeleton animation='wave' width='100%' height='20px' className='mt-3 ' />
      <Skeleton animation='wave' width='100%' height='20px' className='mt-3 ' />
    </Paper>
  )
}

export default TagsSkeleton
