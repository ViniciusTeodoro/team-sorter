import { InputField } from "./index";

export const Input = ({ fieldName, type, name, persoClass }) => {
	return (
		<div className="flex flex-col gap-2">
			<label>{fieldName}</label>
			<InputField type={type} name={name} persoClass={persoClass} />
		</div>
	);
};
