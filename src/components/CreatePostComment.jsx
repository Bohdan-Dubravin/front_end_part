import { LoadingButton } from '@mui/lab';
import { Paper, Rating, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Formik } from 'formik';
import api from '../api/config';
import { commentValidation } from '../utils/validtion';
import { useParams } from 'react-router-dom';

const CreatePostComment = ({ getPost }) => {
  const { id } = useParams();

  return (
    <div>
      <Paper className="flex-col  mx-[auto]  p-[20px] mt-[30px] bg-slate-50">
        <Typography variant="h6">Add a comment</Typography>
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
              });
              getPost();
            } catch (error) {
              console.log(error);
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
            <form onSubmit={handleSubmit} className="createUserForm__form">
              <div className="flex flex-col">
                <div className="flex align-items: center;">
                  <Typography className="mr-[10px]" variant="body">
                    Rate post
                  </Typography>
                  <Rating
                    size="small"
                    value={values.rating}
                    precision={1}
                    name="rating"
                    onChange={handleChange}
                  />
                </div>
                <TextField
                  multiline
                  minRows={1}
                  className="w-[100%] my-[10px]"
                  size="small"
                  variant="standard"
                  id="text"
                  label="text"
                  name="text"
                  onChange={handleChange}
                  value={values.text}
                  error={Boolean(errors.text)}
                  helperText={errors.text}
                />
              </div>
              <LoadingButton
                size="small"
                className="block mt-[10px] bg-[#1976D2] text-white hover:bg-[#1976D2] hover:text-white"
                color="error"
                variant="soft"
                type="submit"
                loading={isSubmitting}
              >
                Publish
              </LoadingButton>
            </form>
          )}
        </Formik>
      </Paper>
    </div>
  );
};

export default CreatePostComment;
