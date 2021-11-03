import { Button, Snackbar, TextField } from '@material-ui/core';
import React from 'react';

import classes from '@styles/Login.module.scss';
import { Field, Form, Formik } from 'formik';
import userDataStore from '@stores/UserDataStore';
import axios, { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { HashLoader } from 'react-spinners';
import jwtStore from '@stores/jwtToken';
import userIdStore from '@stores/UserIdStore';

interface UserDataInitialForm {
  email: string;
  password: string;
}

interface Result {
  token: string;
  userId: string;
}

const LoginForm: React.FC = () => {
  const [openAlert, setOpenAlert] = React.useState(false);
  const [snackContent, setsnackContent] = React.useState(' ');

  const jwt = jwtStore((state) => state);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const router = useRouter();
  const userIdstore = userIdStore((state) => state);

  const userData = userDataStore((state) => state);
  const initialValues: UserDataInitialForm = {
    email: userData.email,
    password: userData.password,
  };

  const mutation = useMutation((newUser: UserDataInitialForm) => {
    return axios.post(
      `/api/login`,
      {
        email: newUser.email,
        password: newUser.password,
      },
      {
        withCredentials: true,
      }
    );
  });

  return (
    <React.Fragment>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
        initialValues={initialValues}
        validate={(values) => {
          const errors: Record<string, string> = {};
          const regexp = new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );

          if (!regexp.test(values.email)) errors.email = 'Email Invalid';
          if (values.password.length <= 6)
            errors.password = 'Password length should be greater than 6.';

          return errors;
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);

          mutation
            .mutateAsync(values)
            .then(async (response: AxiosResponse<Result>) => {
              jwt.setJwt(response.data.token);
              userIdstore.setuserId(response.data.userId);
              router.replace('/home/matches');
            })
            .catch((error) => {
              setsnackContent(error.response.data);
              setOpenAlert(true);
            });

          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form className={classes.FormEmailStyle}>
            <Field
              variant='outlined'
              type='input'
              name='email'
              style={{
                marginBottom: '40px',
                marginTop: '10px',
              }}
              fullWidth
              label='Email'
              error={!!errors.email}
              helperText={errors.email}
              as={TextField}
            />
            <Field
              variant='outlined'
              type='password'
              fullWidth
              style={{
                marginBottom: '20px',
              }}
              error={!!errors.password}
              label='Password'
              helperText={errors.password}
              name='password'
              as={TextField}
            />

            <Button
              disabled={isSubmitting}
              className={classes.Button}
              type='submit'
            >
              {mutation.isLoading ? (
                <HashLoader
                  loading={mutation.isLoading}
                  size={35}
                  color='black'
                />
              ) : (
                'submit'
              )}
            </Button>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleClose}
        message={snackContent}
        action={
          <Button onClick={handleClose} style={{ color: 'white' }}>
            Close
          </Button>
        }
      />
    </React.Fragment>
  );
};

export default LoginForm;
