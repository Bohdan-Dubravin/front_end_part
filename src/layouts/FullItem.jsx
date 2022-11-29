import { Paper, Rating } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getFullItem } from '../redux/slices/itemSlice'
import FullItemSkeleton from '../Skeletons/FullItemSkeleton'
import defaultImage from '../assets/images/default-image.jpg'

const FullItem = () => {
  const { id } = useParams()
  const { fullItem, status } = useSelector((state) => state.item)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFullItem(id))
  }, [dispatch])

  if (status) {
    return <FullItemSkeleton />
  }

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
  } = fullItem

  const imageUrl = Boolean(images.length)
    ? `http://localhost:5000${images[0]}`
    : defaultImage

  return (
    <Paper className='px-[20px] py-[10px] w-[100%] flex-col'>
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
      <div>{description}</div>
    </Paper>
  )
}

export default FullItem
