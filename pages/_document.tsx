import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '../theme/Default-theme';

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					<meta name='theme-color' content={theme.palette.primary.main} />

					<meta
						name='description'
						content='A Game of Skill where you create a team of real players for an upcoming match and compete with other fans for big prizes. '
					></meta>
					<meta name='robots' content='index, follow' />
					<link rel='icon' href='logo.png' />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

MyDocument.getInitialProps = async (ctx) => {
	const sheets = new ServerStyleSheets();
	const originalRenderPage = ctx.renderPage;

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
		});

	const initialProps = await Document.getInitialProps(ctx);

	return {
		...initialProps,
		styles: [
			...React.Children.toArray(initialProps.styles),
			sheets.getStyleElement(),
		],
	};
};
