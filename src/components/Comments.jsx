import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Comments = ({ comments }) => {
  return (
    <List className="">
      {comments.map((comment) => {
        const date = new Date(comment.createdAt.toString());
        return (
          <>
            <ListItem
              key={comment._id}
              className="flex flex-col border-b-2 px-0"
              alignItems="flex-start"
            >
              <Box className="flex">
                <ListItemAvatar>
                  <Avatar
                    alt={comment.author.username}
                    src={`${process.env.REACT_APP_BASE_URL}${comment.author.avatarUrl}`}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.author.username}
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {date.toDateString()}
                    </Typography>
                  }
                />
              </Box>
              <Rating
                className=""
                readOnly
                size="small"
                value={comment.rating}
              />
              <Typography>{comment.text}</Typography>
            </ListItem>
          </>
        );
      })}
    </List>
  );
};

export default Comments;
