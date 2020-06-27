import React from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { useState, useEffect } from 'react';

import Swal from 'sweetalert2';
import { Modal } from '@material-ui/core';
import { FiArrowLeft } from 'react-icons/fi';

/** types */
import { Log, Chat, Player } from '../types';
/** resources */
/** components */
import Footer from '../components/Footer';
import LogCard from '../components/LogCard';
import ChatCard from '../components/ChatCard';
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
			username: 'Fry',
			score: 0,
			avatar: 'fry-pic',
			isHost: false,
			isAlive: true
		},
		{
			username: 'Leela',
			score: 10,
			avatar: 'Leela-pic',
			isHost: false,
			isAlive: true
		},
		{
			username: 'Bender',
			score: 10000,
			avatar: 'bender-pic',
			isHost: true,
			isAlive: true
		},
		{
			username: 'Hubert',
			score: 20,
			avatar: 'hubert-pic',
			isHost: false,
			isAlive: false
		},
		{
			username: 'Amy',
			score: 30,
			avatar: 'amy-pic',
			isHost: false,
			isAlive: true
		},
		{
			username: 'Hermes',
			score: 0,
			avatar: 'hermes-pic',
			isHost: false,
			isAlive: false
		},
		{
			username: 'Zoidberg',
			score: 0,
			avatar: 'zoidberg-pic',
			isHost: false,
			isAlive: false
		},
		{
			username: 'Scruffy',
			score: 40,
			avatar: 'fry-pic',
			isHost: false,
			isAlive: true
		},
	];


	const [ word, setWord ] = useState('Pisang raja');
	const [ log, setLog ] = useState(dummyLog);
	const [ chat, setChat ] = useState(dummyChat);
	const [ player, setPlayer ] = useState(dummyPlayer);



	const displayWord = () => {
		Swal.fire({
			title: "Your word is",
			text: word
		})
	}

	return (
		<div className="root">
			<div id="room" className="main fr c-container">
				<div id="return-button" className="" >
					<Link to="/">
						<FiArrowLeft size="2em" className="nav"/>
					</Link>
				</div>
				<div id="room-game" className="fc c-container">
						<div id="game-table" className="fc c-container">
							<h1 className="c-item">Table</h1>
						</div>
						<div id="game-console" className="fr c-container">
							<div id="game-log" className="fc bg-white">
								<LogCard log={log}/>
							</div>
							<div id="game-word" className="fr bg-white c-container rounded" onClick={displayWord}>
								<h4 className="c-item">Click to check your word</h4>
							</div>
							<div id="game-vote" className="fr c-container bg-white rounded">
								<h1 className="c-item">Vote box</h1>
							</div>
						</div>
				</div>
				<div id="room-chat" className="fc bg-white">
					<div id="chat-box" className="bg-blue">
						<ChatCard chat={chat}/>
					</div>
					<input id="chat-bar" className="" placeholder="spit it out"/>
				</div>
			</div>
			<Footer/>
		</div>
	);
}

export default Room;