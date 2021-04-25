import {
	Button,
	Card,
	Snackbar,
	TextField,
	Typography,
} from '@material-ui/core';
import React from 'react';
import auth from '../../stores/Auth';

import classes from '../../styles/Login.module.scss';
import { Field, Form, Formik } from 'formik';
import userDataStore from '../../stores/UserDataStore';
import axios, { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { HashLoader } from 'react-spinners';
import jwtStore from '../../stores/jwtToken';

interface UserDataInitialForm {
	email: string;
	phone: string;
	password: string;
}
interface UserDataPhoneForm {
	otp: string;
}

interface JwtToken {
	token: string;
}

const LoginForm: React.FC = () => {
	// console.log(auth.isAuthenticated());

	const initialPhoneFormValues: UserDataPhoneForm = {
		otp: '',
	};

	const [openAlert, setOpenAlert] = React.useState(false);
	const [snackContent, setsnackContent] = React.useState(' ');

	const [hash, setHash] = React.useState('');

	const jwt = jwtStore((state) => state);

	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenAlert(false);
	};

	const router = useRouter();

	const userData = userDataStore((state) => state);
	const initialValues: UserDataInitialForm = {
		email: userData.email,
		password: userData.password,
		phone: userData.phone,
	};

	const [showInitialForm, setShowInitialForm] = React.useState(true);

	const mutation = useMutation((newUser: UserDataInitialForm) => {
		return axios.post('http://localhost:4000/api/users/login/', {
			email: newUser.email,
			password: newUser.password,
		});
	});

	const mutationOtp = useMutation((phoneNo: string) => {
		return axios.post('http://localhost:4000/api/users/sendOTP', {
			phone: phoneNo,
		});
	});

	const verifyOtpMutation = useMutation(
		(verifyOtp: { phone: string; hash: string; otp: string }) => {
			return axios.post('http://localhost:4000/api/users/verifyOTP', {
				...verifyOtp,
			});
		}
	);

	return (
		<React.Fragment>
			{showInitialForm ? (
				<Formik
					validateOnChange={true}
					initialValues={initialValues}
					validate={(values) => {
						const errors: Record<string, string> = {};
						const regexp = new RegExp(
							/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
						);
						const regexPhone = new RegExp(/^[6-9]\d{9}$/);

						if (!regexp.test(values.email)) errors.email = 'Email Invalid';
						if (values.password.length <= 6)
							errors.password = 'Password length should be greater than 6.';
						if (!regexPhone.test(values.phone))
							errors.phone = 'Phone Number Invalid';
						return errors;
					}}
					onSubmit={(values, actions) => {
						actions.setSubmitting(true);

						mutation
							.mutateAsync(values)
							.then((response: AxiosResponse<JwtToken>) => {
								console.log(response.data.token);
								console.log(response.data);
								jwt.setJwt(response.data.token);
								mutationOtp
									.mutateAsync(values.phone)
									.then((res) => {
										setHash(res.data.hash as string);
										console.log(res.data);
									})
									.catch((error) => {
										setsnackContent(error.toString());
										setOpenAlert(true);
									});

								setShowInitialForm(false);
							})
							.catch((error) => {
								setsnackContent(error.toString());
								setOpenAlert(true);
							});

						actions.setSubmitting(false);
					}}
				>
					{({ isSubmitting, errors }) => (
						<Form
							style={{
								display: 'flex',
								flexDirection: 'column',
								width: '80%',
								height: '70%',
								marginTop: '10px',
								overflowX: 'hidden',
								overflowY: 'auto',
							}}
						>
							<Field
								variant='outlined'
								type='input'
								autoFocus={true}
								name='email'
								style={{
									marginBottom: '30px',
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
								type='input'
								autoFocus={true}
								name='phone'
								style={{
									marginBottom: '30px',
								}}
								fullWidth
								label='Phone Number'
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
			) : (
				<Formik
					// validateOnChange={true}
					initialValues={initialPhoneFormValues}
					validate={(values) => {
						const errors: Record<string, string> = {};
						if (values.otp !== undefined && values.otp.length < 4)
							errors.otp = 'OTP is invalid';
						return errors;
					}}
					onSubmit={(values, actions) => {
						actions.setSubmitting(true);

						verifyOtpMutation
							.mutateAsync({
								otp: values.otp,
								phone: userData.phone,
								hash: hash,
							})
							.then((res) => {
								console.log(res);
								router.replace('/home/matches');
							})
							.catch((error) => {
								setsnackContent(error.toString());
								setOpenAlert(true);
							});

						actions.setSubmitting(false);
					}}
				>
					{({ isSubmitting, errors }) => (
						<Form
							style={{
								display: 'flex',
								flexDirection: 'column',
								width: '80%',
								height: '50%',
								marginTop: '10px',
								overflowX: 'hidden',
								overflowY: 'auto',
							}}
						>
							<Field
								variant='outlined'
								type='number'
								autoFocus={false}
								name='otp'
								style={{
									marginBottom: '30px',
									marginTop: '10px',
								}}
								fullWidth
								label='Enter OTP'
								error={!!errors.otp}
								helperText={errors.otp}
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
			)}
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
