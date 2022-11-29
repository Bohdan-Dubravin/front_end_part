import { Card, List, Rating, Typography } from '@mui/material'
import { createRoutesFromElements, Link, useParams } from 'react-router-dom'
import defaultImage from '../assets/images/default-image.jpg'
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import { useEffect, useState } from 'react'
import api from '../api/config'
import CreatePostComment from '../components/CreatePostComment'
import Comments from '../components/Comments'

const FullPost = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)

  const getPost = async () => {
    const data = await api.get(`/posts/${id}`)
    setPost(data.data)
  }

  useEffect(() => {
    getPost()
  }, [])

  if (!post) {
    return <h2>Loading...</h2>
  }

  const {
    title,
    text,
    imageUrl,
    _id,
    viewsCount,
    likes,
    dislikes,
    comments,
    user,
  } = post
  const image = imageUrl ? `http://localhost:5000${imageUrl}` : defaultImage

  return (
    <Card className='mb-[30px] mt-[10px] px-[20px] py-[10px] w-[100%]  flex-col'>
      <img
        className='mx-auto w-[100%] h-[300px] mb-[10px] object-cover'
        src={image}
        alt='item-img'
      />
      <h2 className='text-[13px] leading-[26px] mb-[10px]'>{title}</h2>
      <div className='flex items-center justify-between mb-[10px]'>
        <Rating
          name='half-rating'
          readOnly
          size='small'
          defaultValue={4}
          precision={1}
        />
        <Typography variant='subtitle1'>Reviews (3)</Typography>
      </div>

      <h2 className='text-[18px] font-bold'>{text}</h2>
      <Typography variant='subtitle1'>
        <EyeIcon color='disabled' />
        {viewsCount}
      </Typography>

      <CreatePostComment />

      <Comments user={user} comments={comments} />
    </Card>
  )
}

export default FullPost
