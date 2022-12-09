import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import PostList from '../components/PostList';
import Tags from '../components/Tags';
import { getAllPosts } from '../redux/slices/postSlice';

const News = () => {
  const { posts, status } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [searchParams, getSearchParams] = useSearchParams();
  const tags = searchParams.get('tag');
  console.log(tags);
  useEffect(() => {
    dispatch(getAllPosts(tags));
  }, [dispatch, tags]);

  return (
    <div className="relative w-[100%] mt-[30px] flex">
      <PostList isLoading={status} posts={posts} />
      <Tags />
    </div>
  );
};

export default News;
