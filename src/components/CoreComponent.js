import React, { Component } from 'react';
import { CardDeck } from 'reactstrap';
import { InstructionsCard, CalcCard } from './InstructionsCalcCardComponent';
import { GenerateResetResults } from './GenerateResetResultsComponent';

export class Core extends Component {
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

export default Core;
