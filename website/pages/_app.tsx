import React from 'react';
import Head from 'next/head';

import type { AppProps } from 'next/app';

import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
	React.useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement!.removeChild(jssStyles);
		}
	}, []);

	return (
		<React.Fragment>
			<Head>
				<title>Next.js Starter Kit</title>
			</Head>
			<Component {...pageProps} />
		</React.Fragment>
	);
};

export default MyApp;
