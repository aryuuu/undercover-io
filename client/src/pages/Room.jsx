import React from 'react';

/** components */
import Footer from '../components/Footer';
/** styles */
/** images */
import wood from '../assets/wood.jpg';

const Room = (props) => {
	return (
		<div className="root">
			<div className="main room fr c-content">
				<div className="room-game fc c-content">
						<div className="game-table fc c-content">
							<h1 className="c-item">Table</h1>
						</div>
						<div className="game-console fr c-content">
							<div className="game-log fc bg-grey">
								<h1>Game Log</h1>
								<p className="warning-log">Game started</p>
								<p className="info-log">Bender is a bandit</p>
								<p className="info-log">Bender is a bandit</p>
								<p className="info-log">Bender is a bandit</p>
							</div>
							<div className="game-vote bg-white">
								<h1>Vote box</h1>
							</div>
						</div>
				</div>
				<div className="room-chat fc bg-white">
					<div className="chat-box bg-blue" 
						onMouseOver="this.style.overflow='scroll'"
						onMouseOut="this.style.overflow='hidden'">
						<h1>Wasup ding dongs</h1>
						<p className="chat-balloon mine">bender is great</p>
						<p className="chat-balloon mine">bender is great</p>
						<p className="chat-balloon mine">bender is great</p>
						<p className="chat-balloon mine">bender is great</p>
						<p className="chat-balloon mine">bender is great</p>
						<p className="chat-balloon mine">bender is great</p>
						<p className="chat-balloon mine">bender is great</p>
						<p className="chat-balloon mine">bender is great</p>
						<p className="chat-balloon mine">bender is great</p>
						<p className="chat-balloon mine">bender is great</p>
						<p className="chat-balloon mine">bender is great</p>
						<p className="chat-balloon mine">bender is great</p>
						<p className="chat-balloon mine">bender is great</p>
						<p className="chat-balloon mine">bender is great</p>
						<p className="chat-balloon mine">bender is great</p>
						<p className="chat-balloon mine">bender is great</p>
						<p className="chat-balloon mine">bender is great</p>
						<p className="chat-balloon mine">bender is great</p>
						<p className="chat-balloon mine">bender is great</p>
						<p className="chat-balloon mine">bender is great</p>
						<p className="chat-balloon mine">bender is great</p>
						<p className="chat-balloon mine">bender is great</p>
						<p className="chat-balloon mine">bender is great</p>
						<p className="chat-balloon mine">bender is great</p>
						<p className="chat-balloon mine">bender is great</p>
					</div>
					<input className="chat-bar" placeholder="spit it out"/>
				</div>
			</div>
			<Footer/>
		</div>
	);
}

export default Room;