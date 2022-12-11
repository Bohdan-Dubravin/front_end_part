import {
  Avatar,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../api/config';
import InfoSkeleton from '../Skeletons/InfoSkeleton';

const InfoUsers = () => {
  const [usersList, setUsersList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/auth/users');
      console.log(response);
      setUsersList(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await api.delete(`/auth/delete/${id}`);

      if (response.status === 200) {
        getUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editUser = async () => {
    try {
      setIsLoading(true);
      const response = await api.delete('/auth/users');
      setUsersList(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Typography className="my-[10px] mx-[auto]" component="h2" variant="h5">
        Users List
      </Typography>
      <TableContainer className="mt-[20px]" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-[#1976d2] ">
            <TableRow>
              <TableCell className="font-bold text-white">Id</TableCell>
              <TableCell className="font-bold text-white" align="right">
                Name
              </TableCell>
              <TableCell className="font-bold text-white" align="right">
                Avatar
              </TableCell>
              <TableCell className="font-bold text-white" align="right">
                Role
              </TableCell>
              <TableCell className="font-bold text-white" align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? Array(10)
                  .fill(1)
                  .map((_, i) => <InfoSkeleton key={i} />)
              : usersList.map((user) => {
                  return (
                    <TableRow key={user._id}>
                      <TableCell>{user._id}</TableCell>
                      <TableCell align="right">{user.username}</TableCell>
                      <TableCell align="right">
                        <Avatar
                          alt={user.username}
                          src={`${process.env.REACT_APP_BASE_URL}${user.avatarUrl}`}
                        />
                      </TableCell>
                      <TableCell align="right">{user.role}</TableCell>
                      <TableCell align="right">
                        <Button onClick={editUser} size="small">
                          <EditIcon color="primary" />
                        </Button>
                        <Button
                          onClick={() => deleteUser(user._id)}
                          size="small"
                        >
                          <DeleteIcon color="error" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {Array(10)
        .fill(1)
        .map((_, i) => (
          <InfoSkeleton key={i} />
        ))} */}
    </>
  );
};

export default InfoUsers;
