import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { CountryByName } from "../../Redux/actions/index";

export const SearchBar = () => {
	const dispatch = useDispatch();
	const [name, setName] = useState("");

	const handleImputChange = (e) => {
		setName(e.target.value);
	};
	const handleSubmit = () => {
		dispatch(CountryByName(name));
		setName("");
	};

	return (
		<div>
			<input
				type="text"
				value={name}
				placeholder="Search Country"
				onChange={(e) => handleImputChange(e)}
			/>
			<button type="submit" onClick={(e) => handleSubmit(e)}>
				Search
			</button>
		</div>
	);
};
