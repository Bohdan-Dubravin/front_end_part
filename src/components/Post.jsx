import { Card, Rating, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import defaultImage from '../assets/images/default-image.jpg'
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import { Box } from '@mui/system'
import LikesComponent from './LikesComponent'

const Post = ({ post }) => {
  const { title, text, imageUrl, _id, viewsCount } = post

  const image = imageUrl ? `http://localhost:5000${imageUrl}` : defaultImage

  return (
    <Card className='mb-[30px] px-[20px] py-[10px] w-[100%] h-[350px] flex-col'>
      <Link to={`/news/post/${_id}`}>
        <img
          className='mx-auto w-[100%] h-[200px] mb-[10px] object-cover rounded'
          src={image}
          alt='item-img'
        />

        <Typography variant='h5' className=' mb-[10px]'>
          {title}
        </Typography>
        <div className='flex items-center justify-between mb-[10px]'>
          <Rating
            name='half-rating'
            readOnly
            size='small'
            defaultValue={2.5}
            precision={0.5}
          />
          <Typography variant='subtitle1'>Reviews (3)</Typography>
        </div>

        <Typography variant='body1' className='text-[18px] '>
          {text.slice(0, 20)}...
        </Typography>
      </Link>
      <Box className='flex justify-between'>
        <Box>
          <EyeIcon color='disabled' />
          {viewsCount}
        </Box>
        <LikesComponent post={post} />
      </Box>
    </Card>
  )
}

export default Post
