import { Card, Rating } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import defaultImage from '../assets/images/default-image.jpg'

const Item = ({ item }) => {
  const {
    title,
    description,
    images,
    price,
    CPU,
    GPU,
    RAM,
    storage,
    powerSuplay,
    inStock,
    comments,
    _id,
  } = item

  const imageUrl = images.length
    ? `${process.env.REACT_APP_BASE_URL}${images[0]}`
    : defaultImage

  return (
    <Card className='px-[20px] py-[10px] w-[240px] h-[350px] flex-col'>
      <Link to={`/desktops/${_id}`}>
        <img
          className='mx-auto w-[100%] h-[200px] mb-[10px] object-cover'
          src={imageUrl}
          alt='item-img'
        />

        <h2 className='text-[13px] leading-[26px] mb-[10px]'>{title}</h2>
        <div className='flex items-center justify-between mb-[10px]'>
          <Rating
            name='half-rating'
            size='small'
            defaultValue={2.5}
            precision={0.5}
          />
          <p className='text-[#A2A6B0] text-[12px]'>Reviews (3)</p>
        </div>

        <h2 className='text-[18px] font-bold'>${price}</h2>
      </Link>
    </Card>
  )
}

export default Item
