import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCountries } from "../../Redux/actions";
import axios from "axios";

function validations(input) {
	let errors = {};

	if (!input.name) {
		errors.name = "Name must be provided";
	}

	if (isNaN(input.difficulty)) {
		errors.difficulty = "Only numbers are allowed";
	}
	if (isNaN(input.duration)) {
		errors.duration = "Only numbers are allowed";
	}
	if (input.difficulty > 10 || input.difficulty < 1) {
		errors.difficulty = "The difficulty must be between 1 and 10";
	}
	if (
		input.season !== "summer" &&
		input.season !== "winter" &&
		input.season !== "autum" &&
		input.season !== "spring"
	) {
		errors.season =
			'"in season onely select :summer", "winter", "autumn", "spring"';
	}

	return errors;
}

export const CreateActivities = () => {
	const dispatch = useDispatch();
	const allCountries = useSelector((state) => state.countries);

	useEffect(() => {
		!allCountries.length && dispatch(getCountries());
	}, [dispatch]);

	const [input, setInput] = useState({
		name: "",
		difficulty: "",
		duration: "",
		season: "",
	});

	const [errors, setErrors] = useState({});
	const handleChoose = (e) => {
		setSelectCountry([...selectCountry, e.target.value]);
	};
	const [selectCountry, setSelectCountry] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		postActivities({ ...input, countries: selectCountry });
	};

	const handleChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		setErrors(
			validations({
				...input,
				[e.target.name]: e.target.value,
			})
		);
	};
	const postActivities = async (formData) => {
		try {
			if (
				Object.values(input).every((el) => Boolean(el)) &&
				selectCountry.length
			) {
				const activities = await axios.post(
					"http://localhost:3001/createActivities",
					formData
				);
				console.log(activities);
			} else {
				console.log("NO LLENARON LOS INPUTA", input);
			}
		} catch (err) {
			console.log(err.message);
		}
	};
	return (
		<>
			<form className="CreateActivities" onSubmit={handleSubmit}>
				<select
					onChange={(e) => {
						handleChoose(e);
					}}>
					<option value="">Countries</option>
					{allCountries.map((el) => (
						<option value={el.name}>{el.name}</option>
					))}
				</select>

				<label>Name:</label>
				<input
					onChange={handleChange}
					placeholder="Activity Name"
					value={input.value}
					name="name"
					type="text"
				/>
				<label>Dificulty:</label>
				<input
					onChange={handleChange}
					placeholder="Dificulty 1 to 5"
					value={input.value}
					name="difficulty"
					type="text"
				/>
				<label>Duration:</label>
				<input
					onChange={handleChange}
					value={input.value}
					placeholder="Duration in hours"
					name="duration"
					type="text"
				/>
				<label>Season:</label>
				<input
					onChange={handleChange}
					value={input.value}
					placeholder="Time in year"
					name="season"
					type="text"
				/>
				<ul>
					{selectCountry.map((el) => (
						<li>{el}</li>
					))}
				</ul>
				<input type="submit" />
			</form>
			{errors.name && <p>{errors.name}</p>}
			{errors.difficulty && <p>{errors.difficulty}</p>}
			{errors.duration && <p>{errors.uration}</p>}
			{errors.season && <p>{errors.season}</p>}
		</>
	);
};
