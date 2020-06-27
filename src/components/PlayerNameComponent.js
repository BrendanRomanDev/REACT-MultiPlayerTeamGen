import React, { Component } from 'react';

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
