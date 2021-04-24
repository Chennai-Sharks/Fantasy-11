import { Button, Card, TextField, Typography } from '@material-ui/core';
import React from 'react';

import classes from '../../styles/Login.module.scss';
import styles from '../../styles/Home.module.scss';
import { Field, Form, Formik } from 'formik';

interface UserDataInitialForm {
	email: string;
	phone: string;
	password: string;
}
interface UserDataPhoneForm {
	otp: string;
}

const LoginForm: React.FC = () => {
	const initialValues: UserDataInitialForm = {
		email: '',
		password: '',
		phone: '',
	};
	const initialPhoneFormValues: UserDataPhoneForm = {
		otp: '',
	};

	const [showInitialForm, setShowInitialForm] = React.useState(true);

	return showInitialForm ? (
		<Formik
			validateOnChange={true}
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

				// mutation
				// 	.mutateAsync(values)
				// 	.then((response: AxiosResponse<AuthServerResponse>) => {
				// 		userData.setEmail(response.data.email);
				// 		userData.setUserId(response.data.localId);
				// 		userData.setIsAuthenticated(true);

				// 		history.push(`/create-chat-room-${response.data.localId}`);
				// 	})
				// 	.catch((_) => setOpenAlert(true));

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
						{/* {mutation.isLoading ? (
					<HashLoader
						loading={mutation.isLoading}
						size={35}
						color='black'
					/>
				) : (
					'submit'
				)
				
				} */}
						submit
					</Button>
				</Form>
			)}
		</Formik>
	) : (
		<Formik
			validateOnChange={true}
			initialValues={initialPhoneFormValues}
			validate={(values) => {
				// const errors: Record<string, string> = {};
				// const regexp = new RegExp(
				// 	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				// );
				// if (!regexp.test(values.email)) errors.email = 'Email Invalid';
				// if (values.password.length <= 6)
				// 	errors.password = 'Password length should be greater than 6.';
				// return errors;
			}}
			onSubmit={(values, actions) => {
				actions.setSubmitting(true);

				// mutation
				// 	.mutateAsync(values)
				// 	.then((response: AxiosResponse<AuthServerResponse>) => {
				// 		userData.setEmail(response.data.email);
				// 		userData.setUserId(response.data.localId);
				// 		userData.setIsAuthenticated(true);

				// 		history.push(`/create-chat-room-${response.data.localId}`);
				// 	})
				// 	.catch((_) => setOpenAlert(true));

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
						type='input'
						autoFocus={true}
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
						{/* {mutation.isLoading ? (
					<HashLoader
						loading={mutation.isLoading}
						size={35}
						color='black'
					/>
				) : (
					'submit'
				)
				
				} */}
						submit
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export default LoginForm;
