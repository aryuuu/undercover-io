import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Swal from 'sweetalert2';
import { Modal } from '@material-ui/core';
import { AiOutlineCloseCircle } from 'react-icons/ai';
/** components */
import Footer from '../components/Footer';
/** images */

interface Props {

}

const Room = (props: Props) => {

	const chats: string[] = [];

	for (let i: number = 0; i < 0; i++) {
		chats.push(`<p className="chat-balloon mine">bender is great</p>`);
	}

	const displayWord = () => {
		Swal.fire({
			title: "Your word is",
			text: "Butt Licker"
		})
	}


	return (
		<div className="root">
			<div id="room" className="main fr c-content">
				<div id="room-game" className="fc c-content">
						<div id="game-table" className="fc c-content">
							<h1 className="c-item">Table</h1>
						</div>
						<div id="game-console" className="fr c-content">
							<div id="game-log" className="fc bg-white">
								<h1>Game Log</h1>
								<p className="warning-log">Game started</p>
								<p className="info-log">Bender is a bandit</p>
								<p className="info-log">Bender is a bandit</p>
								<p className="info-log">Bender is a bandit</p>
							</div>
							<div id="game-word" className="fr bg-white c-container" onClick={displayWord}>
								<h1>Butt Licker</h1>
							</div>
							<div id="game-vote" className="fr c-container bg-white">
								<h1>Vote box</h1>
							</div>
						</div>
				</div>
				<div id="room-chat" className="fc bg-white">
					<Link to="/">
						<AiOutlineCloseCircle className="nav" size="2em"/>
					</Link>
					<div id="chat-box" className="bg-blue" 
						// onMouseOver="this.style.overflow='scroll'"
						// onMouseOut="this.style.overflow='hidden'"
					>
						<h1>Wasup ding dongs</h1>
						{ chats }
					</div>
					<input id="chat-bar" className="" placeholder="spit it out"/>
				</div>
			</div>
			<Footer/>
		</div>
	);
}

export default Room;