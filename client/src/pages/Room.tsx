import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';

import Swal from 'sweetalert2';
import swal from '@sweetalert/with-react';
import { FiArrowLeft } from 'react-icons/fi';

/** types */
import { 
	Log, 
	Chat, 
	Player, 
	Room as RoomIf,
} from '../types';
/** resources */
import { apiUrl, wsUrl } from '../config';
/** handlers */
/** components */
import Footer from '../components/Footer';
import LogCard from '../components/LogCard';
import VoteCard from '../components/VoteCard';
import ChatCard from '../components/ChatCard';
import PlayerCard from '../components/PlayerCard';
/** images */

interface MatchParams {
	roomId: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

const Room = (props: Props) => {
	const { match } = props;
	
	const dummyLog: Log[] = [
		{
			type: 'info',
			content: `you just entered room ${ match.params.roomId }`,
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
			sender: 'Fry',
			content: 'Leela, i lov u',
			timestamp: Date.now()
		},
		{
			sender: 'Leela',
			content: 'stop it fry',
			timestamp: Date.now()
		},
		{
			sender: 'Leela',
			content: 'maybe im too harsh on you fry',
			timestamp: Date.now()
		},
		{
			sender: 'Amy',
			content: 'can i have my ribs now?',
			timestamp: Date.now()
		},
		{
			sender: 'Hubert',
			content: 'Good news everyone',
			timestamp: Date.now()
		},
		{
			sender: 'Bender',
			content: 'hey fry, you suck',
			timestamp: Date.now()
		},
		{
			sender: 'Zoidberg',
			content: 'Why not Zoidberg',
			timestamp: Date.now()
		},
		{
			sender: 'Hermes',
			content: 'Sweet llamas of bahamas',
			timestamp: Date.now()
		},
		{
			sender: 'Hermes',
			content: 'stop it you stupid crab',
			timestamp: Date.now()
		},
		{
			sender: 'Scruffy',
			content: 'im scruffy the janitor',
			timestamp: Date.now()
		},
		{
			sender: 'Bender',
			content: 'bite my shiny metal ass',
			timestamp: Date.now()
		},
	];
	const dummyPlayer: Player[] = [
		{
			id: 'fry',
			username: 'Fry',
			score: 0,
			avatar: 'fry-pic',
			isHost: false,
			isAlive: true
		},
		{
			id: 'leela',
			username: 'Leela',
			score: 10,
			avatar: 'Leela-pic',
			isHost: false,
			isAlive: true
		},
		{
			id: 'bender',
			username: 'Bender',
			score: 10000,
			avatar: 'bender-pic',
			isHost: true,
			isAlive: true
		},
		{
			id: 'hubert',
			username: 'Hubert',
			score: 20,
			avatar: 'hubert-pic',
			isHost: false,
			isAlive: false
		},
		{
			id: 'amy',
			username: 'Amy',
			score: 30,
			avatar: 'amy-pic',
			isHost: false,
			isAlive: true
		},
		{
			id: 'hermes',
			username: 'Hermes',
			score: 0,
			avatar: 'hermes-pic',
			isHost: false,
			isAlive: false
		},
		{
			id: 'zoidberg',
			username: 'Zoidberg',
			score: 0,
			avatar: 'zoidberg-pic',
			isHost: false,
			isAlive: false
		},
		{
			id: 'scruffy',
			username: 'Scruffy',
			score: 40,
			avatar: 'fry-pic',
			isHost: false,
			isAlive: true
		},
	];
	const me: Player = {
		id: 'bender',
		username: 'Bender',
		isHost: true,
		isAlive: true,
		score: 10,
		avatar: 'bender-pic'
	}

	const [ word, setWord ] = useState('Pisang raja');
	const [ log, setLog ] = useState(dummyLog);
	const [ chat, setChat ] = useState(dummyChat);
	const [ player, setPlayer ] = useState(dummyPlayer);

	
	const displayWord = () => {
		Swal.fire({
			title: 'Your word is',
			text: word
		});
	};
	const displayVote = () => {
		swal({
			title: `Who's this unlucky bastard`,
			text: 'vote that motherfucker',
			content: (<VoteCard player={player}/>),
			buttons: {
				confirm: 'Ye',
				cancel : 'Cancel'
			}
		});
	};
	const sendChat = (e: any) => {
		e.preventDefault();
		const content: string = e.target.chat.value.trim();
		e.target.chat.value = "";
		if (content) {
			const temp: Chat = {
				sender: me.username,
				content: content,
				timestamp: Date.now()
			}
			setChat([...chat, temp]);
		}
		
	}
	
	useEffect(() => {
		// console.log("time to scroll");
		// let chatContainer = document.getElementById("chat-container");
		// if (chatContainer) {
		// 	console.log(`scroll top: ${chatContainer.scrollTop}`);
		// 	console.log(`scroll height: ${chatContainer.scrollHeight}`)
		// 	chatContainer.scrollTop = chatContainer.scrollHeight;
		// }
		const chatBase = document.getElementById('chat-base');
		if (chatBase) {
			console.log(`yeah, time to scroll to this bitch`);
			chatBase.scrollIntoView(true);
		}
	}, [chat]);

	useEffect(() => {
		document.title = "Room | undercover.io"
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
							<PlayerCard player={player}/>
						</div>
						<div id="game-console" className="fr c-container">
							<div id="game-log" className="fc bg-raisin-black">
								<LogCard log={log}/>
							</div>
							<div id="game-word" className="fr bg-raisin-black c-container txt-center rounded" onClick={displayWord}>
								<h4 className="c-item txt-white txt-fredoka">Click to check your word</h4>
							</div>
							<div id="game-vote" className="fr c-container bg-raisin-black rounded" onClick={displayVote} >
								<h1 className="c-item txt-white txt-fredoka">Start</h1>
							</div>
						</div>
				</div>
				<div id="room-chat" className="fc bg-raisin-black">
					<div id="chat-box" className="bg-black-olive">
						<ChatCard chat={chat}/>
					</div>
					<form onSubmit={sendChat}>
						<input id="chat-bar" type="text" name="chat" className="bg-black-olive txt-white" placeholder="spit it out"/>
					</form>
				</div>
			</div>
			<Footer/>
		</div>
	);
}

export default Room;