import React from 'react';
import { Link } from 'react-router-dom';
/** components */
import Footer from '../components/Footer';
/** styles */
import '../styles/style.css';
/** images */
import incognitoLogo from '../assets/incognito.svg';
import googleIcon from '../assets/googleicon.svg';
import leftArrow from '../assets/left-chevron.png';
import rightArrow from '../assets/right-chevron.png';

const Home = (props) => {
	return (
		<div className="root">
			{/* menu */}
			<div className="main fr c-container">
				<div className="menu fr c-container">
					<div id="left-panel" className="menu-panel fc c-container bg-white">
						<div id="avatar-choice" className="fr c-container">
							<img className="arrow c-item" src={leftArrow} alt="left arrow"/>
							<img className="icon avatar c-item" src={incognitoLogo} alt="avatar"/>
							<img className="arrow c-item" src={rightArrow} alt="right arrow"/>
						</div>
						<div className="form-element c-container">
							<p className="form-text">Nickname</p>
							<input type="text" placeholder="XxXPussySlayer_69XxX"/>
						</div>
						<div className="fr c-container">
							<Link to="/room" className="nav">Create</Link>
							<Link to="/room" className="nav">Join</Link>
						</div>
					</div>
					<div id="right-panel" className="menu-panel fc bg-white">
						<div className="fc c-container c-item">
							<h1>Login using google</h1>
							<img className="icon c-item" src={googleIcon} alt="google icon"/>
						</div>
					</div>
				</div>				
			</div>

			{/* footer */}
			<Footer/>
		</div>
	);
}

export default Home;