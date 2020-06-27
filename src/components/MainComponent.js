import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { animateScroll as scroll, scroller } from 'react-scroll';
import { Core } from './CoreComponent';

///TO DO
//react-scroll working
//Refactor code into other files

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playersPerTeam     : '',
			dynamicPlayerNames : [],
			staticPlayerNames  : [],
			isShuffleListShown : false
		};
	}

	addPlayerName = (playerName) => {
		this.setState({
			dynamicPlayerNames : [ ...this.state.dynamicPlayerNames, playerName ],
			staticPlayerNames  : [ ...this.state.staticPlayerNames, playerName ]
		});
	};

	addNumPlayersPerTeam = (playersPerTeam) => {
		this.setState({ playersPerTeam: playersPerTeam });
	};

	delPlayerName = (playerName) => {
		const newStaticArray = [ ...this.state.staticPlayerNames ];
		const newDynamicArray = [ ...this.state.dynamicPlayerNames ];
		let indexStatic = this.state.staticPlayerNames.indexOf(playerName);
		let indexDynamic = this.state.dynamicPlayerNames.indexOf(playerName);
		newStaticArray.splice(indexStatic, 1);
		newDynamicArray.splice(indexDynamic, 1);
		if (indexStatic > -1) {
			this.setState({
				staticPlayerNames : newStaticArray
			});
		}
		if (indexDynamic > -1) {
			this.setState({
				dynamicPlayerNames : newDynamicArray
			});
		}

		// 	const filterOutName = (nameArray) => {
		// 		nameArray.filter((name) => {
		// 			name === playerName;
		// 		});
		// 	};
		// 	this.setState({
		// 		...this.state,
		// 		dynamicPlayerNames : filterOutName(this.state.dynamicPlayerNames),
		// 		staticPlayerNames  : filterOutName(this.state.staticPlayerNames)
		// 	});
		// };
	};

	shuffleNames = () => {
		const newArrayToShuffle = [ ...this.state.staticPlayerNames ];
		const shuffle = (nameArray) => {
			for (let i = nameArray.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				let temp = nameArray[j];
				nameArray[j] = nameArray[i];
				nameArray[i] = temp;
			}
			return nameArray;
		};
		this.setState({ dynamicPlayerNames: shuffle(newArrayToShuffle) });
	};

	scrollToBot = () => {
		scroller.scrollTo('footer', {
			duration : 4000,
			delay    : 0,
			smooth   : 'easeOutCubic'
		});
	};

	scrollToTop = () => {
		scroll.scrollToTop({
			duration : 2000,
			delay    : 0,
			smooth   : 'easeOutCubic'
		});
	};

	handleGenerate = (playersPerTeam) => {
		if (playersPerTeam) {
			this.scrollToBot();
			this.shuffleNames();
			this.setState({
				playersPerTeam     : playersPerTeam,
				isShuffleListShown : true
			});
		} else {
			alert('Please select the number of players per team.');
		}
	};

	handleReset = () => {
		this.scrollToTop();
		this.setState({
			playersPerTeam     : '',
			dynamicPlayerNames : [],
			staticPlayerNames  : [],
			isShuffleListShown : false
		});
	};

	createTeamList = () => {
		const { playersPerTeam, dynamicPlayerNames } = this.state;

		const remainingPlayers = dynamicPlayerNames.length % playersPerTeam;
		const numTeams = Math.floor(dynamicPlayerNames.length / playersPerTeam);
		//outer loop to create parent
		let j = 0;
		const allPlayers = [];
		for (let i = 0; i < numTeams; i++) {
			const teamArray = dynamicPlayerNames.slice(j, j + playersPerTeam);
			console.log('numteams:', numTeams);
			console.log('j, your inverval', j);
			allPlayers.push(
				<React.Fragment>
					<h5 class="team-title">Team {i + 1}</h5>
					<ul>
						{teamArray.map((name) => {
							console.log(name);
							return <li class="player-result-list">{name}</li>;
						})}
					</ul>
				</React.Fragment>
			);
			j += playersPerTeam;
		}
		const remainingPlayerArr = dynamicPlayerNames.slice(remainingPlayers * -1);
		if (remainingPlayers === 0) {
			return allPlayers;
		} else if (remainingPlayers === 1) {
			allPlayers.push(
				<React.Fragment>
					<h5 class="team-title">Round Robin Player</h5>
					<ul>
						<li class="player-result-list">{remainingPlayerArr[0]}</li>
					</ul>
				</React.Fragment>
			);
			return allPlayers;
		} else {
			allPlayers.push(
				<React.Fragment>
					<h5 class="team-title">Round Robin Players</h5>
					<ul>
						{remainingPlayerArr.map((name) => {
							console.log(name);
							return <li class="player-result-list">{name}</li>;
						})}
					</ul>
				</React.Fragment>
			);
			return allPlayers;
		}
	};

	render() {
		return (
			<React.Fragment>
				<Container>
					<Jumbo />
					<Core
						addPlayerName={this.addPlayerName}
						addNumPlayersPerTeam={this.addNumPlayersPerTeam}
						createTeamList={this.createTeamList}
						playersPerTeam={this.state.playersPerTeam}
						dynamicPlayerNames={this.state.dynamicPlayerNames}
						staticPlayerNames={this.state.staticPlayerNames}
						handleGenerate={this.handleGenerate}
						isShuffleListShown={this.state.isShuffleListShown}
						delPlayerName={this.delPlayerName}
						handleReset={this.handleReset}
					/>
				</Container>
				<Footer name="footer" />
			</React.Fragment>
		);
	}
}

export function Jumbo(props) {
	console.log(props);
	return (
		<div className="my-jumbo">
			<h1 className="page-title">Multiplayer Team Generator</h1>
			<div className="subtitle-div">
				<div className="title-decoration" />
				<h4 className="subtitle">Shake things up.</h4>
				<div className="title-decoration" />
			</div>
		</div>
	);
}

export function Footer(props) {
	return (
		<div className="footer">
			<p className="credit-text">&copy; 2020 Brendan Roman</p>
		</div>
	);
}

export default Main;
