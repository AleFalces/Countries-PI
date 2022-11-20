import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCountries } from "../../Redux/actions";
import axios from "axios";
import { useHistory } from "react-router-dom";

function validations(input) {
	let errors = {};

	if (!input.name) {
		errors.name = "Name must be provided";
	}
	if (!input.duration) {
		errors.duration = "Please chose Duration";
	}

	if (isNaN(input.difficulty)) {
		errors.difficulty = "Difficulty: Only numbers are allowed";
	}
	if (isNaN(input.duration)) {
		errors.duration = "Duration: Only numbers are allowed";
	}
	if (input.difficulty > 5 || input.difficulty < 1) {
		errors.difficulty = "The difficulty must be between 1 and 5";
	}
	if (input.duration > 24 || input.duration < 1) {
		errors.duration = "The activity must last between 1 and 24 hours";
	}
	if (
		input.season !== "summer" &&
		input.season !== "winter" &&
		input.season !== "autum" &&
		input.season !== "spring"
	) {
		errors.season = '"Please choose : "summer", "winter", "autumn" or "spring"';
	}

	return errors;
}

export const CreateActivities = () => {
	const dispatch = useDispatch();
	const history = useHistory();
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
		console.log(input, selectCountry);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		postActivities({ ...input, countries: selectCountry });
		alert("Activity created successfully!");
		setInput({ name: "", difficulty: "", duration: "", season: "" });
		history.push("/home");
	};

	const handleReset = () => {
		setInput({ name: "", difficulty: "", duration: "", season: "" });
		setErrors({});
		setSelectCountry([]);
	};

	const postActivities = async (formData) => {
		try {
			const activities = await axios.post(
				"http://localhost:3001/createActivities",
				formData
			);
			console.log(activities);
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
					value={input.name}
					name="name"
					type="text"
				/>
				<label>Dificulty:</label>
				<input
					onChange={handleChange}
					placeholder="Dificulty 1 to 5"
					value={input.difficulty}
					name="difficulty"
					type="text"
				/>
				<label>Duration:</label>
				<input
					onChange={handleChange}
					value={input.duration}
					placeholder="Duration in hours"
					name="duration"
					type="text"
				/>
				<label>Season:</label>
				<input
					onChange={handleChange}
					value={input.season}
					placeholder="Time in year"
					name="season"
					type="text"
				/>
				<ul>
					{selectCountry.map((el) => (
						<li>{el}</li>
					))}
				</ul>
				<button className="formButtom" type="reset" onClick={handleReset}>
					Reset all
				</button>
				<button
					disabled={
						errors.difficulty
							? true
							: false || errors.duration
							? true
							: false || errors.name
							? true
							: false || errors.season
							? true
							: false || selectCountry.length
							? false
							: true
					}
					className="formButtom"
					type="submit">
					Submit Activity
				</button>
			</form>

			<p hidden={errors.name ? false : true}>{errors.name}</p>
			<p hidden={errors.difficulty ? false : true}>{errors.difficulty}</p>
			<p hidden={errors.duration ? false : true}>{errors.duration}</p>
			<p hidden={errors.season ? false : true}>{errors.season}</p>
		</>
	);
};
