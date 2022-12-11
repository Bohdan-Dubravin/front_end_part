import { LoadingButton } from '@mui/lab';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Formik } from 'formik';
import api from '../api/config';
import { itemValidation } from '../utils/validtion';

const fields = [
  'title',
  'price',
  'CPU',
  'GPU',
  'RAM',
  'powerSuplay',
  'storage',
];

const CreateItem = () => {
  const [itemImage, setItemImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [avaliable, setAvaliavle] = useState(true);
  const createItem = () => {
    setLoading(true);
  };

  const inputChangefile = async (e) => {
    try {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);

      const response = await api.post('/upload', formData);

      setItemImage(response.data.url);
    } catch (error) {
      console.log(error);
    }
  };
  const removeImage = () => {
    setItemImage('');
  };

  return (
    <div>
      <Paper className="flex-col p-[20px] mt-[30px]">
        <Typography variant="h4">Create new product</Typography>
        <Formik
          initialValues={{
            title: '',
            price: '',
            description: '',
            CPU: '',
            GPU: '',
            RAM: '',
            powerSuplay: '',
            storage: '',
          }}
          validationSchema={itemValidation}
          onSubmit={async (values, { setSubmitting }) => {
            const newItem = await api.post('/items/create', {
              ...values,
              inStock: avaliable,
              images: [itemImage],
            });
            console.log(newItem);
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
                {fields.map((val) => {
                  return (
                    <TextField
                      key={val}
                      className=" my-[5px] w-[320px]"
                      size="small"
                      id={val}
                      label={val}
                      variant="standard"
                      name={val}
                      onChange={handleChange}
                      value={values[val]}
                      error={Boolean(errors[val])}
                      helperText={errors[val]}
                    />
                  );
                })}
                <TextField
                  multiline
                  rows={8}
                  className="w-[100%] my-[20px]"
                  size="small"
                  id="descripton"
                  label="descripton"
                  name="description"
                  onChange={handleChange}
                  value={values.description}
                  error={Boolean(errors.description)}
                  helperText={errors.description}
                />
              </div>
              <div className="flex ">
                <FormControlLabel
                  label="In stock"
                  id="inStock"
                  control={
                    <Checkbox
                      label="inStock"
                      onChange={() => setAvaliavle(!avaliable)}
                      name="inStock"
                      defaultChecked
                    />
                  }
                />
              </div>
              <Button variant="contained" component="label">
                Upload image
                <input
                  onChange={(e) => inputChangefile(e)}
                  name="image"
                  id="image"
                  hidden
                  type="file"
                />
              </Button>
              {itemImage && (
                <>
                  <Button color="error" onClick={() => removeImage()}>
                    Delete image
                  </Button>
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}${itemImage}`}
                    alt="Upload"
                  />
                </>
              )}
              <LoadingButton
                size="large"
                className="block mt-[20px]"
                color="error"
                variant="outlined"
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

export default CreateItem;
