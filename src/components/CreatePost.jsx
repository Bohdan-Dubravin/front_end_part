import { LoadingButton } from '@mui/lab'
import { Button, Paper, TextField, Typography } from '@mui/material'
import { useState, useEffect, useMemo } from 'react'
import { Formik } from 'formik'
import api from '../api/config'
import { postValidation } from '../utils/validtion'
import { useNavigate, useParams } from 'react-router-dom'
import Editor from './Editor'
import { YoutubeSearchedFor } from '@mui/icons-material'

const CreatePost = () => {
  const { id } = useParams()
  const [itemImage, setItemImage] = useState('')
  const [showText, setShowText] = useState(true)
  const navigate = useNavigate()

  const [initial, setInitial] = useState({
    title: '',
    text: '',
    tags: '',
  })

  const uploadPost = async (id) => {
    setShowText(false)
    const response = await api.get(`/posts/${id}`)

    const { text, title, imageUrl, tags } = response.data
    setInitial({ text, title, tags: tags.join('') })
    setItemImage(imageUrl)
    setShowText(true)
    console.log(initial)
  }

  useEffect(() => {
    if (id) {
      uploadPost(id)
    }
  }, [])

  const inputChangefile = async (e) => {
    try {
      const formData = new FormData()
      formData.append('image', e.target.files[0])

      const response = await api.post('/upload', formData)

      setItemImage(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const removeImage = () => {
    setItemImage('')
  }

  const createPost = async (values) => {
    const token = localStorage.getItem('token')
    const tags =
      values.tags
        .replace(/ /g, '')
        .split(/(?=#)/g)
        .filter((tag) => tag.length >= 2) || []
    const newPost = await api.post('/posts/create', {
      ...values,
      tags: [...new Set(tags)],
      imageUrl: itemImage,
      token,
    })
    return newPost
  }

  const updatePost = async (values) => {
    const token = localStorage.getItem('token')
    const tags =
      values.tags
        .replace(/ /g, '')
        .split(/(?=#)/g)
        .filter((tag) => tag.length > 2) || []
    const newPost = await api.patch(`/posts/update/${id}`, {
      ...values,
      tags: [...new Set(tags)],
      imageUrl: itemImage,
      token,
    })
    return newPost
  }

  return (
    <div>
      <Paper className='flex-col p-[20px] mt-[30px]'>
        <Typography variant='h4'>
          {!id ? 'Create new post' : 'Edit post'}
        </Typography>
        <Formik
          enableReinitialize
          initialValues={initial}
          validationSchema={postValidation}
          onSubmit={async (values, { resetForm }) => {
            try {
              const response = id
                ? await updatePost(values)
                : await createPost(values)

              resetForm()
              navigate(`/news/post/${response.data._id}`)
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

            handleSubmit,
            isSubmitting,
            setFieldValue,
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
                  error={YoutubeSearchedFor.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />
                <TextField
                  className='w-[500px] my-[20px]'
                  size='small'
                  id='tags'
                  label='tags'
                  name='tags'
                  onChange={handleChange}
                  value={values.tags}
                  error={Boolean(errors.tags)}
                  helperText={errors.tags}
                />
              </div>
              <div className='rounded'>
                {Boolean(errors.text) && errors.text}
                {showText && (
                  <Editor setValue={setFieldValue} defaultText={initial.text} />
                )}
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
                  <img src={`${itemImage}`} alt='Upload' />
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
                {id ? 'Edit post' : 'Publish'}
              </LoadingButton>
            </form>
          )}
        </Formik>
      </Paper>
    </div>
  )
}

export default CreatePost
