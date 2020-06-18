import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import '../styles/style.css';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/aryuuu" target="_blank">
        M Algah Fattah Illahi
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const Footer = () => {
	return (
		<footer className="footer">
			<Container maxWidth="sm">
				<Copyright />
			</Container>
		</footer>
	);
}

export default Footer;