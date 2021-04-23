import Footer from '../components/Footer/Footer';
import classes from '../styles/Home.module.scss';

const Home: React.FC = () => {
	return (
		<div className={classes.container}>
			<main className={classes.main}>
				<h1 className={classes.title}>
					Modern <a href='https://nextjs.org'>Next.js</a> Starter Kit
				</h1>

				<p className={classes.description}>
					Get started by editing{' '}
					<code className={classes.code}>pages/index.tsx</code>
				</p>

				<p className={classes.description}>
					Features included in this starter kit:
				</p>

				<div className={classes.grid}>
					<div className={classes.card}>
						<h3>Typescript &rarr;</h3>
						<p>Full Typescript support is added.</p>
					</div>

					<div className={classes.card}>
						<h3>SCSS Support &rarr;</h3>
						<p>Sass Modules is installed by default.</p>
					</div>

					<div className={classes.card}>
						<h3>Material UI &rarr;</h3>
						<p>SSR Material UI is added. No extra configuration needed</p>
					</div>

					<div className={classes.card}>
						<h3>Next Images &rarr;</h3>
						<p>Import images in Next.js. Works out of the box!!</p>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default Home;
