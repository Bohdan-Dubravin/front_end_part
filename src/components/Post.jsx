import { Avatar, Card, Paper, Rating, Tooltip, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import defaultImage from '../assets/images/default-image.jpg'
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import { Box } from '@mui/system'
import LikesComponent from './LikesComponent'

const Post = ({ post }) => {
  const { title, imageUrl, _id, viewsCount, comments, createdAt, tags } = post

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
    <Paper
      elevation={4}
      className='mb-[30px] w-[100%] h-[460px] mobile:h-[330px] flex-col relative'
    >
      <Tooltip sx={{ p: 2 }} title='show full post' followCursor={true}>
        <Link to={`/news/post/${_id}`}>
          <img
            className='mx-auto w-[100%] h-[330px] mb-[5px] object-cover rounded-t mobile:h-[200px]'
            src={image}
            alt='item-img'
          />
        </Link>
      </Tooltip>
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
        <Typography variant='h3' className='text-xl mb-[10px] truncate'>
          {title}
        </Typography>
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
    </Paper>
  )
}

export default Post
