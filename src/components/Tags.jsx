import { Paper, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getTags } from '../redux/slices/tagsSlice'
import TagsSkeleton from '../Skeletons/TagsSkeleton'

const Tags = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()
  const { status, tags } = useSelector((state) => state.tags)

  return (
    <>
      {tags.map((tag) => {
        return (
          <Typography
            key={tag}
            variant='body1'
            className='font text-[#A2A6B0] hover:text-black mb-[5px] cursor-pointer'
            onClick={() => setSearchParams({ tag })}
          >
            {tag}
          </Typography>
        )
      })}
    </>
  )
}

export default Tags
