import { PhotoCamera } from '@mui/icons-material'
import {
  Button,
  Checkbox,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'

const CreateItem = () => {
  return (
    <div>
      <Typography variant='h4'>Create new product</Typography>
      <Paper className='flex-col p-[20px]'>
        <TextField
          className='block mb-[10px]'
          size='small'
          id='filled-basic'
          label='title'
          name='title'
        />
        <TextField
          size='small'
          type='number'
          id='filled-basic'
          label='price'
          name='price'
        />
        <TextField
          multiline
          rows={8}
          size='small'
          id='filled-basic'
          label='description'
          name='description'
        />
        <Grid container spacing={2}>
          <TextField
            className='w-[250px]'
            size='small'
            id='filled-basic'
            label='CPU'
            name='CPU'
          />
          <TextField
            className='w-[250px]'
            size='small'
            id='filled-basic'
            label='GPU'
            name='GPU'
          />
          <TextField
            className='w-[250px]'
            size='small'
            id='filled-basic'
            label='RAM'
            name='RAM'
          />
          <TextField
            className='w-[250px]'
            size='small'
            id='filled-basic'
            label='GPU'
            name='GPU'
          />
          <TextField
            className='w-[250px]'
            size='small'
            id='filled-basic'
            label='powerSupply'
            name='powerSupply'
          />
        </Grid>

        <TextField
          size='small'
          id='filled-basic'
          label='images'
          name='images'
        />
        <Checkbox label='inStock' defaultChecked />
        <Button variant='contained' component='label'>
          Upload image
          <input hidden accept='image/*' multiple type='file' />
        </Button>
      </Paper>
    </div>
  )
}

export default CreateItem
