import React from 'react'
import ItemSkeleton from '../Skeletons/ItemSkeleton'
import Post from './Post'

const PostList = ({ posts, isLoading = false }) => {
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
    <div className='gridPosts mx-[auto]'>
      {posts.map((item) => {
        return <Post key={item._id} post={item} />
      })}
    </div>
  )
}

export default PostList
