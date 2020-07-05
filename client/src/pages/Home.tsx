import React from 'react';
import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { v4 as uuid } from 'uuid';

import { 
	FaChevronLeft, 
	FaChevronRight 
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';

/** components */
import Footer from '../components/Footer';
/** types */
import { 
	Room,
	Player,
	CreateRoomReq,
	JoinRoomReq,
	CreateRoomRes,
	JoinRoomRes
} from '../types';
/**resources */
// import { apiUrl, dummyApiUrl } from '../config'
/** handlers */
import { reqCreateRoom, reqJoinRoom } from '../handlers';

interface Prop {

}

const Home = (props: Prop) => {
	const history = useHistory();
	const [username, setUsername] = useState('');
	const [avatar, setAvatar] = useState(0);
	const [socket, setSocket] = useState(null as unknown as SocketIOClient.Socket);

	const dummyAvatars: string[] = [
		'incognito', 
		'bone',
		'bone-02',
		'bug-03',
		'cat',
		'cat-03',
		'owl',
		'social-01',
		'spider-02',
		'spider-03',
		'square-social-01',
		'pig-03'
	];
	
	const prevAvatar = () => {
		setAvatar((((avatar-1) % dummyAvatars.length) + dummyAvatars.length) % dummyAvatars.length);
	};
	const nextAvatar = () => {
		setAvatar((((avatar+1) % dummyAvatars.length) + dummyAvatars.length) % dummyAvatars.length);
	};
	const submitUsername = (e: any) => {
		e.preventDefault();
		if (e.target.username.value.trim()) {
			setUsername(e.target.username.value.trim());
		}
	}
	
	const createRoom = () => {
		if (!username) {
			Swal.fire({
				icon: 'error',
				text: 'Please specify username'
			})
			return;
		}
		Swal.mixin({
			input: 'range',
			confirmButtonText: 'Next &rarr;',
			progressSteps: ['1', '2', '3']
		}).queue([
			{
				title: 'Player',
				inputValue: '4',
				inputAttributes: {
					min: '4',
					max: '20'
				}
			},
			{
				title: 'Undercover',
				inputValue: '1',
				inputAttributes: {
					min: '0',
					max: '20'
				}
			},
			{
				title: 'Mr. White',
				inputValue: '0',
				inputAttributes: {
					min: '0',
					max: '20'
				}
			},
		]).then((result: any) => {
			if (result.value) {
				const answers = JSON.stringify(result.value);
				Swal.fire({
					title: 'Confirm',
					html: `
						<p>Player: ${result.value[0]}</p>
						<p>Undercover: ${result.value[1]}</p>
						<p>Mr White: ${result.value[2]}</p>
					`,
					confirmButtonText: 'Create',
					showLoaderOnConfirm: true,
					preConfirm: async () => {
						let status = await reqCreateRoom(socket, {
							reqId: uuid(),
							userId: `${username}${Date.now()}`,
							username: username,
							player: parseInt(result.value[0]),
							undercover: parseInt(result.value[1]),
							mrwhite: parseInt(result.value[2])
						});
						if (status !== 'success') {
							Swal.fire({
								icon: 'error',
								text: `${status}`
							})
						}
					
					}
				})
			}
		})
		
	};
	const joinRoom = () => {
		if (!username) {
			Swal.fire({
				icon: 'error',
				text: 'Please specify username'
			})
			return;
		}
		Swal.fire({
			title: 'Join Room',
			input: 'text',
			confirmButtonText: 'Join',
			preConfirm: async (value) => {
				let status = await reqJoinRoom(socket, value, {
					id: `${username}${Date.now()}`,
					username: username,
					isHost: false,
					isAlive: true,
					avatar: dummyAvatars[avatar],
					score: 0
				});
				if (status !== 'success') {
					Swal.fire({
						icon: 'error',
						text: `${status}`
					})
				}
			}
			
		});
	};
	
	useEffect(() => {
		document.title = "Home | undercover.io"
		setSocket(io('http://localhost:3003/', { transports: ['polling', 'websocket']}));
	}, []);
	
	useEffect(() => {
		if (!socket) return;
		
		socket.on('new-connection-notif', (res: any) => {
			console.log(res);
		});
		socket.on('create-reply', (res: CreateRoomRes) => {
			if (res.status === 'success') {
				
				history.push({
					pathname: `/room/${res.roomId}`,
				});
				Swal.fire({
					title: `Server`,
					icon: 'success',
					text: `${res.message}`,
					timer: 2000,
					onBeforeOpen: () => Swal.showLoading()
				});

			} else {
				Swal.fire({
					icon: 'error',
					text: `${res.message}`
				});
			}
		});
		socket.on('join-reply', (res: JoinRoomRes) => {
			if (res.status === 'success') {
				history.push({
					pathname: `/room/${res.roomId}`
				})
				Swal.fire({
					title: 'Please wait',
					timer: 1000,
					onBeforeOpen: () => Swal.showLoading()
					// preConfirm: () => {
					// 	history.push(`/room/${res.roomId}`)
					// }
				})
			} else {
				Swal.fire({
					icon: 'error',
					text: `${res.message}`
				})
			}
		})
	}, [socket]);

	return (
		<>
			<div className="root bg-rich-black">
				{/* menu */}
				<div className="main fr c-container">
					<div className="menu fr c-container">
						<div id="left-panel" className="menu-panel fc c-container bg-raisin-black">
							<div id="avatar-choice" className="fr c-container">
								<FaChevronLeft size="4em" className="c-item txt-white" onClick={prevAvatar} />
								<img 
									className="icon avatar c-item bg-white" 
									src={`/img/${dummyAvatars[avatar]}.svg`} 
									alt="avatar"
								/>
								<FaChevronRight size="4em" className="c-item txt-white" onClick={nextAvatar}/>
							</div>
							<div className="form-element c-container">
								<form action="" onSubmit={submitUsername}>
									<input 
										id="username"
										type="text" 
										name="username"
										placeholder="XxXPussySlayer_69XxX" 
										className="bg-black-olive txt-white txt-center" 
										onChange={(e) => setUsername(e.target.value)}
									/>
								</form>
							</div>
							<div className="fr c-container">
								<p id="create" className="nav txt-white txt-fredoka" onClick={createRoom}>Create</p>
								<p id="join" className="nav txt-white txt-fredoka" onClick={joinRoom}>Join</p>
							</div>
						</div>
						<div id="right-panel" className="menu-panel fc c-container bg-raisin-black">
							<div className="fc c-container c-item">
								<h1 className="txt-white txt-fredoka">Login using google</h1>
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