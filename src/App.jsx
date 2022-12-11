import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AdminDashboard from './layouts/AdminDashboard';
import CreateItem from './components/CreateItem';
import Home from './layouts/Home';
import Login from './layouts/Login';
import Register from './layouts/Register';
import PrivateRoute from './utils/PrivateRoute';
import CreatePost from './components/CreatePost';
import { useDispatch } from 'react-redux';
import { checkAuth } from './redux/slices/authSlice';
import { useEffect } from 'react';
import Desktops from './layouts/Desktops';
import FullItem from './layouts/FullItem';
import News from './layouts/News';
import FullPost from './layouts/FullPost';
import InfoUsers from './components/InfoUsers';
import InfoPosts from './components/InfoPosts';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);
  return (
    <Container
      className="p-0 pb-[60px] relative  bg-white min-h-screen"
      maxWidth="lg"
    >
      <Header />
      <Routes>
        <Route path="/" element={<News />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/desktops" element={<Desktops />} />
        <Route path="/news/post/:id" element={<FullPost />} />
        <Route path="/desktops/:id" element={<FullItem />} />
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="createProduct" element={<CreateItem />} />
            <Route path="createPost" element={<CreatePost />} />
            <Route path="createPost/:id" element={<CreatePost />} />
            <Route path="users" element={<InfoUsers />} />
            <Route path="posts" element={<InfoPosts />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
