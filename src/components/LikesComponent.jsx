import { useDispatch, useSelector } from 'react-redux';
import {
  dislikePost,
  dislikePostState,
  likePost,
  likePostState,
} from '../redux/slices/userSlice';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

const LikesComponent = ({ post }) => {
  const user = useSelector((state) => state.user);
  const curLike = post.usersLiked.some((postId) => postId === user.id);
  const curDislike = post.usersDisliked.some((postId) => postId === user.id);
  const dispatch = useDispatch();
  const [postLikes, setPostLikes] = useState(post.likes);
  const [postDislikes, setPostDislikes] = useState(post.dislikes);
  const [isLiked, setIsLiked] = useState(curLike);
  const [isDisliked, setIsDisliked] = useState(curDislike);

  useEffect(() => {
    setIsDisliked(post.usersDisliked.some((postId) => postId === user.id));
    setIsLiked(post.usersLiked.some((postId) => postId === user.id));
  }, []);

  const handleLike = async () => {
    if (isLiked) return;
    if (isDisliked) {
      setIsLiked(!isLiked);
      setIsDisliked(!isDisliked);
      setPostLikes(postLikes + 1);
      setPostDislikes(postDislikes > 0 ? postDislikes - 1 : postDislikes);
    }

    setIsLiked(!isLiked);
    setPostLikes(postLikes + 1);

    await dispatch(likePost(post._id));
  };

  const handleDislike = async () => {
    if (isDisliked) return;
    if (isLiked) {
      setIsLiked(!isLiked);
      setIsDisliked(!isDisliked);
      setPostDislikes(postDislikes + 1);
      setPostLikes(postLikes > 0 ? postLikes - 1 : postLikes);
    }

    setIsDisliked(!isDisliked);
    setPostDislikes(postDislikes + 1);
    await dispatch(dislikePost(post._id));
  };

  return (
    <>
      {!isLiked && !isDisliked && (
        <Box className="flex">
          <ThumbUpOutlinedIcon
            onClick={() => handleLike()}
            className="cursor-pointer"
          />
          <Typography>{postLikes}</Typography>
          <ThumbUpOutlinedIcon
            onClick={() => handleDislike()}
            className="rotate-180 cursor-pointer"
          />
          <Typography>{postDislikes}</Typography>
        </Box>
      )}

      {isLiked && (
        <Box className="flex">
          <ThumbUpIcon
            className="cursor-pointer"
            onClick={() => handleLike()}
          />
          <Typography>{postLikes}</Typography>
          <ThumbUpOutlinedIcon
            onClick={() => handleDislike()}
            className="rotate-180 cursor-pointer"
          />
          <Typography>{postDislikes}</Typography>
        </Box>
      )}
      {isDisliked && (
        <Box className="flex">
          <ThumbUpOutlinedIcon
            className="cursor-pointer"
            onClick={() => handleLike()}
          />
          <Typography>{postLikes}</Typography>
          <ThumbUpIcon
            onClick={() => handleDislike()}
            className="rotate-180 cursor-pointer"
          />
          <Typography>{postDislikes}</Typography>
        </Box>
      )}
    </>
  );
};

export default LikesComponent;
