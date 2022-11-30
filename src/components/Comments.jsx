import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Comments = ({ comments, user }) => {
  return (
    <List className=''>
      {comments.map((comment) => {
        const date = new Date(comment.createdAt.toString())
        return (
          <>
            <ListItem
              key={comment._id}
              className='flex flex-col border-b-2 px-0'
              alignItems='flex-start'
            >
              <Box className='flex'>
                <ListItemAvatar>
                  <Avatar
                    alt={user.username}
                    src='/static/images/avatar/1.jpg'
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={user.username}
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component='span'
                      variant='body2'
                      color='text.primary'
                    >
                      {date.toDateString()}
                    </Typography>
                  }
                />
              </Box>
              <Rating
                className=''
                readOnly
                size='small'
                value={comment.rating}
              />
              <Typography>{comment.text}</Typography>
            </ListItem>
          </>
        )
      })}
    </List>
  )
}

export default Comments
