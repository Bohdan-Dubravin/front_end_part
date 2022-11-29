import { LoadingButton } from '@mui/lab'
import { Paper, Rating, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Formik } from 'formik'
import api from '../api/config'
import { commentValidation } from '../utils/validtion'
import { useParams } from 'react-router-dom'

const CreatePostComment = () => {
  const [itemImage, setItemImage] = useState('')
  const { id } = useParams()

  return (
    <div>
      <Paper className='flex-col w-[80%] mx-[auto]  p-[20px] mt-[30px] bg-slate-50'>
        <Typography variant='h6'>Add comment</Typography>
        <Formik
          initialValues={{
            rating: 4,
            text: '',
          }}
          validationSchema={commentValidation}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await api.post(`/posts/create/comment/${id}`, {
                ...values,
              })
            } catch (error) {
              console.log(error)
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit} className='createUserForm__form'>
              <div className='flex flex-col'>
                <Typography variant='body'>Rating</Typography>
                <Rating
                  size='small'
                  value={values.rating}
                  precision={1}
                  name='rating'
                  onChange={handleChange}
                />
                <TextField
                  multiline
                  rows={4}
                  className='w-[100%] my-[20px]'
                  size='small'
                  variant='standard'
                  id='text'
                  label='text'
                  name='text'
                  onChange={handleChange}
                  value={values.text}
                  error={Boolean(errors.text)}
                  helperText={errors.text}
                />
              </div>
              <LoadingButton
                size='large'
                className='block mt-[20px]'
                color='error'
                variant='outlined'
                type='submit'
                loading={isSubmitting}
              >
                Publish
              </LoadingButton>
            </form>
          )}
        </Formik>
      </Paper>
    </div>
  )
}

export default CreatePostComment
