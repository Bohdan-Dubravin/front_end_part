import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { loginValidation } from '../utils/validtion';

const Login = () => {
  const navigate = useNavigate();
  const { status, username } = useSelector((state) => state.user);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (username) {
      navigate('/');
    }
  }, [username]);

  const login = async (values) => {
    const data = await dispatch(loginUser(values));

    if (data.payload.status > 202) {
      setError(data.payload.data.message);
      return;
    }
    if ('accessToken' in data.payload.data) {
      navigate('/');
    }
  };

  return (
    <Paper className="animate mx-auto max-w-[320px] vertical_center p-[20px]">
      <Typography className="text-center mb-[10px]" variant="h6">
        Login
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
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={loginValidation}
        onSubmit={async (values, { setSubmitting }) => {
          login(values);
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
              size="small"
              label="Password"
              className="mb-[10px]"
              fullWidth
              name="password"
              onChange={handleChange}
              value={values.password}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <LoadingButton
              className="font-bold bg-sky-500 text-white hover:bg-sky-600"
              size="large"
              variant="outline"
              type="submit"
              fullWidth
              loading={isSubmitting}
            >
              Login
            </LoadingButton>
          </form>
        )}
      </Formik>
      <Typography className="text-center mt-[10px]" variant="body2">
        Don't have an account?
        <Link className="text-[#1976d2] font-bold" to="/register">
          Sign up
        </Link>
      </Typography>
    </Paper>
  );
};

export default Login;
