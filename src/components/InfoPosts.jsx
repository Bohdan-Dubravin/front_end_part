import {
  Avatar,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import api from '../api/config'
import InfoSkeleton from '../Skeletons/InfoSkeleton'
import { Link } from 'react-router-dom'

const InfoPosts = () => {
  const [postsList, setPostsList] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const getPosts = async () => {
    try {
      setIsLoading(true)
      const response = await api.get('/posts')
      console.log(response)
      setPostsList(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const deletePost = async (id) => {
    try {
      const response = await api.delete(`/posts/delete/${id}`)

      if (response.status === 200) {
        getPosts()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const editUser = async (id) => {
    try {
      setIsLoading(true)
      const response = await api.delete(`/posts/update`)
      setPostsList(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
      <Typography className='my-[10px] mx-[auto]' component='h2' variant='h5'>
        Posts List
      </Typography>
      <TableContainer className='mt-[20px]' component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead className='bg-[#1976d2] '>
            <TableRow>
              <TableCell className='font-bold text-white'>Id</TableCell>
              <TableCell className='font-bold text-white ' align='right'>
                Title
              </TableCell>
              <TableCell className='font-bold text-white' align='right'>
                Post image
              </TableCell>
              <TableCell className='font-bold text-white' align='right'>
                Author name
              </TableCell>
              <TableCell className='font-bold text-white' align='right'>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? Array(10)
                  .fill(1)
                  .map((_, i) => <InfoSkeleton key={i} />)
              : postsList.map((post) => {
                  const { _id, user, imageUrl, title } = post

                  const postAuthor = Boolean(user)
                    ? user
                    : { username: 'Unknown', avatarUrl: '' }
                  return (
                    <TableRow key={_id}>
                      <TableCell>{_id}</TableCell>
                      <TableCell align='right truncate'>
                        {title.length > 15 ? `${title.slice(0, 15)}...` : title}
                      </TableCell>
                      <TableCell align='right'>
                        <img
                          className='h-[40px] w-[40px]'
                          src={`http://localhost:5000${imageUrl}`}
                          alt='post-img'
                        />
                      </TableCell>
                      <TableCell className='flex ' align='right'>
                        <p className='ml-[5px] leading-[40px] truncate'>
                          {postAuthor.username}
                        </p>
                        <Avatar
                          alt={postAuthor.username}
                          src={`http://localhost:5000${postAuthor.avatarUrl}`}
                        />
                      </TableCell>
                      <TableCell align='right'>
                        <Link to={`/admin/createPost/${_id}`}>
                          <Button onClick={editUser} size='small'>
                            <EditIcon color='primary' />
                          </Button>
                        </Link>
                        <Button onClick={() => deletePost(_id)} size='small'>
                          <DeleteIcon color='error' />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default InfoPosts
