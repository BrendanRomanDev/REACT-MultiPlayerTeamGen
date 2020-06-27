import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Button } from 'reactstrap';

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

export default GenerateResetResults;
