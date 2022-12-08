import { Avatar, Paper, Rating, Skeleton, Typography } from '@mui/material'
import { Box } from '@mui/system'

const PostSkeleton = () => {
  return (
    <Paper
      elevation={4}
      className='grow mb-[30px] min-w-full h-[460px] mobile:h-[330px] flex-col relative'
    >
      <div
        className='h-[330px] mb-[5px] w-full rounded-t
      mobile:h-[200px]'
      >
        <Skeleton
          withChildren
          variant='rectangular'
          className='h-[330px] mb-[5px] w-[100%] rounded-t
      mobile:h-[200px]'
        />
      </div>
      <Box className='flex flex-col px-[10px]'>
        <Box className='flex items-center justify-between'>
          <Typography variant='body2' className='text-[#A2A6B0]'></Typography>
          <Box className='flex items-center'>
            <Typography variant='body2' className='text-[#A2A6B0]'>
              12
            </Typography>
          </Box>
        </Box>
        <Typography
          variant='h3'
          className='text-xl mb-[10px] truncate'
        ></Typography>
        <Box className='flex  mb-[10px] self-end px-[10px]'>
          <Rating
            className='mr-[10px]'
            name='half-rating'
            readOnly
            size='small'
            precision={1}
          />
          <Typography variant='body2' className='text-[#A2A6B0]'>
            Comments
          </Typography>
        </Box>
        <Box className='flex justify-between mb-[10px] px-[10px] '>
          <Box className='ml-[auto]'></Box>
        </Box>
      </Box>
      <Box className=' absolute top-[5px] left-[5px] bg-slate-50 rounded p-1'>
        <Avatar size='sm' />
        <Skeleton width='100%' />
      </Box>
    </Paper>
  )
}

export default PostSkeleton
