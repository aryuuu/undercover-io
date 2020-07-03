import React from 'react';
import { useHistory } from 'react-router';
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
// import incognitoLogo from '../assets/incognito.svg';

/**resources */
import { apiUrl } from '../config'

interface Prop {

}

const Home = (props: Prop) => {
	const history = useHistory();
	const [ username, setUsername ] = useState('');
	const [ avatar, setAvatar ] = useState(0);
	// const [ playerCount, setPlayerCount ] = useState(4);
	// const [ UndercoverCount, setUndercoverCount ] = useState(1);
	// const [ mrWhiteCount, setMrWhiteCount ] = useState(0);
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
	
	const createRoom = () => {
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
						Your answers:
						<pre><code>${answers}</code></pre>
					`,
					confirmButtonText: 'Create',
					showLoaderOnConfirm: true,
					preConfirm: () => {
						history.push({
							pathname: `/room/1234`
						});
					}
				})
			}
		})
		
	};
	const joinRoom = () => {
		Swal.fire({
			title: 'Join Room',
			input: 'text',
			confirmButtonText: 'Join',
			preConfirm: (value) => {
				history.push({
					pathname: `/room/${value}`
				})
			}
			
		});
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
								<FaChevronLeft size="4em" className="c-item txt-white" onClick={prevAvatar} />
								<img className="icon avatar c-item bg-white" src={`/img/${dummyAvatars[avatar]}.svg`} alt="avatar"/>
								<FaChevronRight size="4em" className="c-item txt-white" onClick={nextAvatar}/>
							</div>
							<div className="form-element c-container">
								<form action="">
									<input type="text" placeholder="XxXPussySlayer_69XxX" className="bg-black-olive rounded"/>
								</form>
							</div>
							<div className="fr c-container">
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