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
import Footer from '../../components/Footer';
import { useSocket } from '../../components/SocketContext';
import { usePlayer, useRoom } from '../../components/GameContext';
/** types */
import { 
	Room,
	Response,
	JoinRoomReq,
	JoinRoomRes,
	CreateRoomReq,
	CreateRoomRes,
	Player as PlayerIf,
} from '../../types';
/**resources */
/** handlers */
import { reqCreateRoom, reqJoinRoom } from '../../handlers';

interface Prop {

}

const Home = (props: Prop) => {
	const history = useHistory();
	const socket = useSocket();
	const myPlayer = usePlayer();
	const myRoom = useRoom();
	const [avatar, setAvatar] = useState(0);

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
	}
	const updateUsername = (name: string) => {
		myPlayer.username = name;
	}
	
	const createRoom = () => {
		if (!myPlayer.username) {
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
				Swal.fire({
					title: 'Confirm',
					html: `
						<p>Player: ${result.value[0]}</p>
						<p>Undercover: ${result.value[1]}</p>
						<p>Mr White: ${result.value[2]}</p>
					`,
					confirmButtonText: 'Create',
					showLoaderOnConfirm: true,
					preConfirm: () => {
						let status = reqCreateRoom(socket, {
							reqId: uuid(),
							host: myPlayer,
							player: parseInt(result.value[0]),
							undercover: parseInt(result.value[1]),
							mrwhite: parseInt(result.value[2])
						} as CreateRoomReq);
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
		if (!myPlayer.username) {
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
			preConfirm: (value) => {
				let status = reqJoinRoom(socket,{
					reqId: uuid(),
					roomId: value,
					player: myPlayer
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
	}, []);

	useEffect(() => {
		myPlayer.avatar = dummyAvatars[avatar];
	}, [avatar])
	
	socket.on('new-connection-notif', (res: any) => {
		console.log(res);
	});
	socket.on('create-reply', (res: CreateRoomRes) => {
		if (res.status === 'success') {
			console.log('room created');
			const {room : newRoom} = res;
			myPlayer.isHost = myPlayer.id === newRoom.host;
			myRoom.id = newRoom.id;
			myRoom.host = newRoom.host;
			myRoom.players = newRoom.players;
			myRoom.playerSlot = newRoom.playerSlot;
			myRoom.mrwhiteSlot = newRoom.mrwhiteSlot;
			myRoom.undercoverSlot = newRoom.undercoverSlot;

			history.push({
				pathname: `/room/${res.room.id}`,
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
			const { room: newRoom } = res;
			myRoom.id = newRoom.id;
			myRoom.players = newRoom.players;
			myRoom.playerSlot = newRoom.playerSlot;
			myRoom.undercoverSlot = newRoom.undercoverSlot;
			myRoom.mrwhiteSlot = newRoom.mrwhiteSlot;
			myRoom.isPlaying = newRoom.isPlaying;

			history.push({
				pathname: `/room/${res.room.id}`
			})
			Swal.fire({
				title: 'Please wait',
				timer: 1000,
				onBeforeOpen: () => Swal.showLoading()
			})
		} else {
			Swal.fire({
				icon: 'error',
				text: `${res.message}`
			})
		}
	});

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
										// value={myPlayer.username}
										placeholder="XxXPussySlayer_69XxX" 
										className="bg-black-olive txt-white txt-center" 
										onChange={(e) => updateUsername(e.target.value)}
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
				<Footer/>
				
			</div>
		</>
	);
}

export default Home;