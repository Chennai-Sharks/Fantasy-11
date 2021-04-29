import { Button } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { useRouter } from 'next/router';

interface LogoutButtonProps {}

const LogoutButton: React.FC<LogoutButtonProps> = (props) => {
	const router = useRouter();

	return (
		<Button
			style={{}}
			onClick={async () => {
				await axios.get('http://localhost:4000/api/users/logout', {
					withCredentials: true,
				});
				router.replace('/');
			}}
		>
			logout
		</Button>
	);
};
export default LogoutButton;
