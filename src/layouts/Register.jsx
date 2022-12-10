import { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { registerValidation } from '../utils/validtion';
import api from '../api/config';
import { Avatar, Button } from '@mui/material';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.user);
  const [error, setError] = useState('');
  const [itemImage, setItemImage] = useState('');
  const dispatch = useDispatch();

  const register = async (userInfo) => {
    const data = await dispatch(registerUser(userInfo));

    if (data.payload.status > 202) {
      setError(data.payload.data.message);
      return;
    }
    if ('accessToken' in data.payload.data) {
      navigate('/');
    }
  };

  const inputChangefile = async (e) => {
    try {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);

      const response = await axios.post(
        'http://localhost:5000/upload',
        formData
      );

      setItemImage(response.data.url);
    } catch (error) {
      console.log(error);
    }
  };
  const removeImage = () => {
    setItemImage('');
  };

  return (
    <Paper className="animate max-w-[320px] mx-[auto]  vertical_center  p-[20px]">
      <Typography className="text-center mb-[10px]" variant="h6">
        Register
      </Typography>
      {status === 'error' && (
        <Typography
          className="text-center mx-[auto] mb-[10px] text-[#d32f2f]"
          variant="body1"
        >
          {error}
        </Typography>
      )}
      <Formik
        validateOnChange={true}
        validateOnBlur={true}
        initialValues={{
          username: '',
          password: '',
          email: '',
        }}
        validationSchema={registerValidation}
        onSubmit={async (values, { setSubmitting }) => {
          register({ ...values, avatarUrl: itemImage });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
          handleBlur,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              className="mb-[10px]"
              label="User Name"
              size="small"
              name="username"
              fullWidth
              onChange={handleChange}
              value={values.username}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
            />
            <TextField
              className="mb-[10px]"
              label="Email"
              size="small"
              name="email"
              fullWidth
              onChange={handleChange}
              value={values.email}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              size="small"
              label="Password"
              className="mb-[10px]"
              fullWidth
              name="password"
              onChange={handleChange}
              value={values.password}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
            <div className="h-[100px] mt-[10px]">
              {!itemImage ? (
                <Button variant="contained" component="label">
                  Avatar (optional)
                  <input
                    onChange={(e) => inputChangefile(e)}
                    name="image"
                    id="image"
                    hidden
                    type="file"
                  />
                </Button>
              ) : (
                <>
                  <Avatar
                    alt="avatar"
                    src={`http://localhost:5000${itemImage}`}
                  />
                  <Button color="error" onClick={() => removeImage()}>
                    Delete image
                  </Button>
                </>
              )}
            </div>
            <LoadingButton
              className="font-bold bg-sky-500 text-white hover:bg-sky-600"
              size="large"
              variant="outline"
              type="submit"
              fullWidth
              loading={isSubmitting}
            >
              Sign Up
            </LoadingButton>
          </form>
        )}
      </Formik>
    </Paper>
  );
};

export default Register;
