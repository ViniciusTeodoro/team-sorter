import { useState } from "react";

export const InputField = ({ persoClass = null, type, name }) => {
	const [inputValue, setInputValue] = useState(0);

	return (
		<input
			name={name}
			type={type}
			className={"px-4 border-2 rounded-xl rounded-2xl " + persoClass}
			onBlur={(event) => {
				console.log(event.target.value);
				if (!event.target.value > 10 || !event.target.value < 0) {
					setInputValue(event.target.value);
				} else {
					setInputValue(0);
				}
			}}
			defaultValue={type !== "text" ? inputValue : ""}
			min="0"
			max="10"
			step="0.1"
		></input>
	);
};
