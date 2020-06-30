import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { 
	FaChevronLeft, 
	FaChevronRight 
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import swal from '@sweetalert/with-react';
import { FcGoogle } from 'react-icons/fc';

/** components */
import Footer from '../components/Footer';
import CreateRoomCard from '../components/CreateRoomCard';
/** images */
import incognitoLogo from '../assets/incognito.svg';

interface Prop {

}

const Home = (props: Prop) => {

	const createRoom = () => {
		swal({
			title: 'Create room',
			text: 'content',
			buttons: false,
			content: (<CreateRoomCard/>)
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
		<>
			<div className="root bg-rich-black">
				{/* menu */}
				<div className="main fr c-container">
					<div className="menu fr c-container">
						<div id="left-panel" className="menu-panel fc c-container bg-raisin-black">
							<div id="avatar-choice" className="fr c-container">
								<FaChevronLeft size="4em" className="c-item txt-white"/>
								<img className="icon avatar c-item bg-white" src={incognitoLogo} alt="avatar"/>
								<FaChevronRight size="4em" className="c-item txt-white"/>
							</div>
							<div className="form-element c-container">
								<form action="">
									<input type="text" placeholder="XxXPussySlayer_69XxX" className="bg-black-olive rounded"/>
								</form>
							</div>
							<div className="fr c-container">
								<Link to="/room/1342384" className="nav txt-white" onClick={createRoom}  >Create</Link>
								<Link to="/room/13254477" className="nav txt-white" onClick={showLoading} >Join</Link>
							</div>
						</div>
						<div id="right-panel" className="menu-panel fc c-container bg-raisin-black">
							<div className="fc c-container c-item">
								<h1 className="txt-white">Login using google</h1>
								<FcGoogle size="5em" className="c-item" />
							</div>
						</div>
					</div>				
				</div>
				{/* footer */}
				<Footer/>
			</div>
		</>
	);
}

export default Home;