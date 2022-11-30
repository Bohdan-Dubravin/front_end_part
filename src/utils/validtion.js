import * as Yup from 'yup'

// const validPhone = /^(?:\+38)?(0\d{9})$/

// const emailValidation =
//   /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

const itemValidation = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Title should have more than 2 characters')
    .required('Enter title')
    .max(30, 'Title should have less than 30 characters'),
  description: Yup.string()
    .min(10, 'Description should have more than 10 characters')
    .required('Enter description')
    .max(250, 'Description should have less than 250 characters'),
  price: Yup.number().required(),
  // image: Yup.mixed()
  //   .optional()
  //   .test('fileType', 'Photo must have jpeg/jpg/png formats', (value) => {
  //     return (
  //       (value && value.type === 'image/jpg') ||
  //       (value && value.type === 'image/jpeg') ||
  //       (value && value.type === 'image/png')
  //     )
  //   })
  //   .test('fileSize', 'Image is too large, max size 5mb', (value) => {
  //     return value && value.size <= 5000000
  //   }),
  // CPU: Yup.string().optional(),
  // GPU: Yup.string().optional(),
  // RAM: Yup.string().optional(),
  // powerSuplay: Yup.string().optional(),
  // storage: Yup.string().optional(),
  // inStock: Yup.boolean().optional(),
})
const postValidation = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Title should have more than 2 characters')
    .required('Enter title')
    .max(30, 'Title should have less than 30 characters'),
  text: Yup.string()
    .min(10, 'Description should have more than 10 characters')
    .required('Enter description')
    .max(250, 'Description should have less than 250 characters'),
})

const commentValidation = Yup.object().shape({
  text: Yup.string()
    .min(2, 'Text should have more than 2 characters')
    .required('Enter text')
    .max(250, 'Text should have less than 250 characters'),
  rating: Yup.number().min(1).required('Rate post').max(5),
})

const registerValidation = Yup.object().shape({
  username: Yup.string()
    .min(2, 'User name should have more than 2 characters')
    .required('Enter User name')
    .max(25, 'User name should have less than 25 characters'),
  password: Yup.string()
    .min(5, 'Password should have more than 5 characters')
    .required('Enter Password')
    .max(25, 'Password should have less than 25 characters'),
  email: Yup.string().email('Enter valid email').required('Enter Password'),
})

export { itemValidation, postValidation, commentValidation, registerValidation }
