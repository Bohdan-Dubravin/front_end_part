import { useDispatch, useSelector } from 'react-redux'
import Tags from './Tags'
import TagsSkeleton from '../Skeletons/TagsSkeleton'
import { Paper, Typography } from '@mui/material'
import { useEffect } from 'react'
import { getTags } from '../redux/slices/tagsSlice'

const SideTagBar = () => {
  const { status, tags } = useSelector((state) => state.tags)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTags())
  }, [])

  return (
    <>
      {!status && tags.length ? (
        <Paper
          elevation={4}
          className='mobile:hidden h-[400px] sticky w-[200px] top-[10px] right-0 ml-[10px] p-[10px] bg-gray-100'
        >
          <Typography variant='h3' className='font-fold text-xl text-center'>
            Popular tags
          </Typography>
          <Tags />
        </Paper>
      ) : (
        <TagsSkeleton />
      )}
    </>
  )
}

export default SideTagBar
