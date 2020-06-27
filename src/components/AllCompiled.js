import React, { Component } from 'react';
import {
	Container,
	Row,
	Col,
	Card,
	CardHeader,
	CardTitle,
	CardDeck,
	CardBody,
	Input,
	InputGroup,
	InputGroupAddon,
	Label,
	Button
} from 'reactstrap';
import { animateScroll as scroll, scroller } from 'react-scroll';

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

class Core extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playerName     : '',
			playersPerTeam : ''
		};
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleAddNameClick = () => {
		if (this.state.playerName) {
			this.props.addPlayerName(this.state.playerName);
			this.setState({ playerName: '' });
			console.log('playaaaanameeee: ', this.state.playerName);
		} else {
			alert('Please enter a player name.');
		}
	};

	keyPressed = (event) => {
		if (event.key === 'Enter') {
			this.handleAddNameClick();
			event.target.value = '';
		}
	};

	sendPlayersPerTeam = () => {
		this.props.handleGenerate(+this.state.playersPerTeam);
	};

	render() {
		return (
			<React.Fragment>
				<CardDeck>
					<InstructionsCard />
					<CalcCard
						addName={this.props.addPlayerName}
						handleChange={this.handleChange}
						handleAddNameClick={this.handleAddNameClick}
						staticPlayerNames={this.props.staticPlayerNames}
						dynamicPlayerNames={this.props.dynamicPlayerNames}
						playersPerTeam={+this.state.playersPerTeam}
						keyPressed={this.keyPressed}
						playerName={this.state.playerName}
						delPlayerName={this.props.delPlayerName}
					/>
				</CardDeck>
				<GenerateResetResults
					handleGenerate={this.sendPlayersPerTeam}
					createTeamList={this.props.createTeamList}
					isShuffleListShown={this.props.isShuffleListShown}
					playersPerTeam={+this.state.playersPerTeam}
					handleReset={this.props.handleReset}
					dynamicPlayerNames={this.props.dynamicPlayerNames}
				/>
			</React.Fragment>
		);
	}
}

export function InstructionsCard(props) {
	return (
		<Card mb={4}>
			<CardHeader>
				<CardTitle mb={0}>
					<h3 className="mb-0">How it works</h3>
				</CardTitle>
			</CardHeader>
			<CardBody>
				<div className="info-div">
					<hr className="card-hr" />
					<h5>Divide your party into teams</h5>
					<hr className="card-hr" />
				</div>
				<ol>
					<li>Enter the number of players allowed per group/team.</li>
					<li>Input player names one at a time.</li>
					<li>Click generate! It's that easy.</li>
				</ol>
			</CardBody>
		</Card>
	);
}

export function CalcCard(props) {
	return (
		<Card mb={4}>
			<CardHeader>
				<CardTitle>
					<h3 className="mb-0">Generator</h3>
				</CardTitle>
			</CardHeader>
			<CardBody className="px-4">
				<hr className="card-hr mb-4" />
				<Row className="players-per-team-div">
					<Col sm={'12'} lg={'6'} className="players-per-team-label">
						<Label htmlFor="numPerTeamDropDown">
							<h5>Players Per Team</h5>
						</Label>
					</Col>
					<Col sm="12" lg="6" className="players-per-team-select mx-auto">
						<Input
							onChange={props.handleChange}
							type="select"
							name="playersPerTeam"
							id="numPerTeamDropDown"
						>
							<option select="selected">Select</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
						</Input>
					</Col>
				</Row>
				<Row>
					<Col>
						<InputGroup>
							<Input
								autocomplete="off"
								type="text"
								name="playerName"
								id="nameInput"
								placeholder="Add a Player"
								onChange={props.handleChange}
								onKeyPress={props.keyPressed}
								value={props.playerName}
							/>
							<InputGroupAddon addonType="append">
								<Button
									color="info"
									type="button"
									name="addPlayer"
									id="addPlayerBtn"
									onClick={props.handleAddNameClick}
								>
									<i class="fas fa-plus" />
								</Button>
							</InputGroupAddon>
						</InputGroup>
					</Col>
				</Row>
				<Row className="text-center">
					<Col>
						<div class="info-div">
							<hr className="card-hr mt-4" />
							<h5 class="">Players</h5>
							<hr className="card-hr" />
						</div>
						<div class="user-input-div" id="user-input-div">
							{props.staticPlayerNames.length ? (
								props.staticPlayerNames.map((playerName) => {
									return <PlayerName playerName={playerName} delPlayerName={props.delPlayerName} />;
								})
							) : (
								<h6 class="text-muted">Player names will appear here...</h6>
							)}
						</div>
					</Col>
				</Row>
			</CardBody>
		</Card>
	);
}

export function PlayerName(props) {
	return (
		<React.Fragment>
			<div className="user-input-div" id="user-input-div">
				<div className="player-item">
					<h5 className="player-name-h5">{props.playerName}</h5>
					<button className="player-btn" onClick={() => props.delPlayerName(props.playerName)}>
						-
					</button>
				</div>
			</div>
		</React.Fragment>
	);
}

export function GenerateResetResults(props) {
	return (
		<React.Fragment>
			<CalcButtons
				handleGenerate={props.handleGenerate}
				dynamicPlayerNames={props.dynamicPlayerNames}
				playersPerTeam={props.playersPerTeam}
				handleReset={props.handleReset}
			/>
			<ResultsCard
				id="resultsCard"
				name="resultsCard"
				createTeamList={props.createTeamList}
				isShuffleListShown={props.isShuffleListShown}
				dynamicPlayerNames={props.dynamicPlayerNames}
			/>
		</React.Fragment>
	);
}

export function CalcButtons(props) {
	return (
		<div className="hr-button-div">
			<hr />
			<div class="program-button-div">
				<Button
					color="info"
					className="btn btn-lg generate-button mr-2"
					type="button"
					name="submitBtn"
					id="submitBtn"
					onClick={props.handleGenerate}
				>
					Generate Teams
				</Button>
				<Button
					color="danger"
					className="btn btn-lg reset-button"
					type="button"
					name="resetBtn"
					id="resetBtn"
					onClick={props.handleReset}
				>
					Reset
				</Button>
			</div>
		</div>
	);
}

export function ResultsCard(props) {
	return (
		<Row>
			<Col md={{ size: 6, offset: 3 }}>
				<Card className="result-card">
					<CardHeader>
						<CardTitle>
							<h3 className="mb-0">Generated Teams</h3>
						</CardTitle>
					</CardHeader>
					<CardBody className="result-div">
						{props.isShuffleListShown && props.dynamicPlayerNames.length ? (
							props.createTeamList()
						) : (
							<h6 class="text-muted">Player names will appear here...</h6>
						)}
					</CardBody>
				</Card>
			</Col>
		</Row>
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
