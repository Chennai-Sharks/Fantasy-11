import React from 'react';

import { Card, Typography, Button } from '@material-ui/core';
import { useRouter } from 'next/router';

import classes from '@styles/Home.module.scss';
import { useMutation } from 'react-query';
import axios from 'axios';
import jwtStore from '@stores/jwtToken';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import FacebookLogin from 'react-facebook-login';
import userIdStore from '@stores/UserIdStore';

const Home: React.FC = () => {
	const router = useRouter();
	React.useEffect(() => {
		console.log(cookies.get('authSession'));
		if (typeof cookies.get('authSession') !== 'undefined') {
			router.replace('/Home/Matches');
		}
	}, []);

	const userIdstore = userIdStore((state) => state);

	const faceBookMutation = useMutation((newUser: { email: string }) => {
		return axios.post(
			`/api/facebook/login`,
			{
				...newUser,
			},
			{
				withCredentials: true,
			}
		);
	});

	const jwt = jwtStore((state) => state);

	const responseFacebook = (response: any) => {
		faceBookMutation
			.mutateAsync({
				email: response.email,
			})
			.then((res) => {
				console.log(res.data);
				userIdstore.setuserId(res.data.userId as string);
				router.push('Home/Matches');
			})
			.catch((error) => {});
	};

	return (
		<div className={classes.background}>
			<Card
				className={classes.Card}
				elevation={10}
				raised
				style={{
					borderRadius: '20px',
				}}
			>
				<Typography className={classes.title}>Welcome to Fantasy 11</Typography>
				<Typography className={classes.subTitle}>
					Fantasy 11 is a Game of Skill where you create a team of real players
					for an upcoming match and compete with other fans for big prizes.
				</Typography>
				<Typography className={classes.subTitle}>
					Your team earns points based on your players’ performances in the
					real-life match, so make sure you make the right choices!
				</Typography>
				<Typography className={classes.subTitle}>
					Login to create your Fantasy 11 Team!!
				</Typography>
				<div className={classes.ButtonGroup}>
					<Button
						className={classes.Button}
						onClick={() => {
							router.push('/login');
						}}
					>
						Login
					</Button>
					<Button
						className={classes.Button}
						onClick={() => {
							router.push('/register');
						}}
					>
						Register
					</Button>
				</div>

				<FacebookLogin
					appId='801446123894360'
					callback={responseFacebook}
					fields='id,email,name'
					size='small'
				/>
			</Card>
			<Typography className={classes.subTitle}>
				Copyright 2021 Chennai Sharks
			</Typography>
		</div>
	);
};

export default Home;
