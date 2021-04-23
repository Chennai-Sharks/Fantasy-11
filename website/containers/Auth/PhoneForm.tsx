import { Button, Card, TextField, Typography } from '@material-ui/core';
import React from 'react';

import classes from './AuthScreen.module.scss';
import styles from '../../styles/Home.module.scss';
import { Field, Form, Formik } from 'formik';

interface UserDataForm {
	phone: string;
	password: string;
	otp: string;
}

const AuthContainer: React.FC = () => {
	const initialValues: UserDataForm = { phone: '', password: '', otp: '' };

	return (
		<Formik
			validateOnChange={true}
			initialValues={initialValues}
			validate={(values) => {
				const errors: Record<string, string> = {};
				const regexp = new RegExp(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				);

				if (!regexp.test(values.phone)) errors.phone = 'phone Invalid';
				if (values.password.length <= 6)
					errors.password = 'Password length should be greater than 6.';
				return errors;
			}}
			onSubmit={(values, actions) => {
				actions.setSubmitting(true);

				// mutation
				// 	.mutateAsync(values)
				// 	.then((response: AxiosResponse<AuthServerResponse>) => {
				// 		userData.setphone(response.data.phone);
				// 		userData.setUserId(response.data.localId);
				// 		userData.setIsAuthenticated(true);

				// 		history.push(`/create-chat-room-${response.data.localId}`);
				// 	})
				// 	.catch((_) => setOpenAlert(true));

				// actions.setSubmitting(false);
			}}
		>
			{({ isSubmitting, errors }) => (
				<Form
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
						height: '100%',
						marginTop: '10px',
					}}
				>
					<div className={classes.TextFieldStyle}>
						<Field
							variant='outlined'
							type='input'
							autoFocus={true}
							name='phone'
							fullWidth
							label='phone'
							error={!!errors.phone}
							helperText={errors.phone}
							as={TextField}
						/>
					</div>
					<div className={classes.TextFieldStyle}>
						<Field
							variant='outlined'
							type='password'
							fullWidth
							error={!!errors.password}
							label='Password'
							helperText={errors.password}
							name='password'
							as={TextField}
						/>
					</div>
					<Button
						disabled={isSubmitting}
						className={classes.LoginorSignupButton}
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

export default AuthContainer;
