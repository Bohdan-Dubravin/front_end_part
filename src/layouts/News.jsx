import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import PostList from '../components/PostList'
import SideTagBar from '../components/SideTagBar'
import { getAllPosts } from '../redux/slices/postSlice'

const News = () => {
  const { posts, status } = useSelector((state) => state.post)
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const tags = searchParams.get('tag')

  useEffect(() => {
    dispatch(getAllPosts(tags))
  }, [dispatch, tags])

  return (
    <div className='relative w-[100%] mt-[30px] flex px-[20px]'>
      <PostList isLoading={status} posts={posts} />
      <SideTagBar />
    </div>
  )
}

export default News
