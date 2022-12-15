import { Avatar, Paper, Rating, Skeleton, Typography } from '@mui/material'
import { Box } from '@mui/system'

const PostSkeleton = () => {
  return (
    <Paper
      elevation={4}
      className='mb-[30px] min-w-full h-[460px] mobile:h-[330px] flex-col relative'
    >
      <Skeleton
        withChildren
        variant='rectangular'
        className='h-[330px] mb-[5px] w-[100%] rounded-t
      mobile:h-[200px]'
      />

      <Box className='flex flex-col px-[10px]'>
        <Skeleton withChildren variant='text' />
        <Box className='flex align-center mb-[10px] self-end'>
          <Rating
            className='mr-[10px]'
            name='half-rating'
            readOnly
            size='small'
            precision={1}
          />

          <Skeleton withChildren variant='text' className='w-[100px]' />
        </Box>
        <Skeleton withChildren variant='text' className='w-[100%]' />
        <Skeleton withChildren variant='text' className='w-[100%]' />
      </Box>
      <Box className='absolute top-[5px] left-[5px] bg-slate-50 rounded p-1'>
        <Avatar size='sm' />
        <Skeleton width='100%' />
      </Box>
    </Paper>
  )
}

export default PostSkeleton
