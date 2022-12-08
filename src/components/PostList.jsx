import React from 'react';

import PostSkeleton from '../Skeletons/PostSkeleton';
import Post from './Post';

const PostList = ({ posts, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="w-[100%] max-w-[750px] mr-[auto] ">
        {Array(10)
          .fill(1)
          .map((_, i) => (
            <PostSkeleton key={i} />
          ))}
      </div>
    );
  }

  return (
    <div className="w-[100%] max-w-[750px] mr-[auto]">
      {posts.map((item) => {
        return <Post key={item._id} post={item} />;
      })}
    </div>
  );
};

export default PostList;
