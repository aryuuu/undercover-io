import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';

import Swal from 'sweetalert2';
import { v4 as uuid } from 'uuid';
import { FiArrowLeft } from 'react-icons/fi';

/** types */
import { Log, Chat, Player, Room as RoomIf, Response } from '../../types';
/** handlers */
import { sendChat, startGameReq } from '../../handlers'
/** components */
import Footer from '../../components/Footer';
import LogCard from '../../components/LogCard';
import ChatCard from '../../components/ChatCard';
import PlayerCard from '../../components/PlayerCard';
import { usePlayer, useRoom } from '../../components/GameContext';
import { useSocket }  from '../../components/SocketContext';
/** images */

interface MatchParams {
	roomId: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

const Room = (props: Props) => {
	const history = useHistory();
	const { match } = props;
	const socket = useSocket();
	const myPlayer = usePlayer();
	const myRoom = useRoom();
	const { roomId } = match.params;
	
	const dummyLog: Log[] = [
		{
			type: 'info',
			content: `you just entered room ${roomId}`,
			timestamp: Date.now()
		},
		{
			type: 'warning',
			content: 'Bender is a bandit',
			timestamp: Date.now()
		},
		{
			type: 'info',
			content: 'Fry is a dimwit',
			timestamp: Date.now()
		},
		{
			type: 'warning',
			content: 'Leela is dead',
			timestamp: Date.now()
		},
		{
			type: 'info',
			content: 'Amy is leaving',
			timestamp: Date.now()
		},
		{
			type: 'info',
			content: 'Why not Zoidberg',
			timestamp: Date.now()
		},
	];
	const dummyChat: Chat[] = [
		{
			senderId: 'fry',
			sender: 'Fry',
			content: 'Leela, i lov u',
			roomId: 'myroom',
			timestamp: Date.now()
		},
		{
			senderId: 'leela',
			sender: 'Leela',
			content: 'stop it fry',
			roomId: 'myroom',
			timestamp: Date.now()
		},
		{
			senderId: 'leela',
			sender: 'Leela',
			content: 'maybe im too harsh on you fry',
			roomId: 'myroom',
			timestamp: Date.now()
		},
		{
			senderId: 'amy',
			sender: 'Amy',
			content: 'can i have my ribs now?',
			roomId: 'myroom',
			timestamp: Date.now()
		},
		{
			senderId: 'hubert',
			sender: 'Hubert',
			content: 'Good news everyone',
			roomId: 'myroom',
			timestamp: Date.now()
		},
		{
			senderId: 'bender',
			sender: 'Bender',
			content: 'hey fry, you suck',
			roomId: 'myroom',
			timestamp: Date.now()
		},
		{
			senderId: 'zoidberg',
			sender: 'Zoidberg',
			content: 'Why not Zoidberg',
			roomId: 'myroom',
			timestamp: Date.now()
		},
		{
			senderId: 'hermes',
			sender: 'Hermes',
			content: 'Sweet llamas of bahamas',
			roomId: 'myroom',
			timestamp: Date.now()
		},
		{
			senderId: 'hermes',
			sender: 'Hermes',
			content: 'stop it you stupid crab',
			roomId: 'myroom',
			timestamp: Date.now()
		},
		{
			senderId: 'scruffy',
			sender: 'Scruffy',
			content: 'im scruffy the janitor',
			roomId: 'myroom',
			timestamp: Date.now()
		},
		{
			senderId: 'bender',
			sender: 'Bender',
			content: 'bite my shiny metal ass',
			roomId: 'myroom',
			timestamp: Date.now()
		},
	];
	const dummyPlayer: Player[] = [
		myPlayer,
		{
			id: 'fry',
			username: 'Fry',
			score: 0,
			avatar: 'owl',
			isHost: false,
			isAlive: true
		},
		{
			id: 'leela',
			username: 'Leela',
			score: 10,
			avatar: 'cat',
			isHost: false,
			isAlive: true
		},
		{
			id: 'bender',
			username: 'Bender',
			score: 10000,
			avatar: 'bone',
			isHost: true,
			isAlive: true
		},
		{
			id: 'hubert',
			username: 'Hubert',
			score: 20,
			avatar: 'bug-03',
			isHost: false,
			isAlive: false
		},
		{
			id: 'amy',
			username: 'Amy',
			score: 30,
			avatar: 'pig-03',
			isHost: false,
			isAlive: true
		},
		{
			id: 'hermes',
			username: 'Hermes',
			score: 0,
			avatar: 'bone-02',
			isHost: false,
			isAlive: false
		},
		{
			id: 'zoidberg',
			username: 'Zoidberg',
			score: 0,
			avatar: 'spider-02',
			isHost: false,
			isAlive: false
		},
		{
			id: 'scruffy',
			username: 'Scruffy',
			score: 40,
			avatar: 'cat-03',
			isHost: false,
			isAlive: true
		},
	];

	const [ log, setLog ] = useState(dummyLog);
	const [ chat, setChat ] = useState(dummyChat);
	const [ word, setWord ] = useState('Pisang raja');
	const [ players, setPlayers ] = useState(myRoom.players);

	// socket event handlers
	socket.on('chat-broadcast', (data: Chat) => {
		if (data.senderId === myPlayer.id) return;
		setChat([...chat, data]);
	});
	socket.on('log-broadcast', (data: Log) => {
		setLog([...log, data]);
	});
	socket.on('start-game-reply', (data: Response) => {

	})
	socket.on('new-word', (data: string) => {
		Swal.fire({
			title: 'Your word is',
			text: data
		})
		setWord(data);
	});
	socket.on('new-player', (data: Player) => {
		if (data.id === myPlayer.id) return;
		setPlayers([...players, data]);
		// myRoom.players = [...myRoom.players, data];
	});
	socket.on('player-left', (playerId: string) => {
		setPlayers(players.filter(p => p.id !== playerId));
		// myRoom.players = myRoom.players.filter(p => p.id !== playerId);
	});
	
	const displayWord = () => {
		Swal.fire({
			title: 'Your word is',
			text: word
		});
	};
	// handle start game event
	const startGame = () => {
		Swal.fire({
			title: 'Start Game',
			preConfirm: () => {
				let status = startGameReq(socket, {
					reqId: uuid(),
					roomId: roomId,
					sender: myPlayer
				});
				if (status !== 'success') {
					Swal.fire({
						icon: 'error',
						text: status
					});
				}
			}
		});
	};
	// handle chat
	const submitChat = (e: any) => {
		e.preventDefault();
		const content: string = e.target.chat.value.trim();
		e.target.chat.value = "";
		if (content) {
			const temp: Chat = {
				senderId: myPlayer.id,
				sender: myPlayer.username,
				content: content,
				roomId: roomId,
				timestamp: Date.now()
			}
			setChat([...chat, temp]);
			sendChat(socket, temp);
		}
	}

	// auto scroll log
	useEffect(() => {
		const logBase = document.getElementById('log-base');
		if (logBase) {
			logBase.scrollIntoView();
		}
	}, [log]);
	
	// auto scroll chat
	useEffect(() => {
		const chatBase = document.getElementById('chat-base');
		if (chatBase) {
			chatBase.scrollIntoView();
		}
	}, [chat]);

	useEffect(() => {
		document.title = "Room | undercover.io"
		if (!myPlayer.username) {
			history.push({
				pathname: '/'
			})
			Swal.fire({
				icon: 'warning',
				text: 'Please create your character first',
				timer: 1000,
				onBeforeOpen: () => Swal.showLoading()

			})
		}
	});

	return (
		<div className="root bg-rich-black">
			<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet"/>
			<div id="room" className="main fr c-container">
				<div id="return-button" className="" >
					<Link to="/">
						<FiArrowLeft size="2em" className="nav txt-white"/>
					</Link>
				</div>
				<div id="room-game" className="fc c-container">
						<div id="game-table" className="fc c-container bg-raisin-black">
							<PlayerCard player={players}/>
						</div>
						<div id="game-console" className="fr c-container">
							<div id="game-log" className="fc bg-raisin-black">
								<LogCard log={log}/>
							</div>
							<div id="game-word" className="fr bg-raisin-black c-container txt-center rounded" onClick={displayWord}>
								<h4 className="c-item txt-white txt-fredoka">Click to check your word</h4>
							</div>
							<div id="game-vote" className="fr c-container bg-raisin-black rounded" onClick={startGame} >
								<h1 className="c-item txt-white txt-fredoka">Start</h1>
							</div>
						</div>
				</div>
				<div id="room-chat" className="fc bg-raisin-black">
					<div id="chat-box" className="bg-black-olive">
						<ChatCard chat={chat}/>
					</div>
					<form onSubmit={submitChat}>
						<input id="chat-bar" type="text" name="chat" className="bg-black-olive txt-white" placeholder="spit it out"/>
					</form>
				</div>
			</div>
			<Footer/>
		</div>
	);
}

export default Room;