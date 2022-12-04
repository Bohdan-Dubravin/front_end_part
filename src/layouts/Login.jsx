import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { status, username } = useSelector((state) => state.user);
  const [error, setError] = useState('');
  const [info, setInfo] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const value = e.target.value;
    setInfo((prev) => {
      return { ...prev, [e.target.name]: value };
    });
  };

  useEffect(() => {
    if (username) {
      navigate('/');
    }
  }, [username]);

  const login = async () => {
    const data = await dispatch(loginUser(info));

    if (data.payload.status > 202) {
      setError(data.payload.data.message);
      return;
    }
    if ('accessToken' in data.payload.data) {
      navigate('/');
    }
  };

  return (
    <Paper className="animate mx-auto w-[320px] mt-[20%] p-[20px]">
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
      <TextField
        className="mb-[10px]"
        label="User Name"
        size="small"
        error
        name="username"
        helperText="Неверно указана почта"
        fullWidth
        value={info.username}
        onChange={(e) => handleChange(e)}
      />
      <TextField
        size="small"
        label="Password"
        className="mb-[10px]"
        fullWidth
        name="password"
        value={info.password}
        onChange={(e) => handleChange(e)}
        type="password"
      />
      <LoadingButton
        className="font-bold bg-sky-500 text-white hover:bg-sky-600"
        size="large"
        variant="outline"
        fullWidth
        loading={Boolean(status === 'load')}
        onClick={() => login()}
      >
        Login
      </LoadingButton>
      <Typography className="text-center mt-[10px]" variant="body2">
        Don't have an account?{' '}
        <Link className="text-[#1976d2] font-bold" to="/register">
          Sign up
        </Link>
      </Typography>
    </Paper>
  );
};

export default Login;
