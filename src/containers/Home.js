import { useState } from "react";
import { average, orderPlayers, sorted_teams } from "../utils/utils";

export const Home = () => {
	const [generatedTeams, setGeneratedTeams] = useState(false);
	const [newPlayers, setNewPlayers] = useState([]);
	const [teams, setTeams] = useState([]);
	const [error, setError] = useState({ message: "" });

	const teamsFormed = () => {
		if (newPlayers.length <= 0)
			return setError({ message: "Lista de jogadores vazios" });
		return setTeams(
			sorted_teams(orderPlayers(newPlayers), setGeneratedTeams)
		);
	};

	const [defaultPlayer, setDefaultPlayer] = useState({
		name: "",
		igl: 0,
		gameNotion: 0,
		aim: 0,
		nadeKnowledge: 0,
		adaptability: 0,
	});

	const fields = [
		{
			name: "name",
			labelName: "Nome",
			type: "text",
			value: "",
			addClass: "",
		},
		{
			name: "igl",
			labelName: "IGL(In game leader)",
			type: "number",
			value: 0,
			addClass: "text-center	",
		},

		{
			name: "gameNotion",
			labelName: "Noção de Jogo",
			type: "number",
			value: 0,
			addClass: "text-center",
		},

		{
			name: "aim",
			labelName: "Mira",
			type: "number",
			value: 0,
			addClass: "text-center",
		},

		{
			name: "nadeKnowledge",
			labelName: "Conhecimento de granadas",
			type: "number",
			value: 0,
			addClass: "text-center",
		},

		{
			name: "adaptability",
			labelName: "Adaptabilidade",
			type: "number",
			value: 0,
			addClass: "text-center",
		},
	];
	const handleChange = (name, value) => {
		const newValue = { ...defaultPlayer, [name]: value };
		setDefaultPlayer(newValue);
	};
	const addPlayer = () => {
		if (defaultPlayer.name === "")
			return setError({ message: "Faltando um nome" });
		setNewPlayers([...newPlayers, defaultPlayer]);
	};
	return (
		<div className="flex flex-row">
			<div>
				<div className="flex flex-row p-4">
					<div className="flex flex-col gap-4">
						{fields.map(
							({ name, labelName, type, addClass, value }) => {
								return (
									<div
										key={name}
										className="flex flex-col gap-2"
									>
										<label>{labelName}</label>
										<input
											name={name}
											type={type}
											className={
												"px-4 border-2 rounded-xl rounded-2xl " +
												addClass
											}
											defaultValue={value}
											onChange={({ target }) => {
												const newValue =
													type === "number"
														? Number.parseInt(
																target.value
														  )
														: target.value;
												handleChange(name, newValue);
											}}
										></input>
									</div>
								);
							}
						)}
						<button
							className={
								"px-1 py-1 bg-gray-light border-gray border-2 rounded-2xl"
							}
							onClick={() => {
								addPlayer();
							}}
						>
							+
						</button>
					</div>
				</div>
			</div>
			<table>
				<thead>
					<tr>
						<th>Nome</th>
						<th>Média</th>
					</tr>
				</thead>
				<tbody>
					{newPlayers.length > 0 ? (
						newPlayers.map((player) => {
							const averagePlayer = average(player);
							return (
								<tr key={player.name + averagePlayer}>
									<td>{player.name}</td>
									<td>{averagePlayer}</td>
								</tr>
							);
						})
					) : (
						<tr>
							<td colspan="2">Nenhum jogador cadastrado</td>
						</tr>
					)}
				</tbody>
			</table>
			{error.message}
			{generatedTeams ? (
				teams.map(({ team }, index) => {
					return (
						<table key={"time" + index}>
							<thead>
								Time {index + 1}
								<tr>
									<th>Nome</th>
								</tr>
							</thead>
							<tbody>
								{team.map((player) => {
									return (
										<tr key={player}>
											<td>{player}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					);
				})
			) : (
				<div className={"self-center"}>
					<button
						onClick={teamsFormed}
						className={
							"px-1 py-1 bg-gray-light border-gray border-2 rounded-2xl"
						}
					>
						Gerar times
					</button>
				</div>
			)}
		</div>
	);
};
