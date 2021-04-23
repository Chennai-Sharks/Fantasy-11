import classes from './Footer.module.scss';

const Footer: React.FC = () => {
	return (
		<footer className={classes.footer}>
			<a
				href='https://github.com/Poujhit'
				target='_blank'
				rel='noopener noreferrer'
			>
				Made by Poujhit
			</a>
		</footer>
	);
};

export default Footer;
