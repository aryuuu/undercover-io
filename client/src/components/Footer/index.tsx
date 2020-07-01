import React from 'react';
import Link from '@material-ui/core/Link';
import { FaGithub } from 'react-icons/fa';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

function Copyright() {
  return (
    <Typography variant="body2" className="txt-white">
      {/* {'Copyright © '} */}
      {'Check me out on '}
      <Link color="inherit" href="https://github.com/aryuuu" target="_blank">
        github <FaGithub color="inherit"/>
      </Link>
      {/* {' '}
      {new Date().getFullYear()}
      {'.'} */}
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