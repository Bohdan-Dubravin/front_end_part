import { Rating } from '@mui/material'
import React from 'react'
import imagePc from '../assets/images/image9.png'

const Item = () => {
  return (
    <div className='px-[20px] py-[10px] w-[240px] h-[350px] flex-col'>
      <img
        className='mx-auto w-[100%] mb-[10px]'
        src={imagePc}
        alt='item-img'
      />
      <h2 className='text-[13px] leading-[26px] mb-[10px]'>Title item PC</h2>
      <div className='flex items-center justify-between mb-[10px]'>
        <Rating
          name='half-rating'
          size='small'
          defaultValue={2.5}
          precision={0.5}
        />
        <p className='text-[#A2A6B0] text-[12px]'>Reviews (3)</p>
      </div>

      <h2 className='text-[18px] font-bold'>$499</h2>
    </div>
  )
}

export default Item
