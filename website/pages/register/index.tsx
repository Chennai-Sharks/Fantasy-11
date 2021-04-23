import Head from 'next/head';
import React from 'react';
import { Button, Card, TextField, Typography } from '@material-ui/core';

import classes from '../../styles/Login.module.scss';
import styles from '../../styles/Home.module.scss';
import { Field, Form, Formik } from 'formik';

interface RegisterUser {
	email: string;
	phone: string;
	password: string;
}

const RegisterScreen: React.FC = () => {
	const initialValues: RegisterUser = {
		email: '',
		phone: '',
		password: '',
	};
	return (
		<React.Fragment>
			<Head>
				<title>Fantasy 11 | Register</title>
			</Head>
			<div className={classes.background}>
				<Card
					className={classes.Card}
					variant='elevation'
					raised
					style={{
						borderRadius: '20px',
					}}
				>
					<div className={classes.leftPortionCard}>
						<Typography
							className={styles.title}
							style={{
								color: 'white',
							}}
						>
							Register
						</Typography>
					</div>
					<div className={classes.rightPortionCard}>
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

								// actions.setSubmitting(false);
							}}
						>
							{({ isSubmitting, errors }) => (
								<Form
									style={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'center',
										width: '80%',
										height: '100%',
									}}
								>
									<Field
										variant='outlined'
										style={{
											marginBottom: '20px',
										}}
										type='input'
										autoFocus={true}
										name='email'
										fullWidth
										label='Email'
										error={!!errors.email}
										helperText={errors.email}
										as={TextField}
									/>
									<Field
										variant='outlined'
										type='phone'
										fullWidth
										style={{
											marginBottom: '20px',
										}}
										error={!!errors.phone}
										label='Phone Number'
										helperText={errors.phone}
										name='phone'
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
					</div>
				</Card>
			</div>
		</React.Fragment>
	);
};

export default RegisterScreen;
