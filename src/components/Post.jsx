import { Avatar, Card, Paper, Rating, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import defaultImage from '../assets/images/default-image.jpg'
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import { Box } from '@mui/system'
import LikesComponent from './LikesComponent'

const Post = ({ post }) => {
  const { title, imageUrl, _id, viewsCount, comments } = post

  const image = imageUrl ? `http://localhost:5000${imageUrl}` : defaultImage
  const rate =
    comments.reduce((acc, com) => acc + com.rating, 0) / comments.length

  return (
    <Paper
      elevation={4}
      className='mb-[30px] w-[100%] h-[450px] mobile:h-[350px] flex-col'
    >
      <Link to={`/news/post/${_id}`}>
        <img
          className='mx-auto w-[100%] h-[300px] mb-[10px] object-cover rounded-t mobile:h-[200px]'
          src={image}
          alt='item-img'
        />

        <Typography variant='h3' className='text-xl mb-[10px]'>
          {title}
        </Typography>
        <Box className='flex  mb-[10px] px-[10px]'>
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
      </Link>
      <Box className='flex justify-between mb-[10px] px-[10px]'>
        <Box className='flex'>
          <Avatar
            alt={post.user.username}
            src={`http://localhost:5000${post.user.avatarUrl}`}
          />
          <Typography variant='body2' className='font-bold self-end'>
            {post.user.username}
          </Typography>
        </Box>
        <Box>
          <EyeIcon color='disabled' />
          {viewsCount}
          <LikesComponent post={post} />
        </Box>
      </Box>
    </Paper>
  )
}

export default Post
