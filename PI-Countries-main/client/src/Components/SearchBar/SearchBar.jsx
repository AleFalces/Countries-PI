import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { CountryByName } from "../../Redux/actions/index";
import "../SearchBar/SearchBar.css";

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
				className="SearchBar"
				type="text"
				value={name}
				placeholder="Search Country"
				onChange={(e) => handleImputChange(e)}
			/>
			<button
				className="ButtonSearch"
				type="submit"
				onClick={(e) => handleSubmit(e)}>
				Search
			</button>
		</div>
	);
};
