import React from 'react'
import ItemSkeleton from '../Skeletons/ItemSkeleton'
import Item from './Item'

const ItemsList = ({ items, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className='gridItems mx-[auto]'>
        {Array(10)
          .fill(1)
          .map((_, i) => (
            <ItemSkeleton key={i} />
          ))}
      </div>
    )
  }

  return (
    <div className='gridItems mx-[auto]'>
      {items.map((item) => {
        return <Item key={item._id} item={item} />
      })}
    </div>
  )
}

export default ItemsList
