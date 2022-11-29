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
import React from 'react'

const Comments = ({ comments, user }) => {
  return (
    <List className='w-[500px]'>
      {comments.map((comment) => {
        return (
          <>
            <ListItem
              key={comment._id}
              className='relative'
              alignItems='flex-start'
            >
              <ListItemAvatar>
                <Avatar alt={user.username} src='/static/images/avatar/1.jpg' />
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
                    {comment.text}
                  </Typography>
                }
              />
              <Rating
                className='absolute top-[16px] right-[30px]'
                readOnly
                size='small'
                value={comment.rating}
              />
            </ListItem>
            <Divider variant='inset' component='li' />
          </>
        )
      })}
    </List>
  )
}

export default Comments
