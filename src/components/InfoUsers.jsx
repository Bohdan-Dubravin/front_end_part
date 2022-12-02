import {
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

const InfoUsers = () => {
  const [usersList, setUsersList] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const response = await api.get('/users')
      console.log(response.data)
      setUsersList(response.data)
    })()
  }, [])

  return (
    <>
      <Typography className='my-[10px] mx-[auto]' component='h2' variant='h5'>
        Users List
      </Typography>
      <TableContainer className='mt-[20px]' component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead className='bg-[#1976d2] '>
            <TableRow>
              <TableCell className='font-bold text-white'>Id</TableCell>
              <TableCell className='font-bold text-white' align='right'>
                Name
              </TableCell>
              <TableCell className='font-bold text-white' align='right'>
                Avatar
              </TableCell>
              <TableCell className='font-bold text-white' align='right'>
                Role
              </TableCell>
              <TableCell className='font-bold text-white' align='center'>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align='right'>Name</TableCell>
              <TableCell align='right'>Avatar</TableCell>
              <TableCell align='right'>Role</TableCell>
              <TableCell align='right'>
                <Button>
                  <EditIcon color='primary' />
                </Button>
                <Button>
                  <DeleteIcon color='error' />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default InfoUsers
