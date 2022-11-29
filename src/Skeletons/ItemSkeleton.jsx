import { Card, Skeleton } from '@mui/material'
import React from 'react'

const ItemSkeleton = () => {
  return (
    <Card className='px-[20px] py-[10px] w-[240px] h-[350px] flex-col'>
      <div className='mx-auto w-[100%] h-[200px] mb-[10px]'>
        <Skeleton
          variant='rectangular'
          animation='wave'
          width='100%'
          height='100%'
          className='rounded'
        />
      </div>
      <Skeleton
        animation='wave'
        className='text-[13px] leading-[26px] mb-[10px]'
      />
      <Skeleton
        animation='wave'
        className='text-[13px] leading-[26px] mb-[10px]'
      />
      <Skeleton animation='wave' className='text-[18px]   ' />
    </Card>
  )
}

export default ItemSkeleton
