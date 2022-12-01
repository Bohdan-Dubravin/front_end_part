import { LoadingButton } from '@mui/lab'
import { Button, Paper, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Formik } from 'formik'
import api from '../api/config'
import { postValidation } from '../utils/validtion'
import { useNavigate } from 'react-router-dom'

const fields = ['title', 'price', 'CPU', 'GPU', 'RAM', 'powerSuplay', 'storage']

const CreatePost = () => {
  const [itemImage, setItemImage] = useState('')
  const navigate = useNavigate()

  const inputChangefile = async (e) => {
    try {
      const formData = new FormData()
      formData.append('image', e.target.files[0])

      const response = await api.post('/upload', formData)

      setItemImage(response.data.url)
    } catch (error) {
      console.log(error)
    }
  }
  const removeImage = () => {
    setItemImage('')
  }

  return (
    <div>
      <Paper className='flex-col p-[20px] mt-[30px]'>
        <Typography variant='h4'>Create new product</Typography>
        <Formik
          initialValues={{
            title: '',
            text: '',
          }}
          validationSchema={postValidation}
          onSubmit={async (values, { resetForm }) => {
            const newPost = await api.post('/posts/create', {
              ...values,
              imageUrl: itemImage,
            })

            resetForm()
            navigate(`/news/post/${newPost.data._id}`)
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
                <TextField
                  className='w-[500px] my-[20px]'
                  size='small'
                  id='title'
                  label='title'
                  name='title'
                  onChange={handleChange}
                  value={values.title}
                  error={Boolean(errors.title)}
                  helperText={errors.title}
                />
                <TextField
                  multiline
                  rows={8}
                  className='w-[100%] my-[20px]'
                  size='small'
                  id='text'
                  label='text'
                  name='text'
                  onChange={handleChange}
                  value={values.text}
                  error={Boolean(errors.text)}
                  helperText={errors.text}
                />
              </div>
              <Button variant='contained' component='label'>
                Upload image
                <input
                  onChange={(e) => inputChangefile(e)}
                  name='image'
                  id='image'
                  hidden
                  type='file'
                />
              </Button>
              {itemImage && (
                <>
                  <Button color='error' onClick={() => removeImage()}>
                    Delete image
                  </Button>
                  <img src={`http://localhost:5000${itemImage}`} alt='Upload' />
                </>
              )}
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

export default CreatePost
