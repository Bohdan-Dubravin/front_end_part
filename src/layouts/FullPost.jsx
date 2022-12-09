import { Avatar, Rating, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import defaultImage from '../assets/images/default-image.jpg'
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import { useEffect, useState } from 'react'
import CreatePostComment from '../components/CreatePostComment'
import Comments from '../components/Comments'
import FullPostSkeleton from '../Skeletons/FullPostSkeleton'
import axios from 'axios'
import { Box } from '@mui/system'
import LikesComponent from '../components/LikesComponent'

const FullPost = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)

  const getPost = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/posts/${id}`
    )
    setPost(data.data)
  }
  useEffect(() => {
    getPost()
  }, [])

  if (!post) {
    return <FullPostSkeleton />
  }

  const { title, imageUrl, _id, viewsCount, comments, createdAt, tags, text } =
    post
  console.log(post)
  const image = imageUrl ? `http://localhost:5000${imageUrl}` : defaultImage
  const rate =
    comments.reduce((acc, com) => acc + com.rating, 0) / comments.length
  const date = new Date(createdAt.toString())
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return (
    <Box className='mb-[30px] bg-white  h-[430px] mobile:h-[330px] flex-col relative'>
      <Typography variant='h4' className='my-[20px] truncate'>
        {title}
      </Typography>
      <Box className='rounded'>
        <img
          className='w-[100%] h-[330px] mb-[5px] object-contain object-left  mobile:h-[200px]'
          src={image}
          alt='item-img'
        />
      </Box>
      <Box className='flex flex-col px-[10px]'>
        <Box className='flex items-center justify-between'>
          <Typography variant='body2' className='text-[#A2A6B0]'>
            {date.toLocaleDateString('en-US', options)}
          </Typography>
          <Box className='flex items-center'>
            <EyeIcon color='disabled' className='mr-[3px] w-5' />
            <Typography variant='body2' className='text-[#A2A6B0]'>
              {viewsCount}
            </Typography>
          </Box>
        </Box>
        <Box className='flex  mb-[10px] self-end px-[10px]'>
          <Rating
            className='mr-[10px]'
            name='half-rating'
            readOnly
            size='small'
            defaultValue={rate}
            precision={1}
          />
          <Typography variant='body2' className='text-[#A2A6B0]'>
            Comments ({comments.length})
          </Typography>
        </Box>
        <Box className='flex justify-between mb-[10px] px-[10px] '>
          {tags.length > 0 && (
            <Box className='flex'>
              {tags.map((tag) => {
                return (
                  <Typography
                    key={tag}
                    variant='body2'
                    className='text-[#A2A6B0] hover:text-black cursor-pointer'
                  >
                    {tag}
                  </Typography>
                )
              })}
            </Box>
          )}
          <Box className='ml-[auto]'>
            <LikesComponent post={post} />
          </Box>
        </Box>
      </Box>
      <Box className=' absolute top-[5px] left-[5px] bg-slate-50 rounded p-1'>
        <Avatar
          size='sm'
          alt={post.user.username}
          src={`http://localhost:5000${post.user.avatarUrl}`}
        />
        <Typography variant='body2' className='font-bold self-end truncate'>
          {post.user.username}
        </Typography>
      </Box>
      <Box
        className='my-[10px]'
        dangerouslySetInnerHTML={{
          __html: post.text,
        }}
      />

      <CreatePostComment getPost={getPost} />
      <Comments user={post.user} comments={comments} />
    </Box>
  )
}

export default FullPost
