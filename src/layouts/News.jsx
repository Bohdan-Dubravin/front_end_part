import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostList from '../components/PostList'
import { getAllPosts } from '../redux/slices/postSlice'

const News = () => {
  const { posts, status } = useSelector((state) => state.post)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  return (
    <div className='mt-[30px]'>
      {<PostList isLoading={status} posts={posts} />}
    </div>
  )
}

export default News
