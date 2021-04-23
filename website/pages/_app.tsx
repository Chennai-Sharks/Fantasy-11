import React from 'react';
import Head from 'next/head';

import type { AppProps } from 'next/app';

import '../styles/globals.scss';
import { StylesProvider } from '@material-ui/core';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
	React.useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement!.removeChild(jssStyles);
		}
	}, []);

	return (
		<StylesProvider injectFirst>
			<React.Fragment>
				<Head>
					<title>Fantasy 11</title>
					<meta
						name='viewport'
						content='width=device-width, initial-scale=1.0'
					></meta>
				</Head>
				<Component {...pageProps} />
			</React.Fragment>
		</StylesProvider>
	);
};

export default MyApp;
