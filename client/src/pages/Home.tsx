import React, { FormEvent } from 'react';
import Head from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

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
import JoinRoomCard from '../components/JoinRoomCard';
/** images */
import incognitoLogo from '../assets/incognito.svg';

interface Prop {

}

const Home = (props: Prop) => {
	const history = useHistory();
	const [ playerCount, setPlayerCount ] = useState(4);
	const [ UndercoverCount, setUndercoverCount ] = useState(1);
	const [ mrWhiteCount, setMrWhiteCount ] = useState(0);
	
	const createRoom = () => {
		Swal.fire({
			title: 'Create room',
			icon: 'warning',
			html: `
			<h4>Player</h4>
			<input type="range" id="player-count" class="swal2-input" name="player-count" min="4" max="20"/>
			<h4>Undercover</h4>
			<input type="range" id="undercover-count" class="swal2-input" name="undercover-count" min="1" max="20"/>
			<h4>Mr. White</h4>
			<input type="range" id="mr-white-count" class="swal2-input" name="mr-white-count" min="0" max="20"/>`,
			preConfirm: () => {
				// if (document.getElementById('player-count') && 
				// 		document.getElementById('player-count') && 
				// 		document.getElementById('player-count')) {
				// 		setPlayerCount(parseInt((document.getElementById('player-count')! as HTMLInputElement).value) || 4);
				// 		setUndercoverCount(parseInt((document.getElementById('undercover-count')! as HTMLInputElement).value) || 4);
				// 		setMrWhiteCount(parseInt((document.getElementById('mrwhite-count')! as HTMLInputElement).value) || 4);
				// }
				history.push({
					pathname: '/room/12345'
				})
				
			}
		})
	};

	const createHook = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		history.push({
			pathname: '/room/123455'
		});
	};

	const joinHook = (e: any) => {
		e.preventDefault();
		const roomId: string = e.target.roomId.value.trim();
		history.push({
			pathname: `/room/${roomId}`
		});
	};

	const joinForm = () => {
		return (
			<form onSubmit={joinHook} className="fc c-container">
				<input type="text" name="roomId" placeholder="room id" className="c-item"/>
				<button type="submit" className="c-item">Join</button>
			</form>
		)
	}
	const joinRoom = () => {
		Swal.fire({
			title: 'Join room',
			// html: renderToStaticMarkup(<JoinRoomCard/>)
			input: 'text',
			showCancelButton: true,
			preConfirm: (value) => {
				history.push({
					pathname: `/room/${value}`
				})
			}
			
		})

		// swal({
		// 	title: 'Join room',
		// 	text: 'Enter room id',
		// 	buttons: false,
		// 	content: (
		// 		<form onSubmit={joinHook} className="fc c-container">
		// 			<input type="text" name="roomId" placeholder="room id" className="c-item"/>
		// 			<button type="submit" className="c-item">Join</button>
		// 		</form>
		// 	)
		// })
	};

	useEffect(() => {
		document.title = "Home | undercover.io"
	}, []);

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
								{/* <Link to="/room/1342384" className="nav txt-white" onClick={createRoom}  >Create</Link>
								<Link to="/room/13254477" className="nav txt-white" onClick={joinRoom} >Join</Link> */}
								<p id="create" className="nav txt-white" onClick={createRoom}>Create</p>
								<p id="join" className="nav txt-white" onClick={joinRoom}>Join</p>
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