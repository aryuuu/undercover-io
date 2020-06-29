import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { 
	FaChevronLeft, 
	FaChevronRight 
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';

/** components */
import Footer from '../components/Footer';
/** images */
import incognitoLogo from '../assets/incognito.svg';

interface Props {

}

const Home = (props: Props) => {

	const createRoom = () => {
		Swal.fire({
			title: 'Creating your room',
			text: 'please wait...',
			showConfirmButton: false,
			timer: 1500,
			timerProgressBar: true,
		})
	}

	const showLoading = () => {
		Swal.fire({
			title: 'Loading',
			text: 'you will be in your room in a second',
			showConfirmButton: false,
			timer: 1000,
			timerProgressBar: true
		})
	}

	return (
		<div className="root">
			{/* menu */}
			<div className="main fr c-container">
				<div className="menu fr c-container">
					<div id="left-panel" className="menu-panel fc c-container bg-white">
						<div id="avatar-choice" className="fr c-container">
							<FaChevronLeft size="4em" className="c-item"/>
							<img className="icon avatar c-item" src={incognitoLogo} alt="avatar"/>
							<FaChevronRight size="4em" className="c-item"/>
						</div>
						<div className="form-element c-container">
							<form action="">
								{/* <p className="form-text">Nickname</p> */}
								<input type="text" placeholder="XxXPussySlayer_69XxX"/>
							</form>
						</div>
						<div className="fr c-container">
							<Link to="/room/1342384" className="nav" onClick={createRoom}  >Create</Link>
							<Link to="/room/13254477" className="nav" onClick={showLoading} >Join</Link>
						</div>
					</div>
					<div id="right-panel" className="menu-panel fc c-container bg-white">
						<div className="fc c-container c-item">
							<h1>Login using google</h1>
							<FcGoogle size="5em" className="c-item" />
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