import { Paper, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getTags } from '../redux/slices/tagsSlice';
import TagsSkeleton from '../Skeletons/TagsSkeleton';

const Tags = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { status, tags } = useSelector((state) => state.tags);
  useEffect(() => {
    dispatch(getTags());
  }, []);

  return (
    <>
      {!status && tags.length ? (
        <Paper
          elevation={4}
          className="h-[400px] sticky w-[200px] top-[10px] right-0 ml-[10px] p-[10px] bg-gray-100"
        >
          <Typography variant="h3" className="font-fold text-xl text-center">
            Popular tags
          </Typography>
          {tags.map((tag) => {
            return (
              <Typography
                key={tag}
                variant="body1"
                className="font-fold text-[#A2A6B0] hover:text-black mb-[5px] cursor-pointer"
                onClick={() => setSearchParams({ tag: tag.slice(1) })}
              >
                {tag}
              </Typography>
            );
          })}
        </Paper>
      ) : (
        <TagsSkeleton />
      )}
    </>
  );
};

export default Tags;
