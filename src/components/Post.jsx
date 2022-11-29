import { Card, Rating, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import defaultImage from '../assets/images/default-image.jpg'
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined'

const Post = ({ post }) => {
  const { title, text, imageUrl, _id, viewsCount, likes, dislikes } = post

  const image = imageUrl ? `http://localhost:5000${imageUrl}` : defaultImage

  return (
    <Card className='mb-[30px] px-[20px] py-[10px] w-[100%] h-[350px] flex-col'>
      <img
        className='mx-auto w-[100%] h-[200px] mb-[10px] object-cover'
        src={image}
        alt='item-img'
      />
      <Link to={`/news/post/${_id}`}>
        <h2 className='text-[13px] leading-[26px] mb-[10px]'>{title}</h2>
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

        <h2 className='text-[18px] font-bold'>{text.slice(0, 20)}...</h2>
        <Typography variant='subtitle1'>
          <EyeIcon color='disabled' />
          {viewsCount}
        </Typography>
      </Link>
    </Card>
  )
}

export default Post
