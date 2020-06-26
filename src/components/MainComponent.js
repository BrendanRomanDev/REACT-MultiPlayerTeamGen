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

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playersPerTeam     : '',
			dynamicPlayerNames : [],
			staticPlayerNames  : []
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
		console.log('MainstatePPT : ', this.state.playersPerTeam);
	};

	shuffleNames = () => {
		const shuffle = (nameArray) => {
			for (let i = nameArray.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				let temp = nameArray[j];
				nameArray[j] = nameArray[i];
				nameArray[i] = temp;
			}
			return nameArray;
		};
		this.setState({ dynamicPlayerNames: shuffle(this.state.dynamicPlayerNames) });
	};

	createTeamList = () => {
		const { playersPerTeam, dynamicPlayerNames } = this.state;
		//players per team is getting updated on change every time... ONLY WHEN YOU HIT generate IT SHOULD BE UPDATED
		const remainingPlayers = dynamicPlayerNames.length % playersPerTeam;
		const numTeams = Math.floor(dynamicPlayerNames.length / playersPerTeam);
		//outer loop to create parent
		let j = 0;
		for (let i = 0; i < numTeams; i++) {
			const teamArray = dynamicPlayerNames.slice(j, j + playersPerTeam);
			j += numTeams;
			console.log('j, your inverval', j);
			return (
				<React.Fragment>
					<h5 class="team-title">Team {i + 1}</h5>
					<ul>
						{teamArray.map((name) => {
							return <li class="player-result-list">{name}</li>;
						})}
					</ul>
				</React.Fragment>
			);
		}
	};

	// reset

	// generate

	render() {
		return (
			<React.Fragment>
				<Container>
					<Jumbo />
					<CardDeck>
						<InstructionsCard />
						<CalculatorCard
							addName={this.addPlayerName}
							addNumPlayersPerTeam={this.addNumPlayersPerTeam}
							dynamicPlayerNames={this.state.dynamicPlayerNames}
							staticPlayerNames={this.state.staticPlayerNames}
						/>
					</CardDeck>
					<GenerateAndReset shuffleNames={this.shuffleNames} createTeamList={this.createTeamList} />
					<ResultsCard
						playersPerTeam={this.state.playersPerTeam}
						dynamicPlayerNames={this.state.dynamicPlayerNames}
						createTeamList={this.createTeamList}
					/>
				</Container>
				<Footer />
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
class CalculatorCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playerName : ''
		};
	}

	handleNameChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handlePPTChange = (event) => {
		this.props.addNumPlayersPerTeam(event.target.value);
	};

	handleAddNameClick = () => {
		this.props.addName(this.state.playerName);
		this.setState({ playerName: '' });
	};

	render() {
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
								onChange={this.handlePPTChange}
								type="select"
								name="playersPerTeam"
								id="numPerTeamDropDown"
							>
								<option>Select</option>
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
									onChange={this.handleNameChange}
									value={this.state.playerName}
								/>
								<InputGroupAddon addonType="append">
									<Button
										color="info"
										type="button"
										name="addPlayer"
										id="addPlayerBtn"
										onClick={this.handleAddNameClick}
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
								<h6 class="text-muted">Player names will appear here...</h6>
								{this.props.staticPlayerNames.map((playerName) => {
									return <PlayerName playerName={playerName} />;
								})}
							</div>
						</Col>
					</Row>
				</CardBody>
			</Card>
		);
	}
}

export function PlayerName(props) {
	return (
		<React.Fragment>
			<div class="user-input-div" id="user-input-div">
				<div>
					<div class="player-item">
						<h5 class="player-name-h5">{props.playerName}</h5>
						<button class="player-btn">-</button>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

//when you click this button, the ppt from calc state gets added to main state
export function GenerateAndReset(props) {
	const handleGenerate = () => {
		props.shuffleNames();
		// props.createTeamList();
	};

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
					onClick={handleGenerate}
				>
					Generate Teams
				</Button>
				<Button color="danger" className="btn btn-lg reset-button" type="button" name="resetBtn" id="resetBtn">
					Reset
				</Button>
			</div>
		</div>
	);
}

function ResultsCard(props) {
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
						<h6 class="text-muted">Player names will appear here...</h6>
						{props.createTeamList()}
					</CardBody>
				</Card>
			</Col>
		</Row>
	);
}

export function TeamTitle(props) {
	return <h5 class="team-title">Team{props.teamNumber}</h5>;
}

export function TeamGroup(props) {
	return (
		<ul>
			<li class="player-result-list">TESTNAME</li>
		</ul>
	);
}

export function Footer(props) {
	return (
		<div class="footer">
			<p class="credit-text">&copy; 2020 Brendan Roman</p>
		</div>
	);
}

export default Main;
