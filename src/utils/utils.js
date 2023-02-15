export const average = (player) => {
	return (
		(player.igl +
			player.gameNotion +
			player.aim +
			player.nadeKnowledge +
			player.adaptability) /
		5
	);
};

export const orderPlayers = (players) => {
	return players
		.map((player) => {
			return {
				name: player.name,
				average: average(player),
			};
		})
		.sort((a, b) => {
			if (a.average < b.average) {
				return 1;
			}
			if (a.average > b.average) {
				return -1;
			}
			return 0;
		});
};

export const sorted_teams = (players, setGeneratedTeams) => {
	let teams = [
		{ team: [], average: 0 },
		{ team: [], average: 0 },
	];
	let i = 0;
	for (let j = 0; j < players.length; j++) {
		if (teams[i].team.length > teams[i + 1].team.length) {
			teams[i + 1].team.push(players[j].name);
			teams[i + 1].average += players[j].average;
		} else {
			teams[i].team.push(players[j].name);
			teams[i].average += players[j].average;
		}
	}
	setGeneratedTeams(true);
	return teams;
};
