import React from 'react';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

function Copyright() {
  return (
    <Typography variant="body2" className="txt-white">
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
			<Container maxWidth="sm" >
				<Copyright />
			</Container>
		</footer>
	);
}

export default Footer;