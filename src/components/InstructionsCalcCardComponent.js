import React, { Component } from 'react';
import {
	Row,
	Col,
	Card,
	CardHeader,
	CardTitle,
	CardBody,
	Input,
	InputGroup,
	InputGroupAddon,
	Label,
	Button
} from 'reactstrap';
import { PlayerName } from './PlayerNameComponent';

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
