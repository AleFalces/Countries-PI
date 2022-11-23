import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCountries } from "../../Redux/actions";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import "../CreateActivities/CreateActivities.css";
import Filter from "../Filter/Filter.jsx";

function validations(input) {
	let errors = {
		err: false,
	};

	if (!input.name) {
		errors.name = "Name must be provided";
		errors.err = true;
	}
	if (!input.duration) {
		errors.duration = "Please chose Duration";
		errors.err = true;
	}
	if (!input.countries.length) {
		errors.countries = "Please chose contry for this activity";
		errors.err = true;
	}

	if (isNaN(input.difficulty)) {
		errors.difficulty = "Difficulty: Only numbers are allowed";
		errors.err = true;
	}
	if (isNaN(input.duration)) {
		errors.duration = "Duration: Only numbers are allowed";
		errors.err = true;
	}
	if (input.difficulty > 5 || input.difficulty < 1) {
		errors.difficulty = "The difficulty must be between 1 and 5";
		errors.err = true;
	}
	if (input.duration > 24 || input.duration < 1) {
		errors.duration = "The activity must last between 1 and 24 hours";
		errors.err = true;
	}
	if (
		input.season !== "summer" &&
		input.season !== "winter" &&
		input.season !== "autum" &&
		input.season !== "spring"
	) {
		errors.season = '"Please choose : "summer", "winter", "autumn" or "spring"';
		errors.err = true;
	}

	return errors;
}

export const CreateActivities = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const allCountries = useSelector((state) => state.allCountries);

	useEffect(() => {
		!allCountries.length && dispatch(getCountries());
	}, [dispatch]);

	const [input, setInput] = useState({
		name: "",
		difficulty: "",
		duration: "",
		season: "",
		countries: [],
	});

	const [errors, setErrors] = useState({});

	const handleChoose = (e) => {
		setInput({
			...input,
			countries: [...input.countries, e.target.value],
		});
		setErrors(
			validations({
				...input,
				countries: e.target.value,
			})
		);
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
		console.log(
			{
				...input,
				[e.target.name]: e.target.value,
			},
			{
				...input,
				[e.target.name]: e.target.value,
			}
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (errors.err) {
			alert("Complete all inputs please");
		} else {
			postActivities({ ...input });
			setInput({
				name: "",
				difficulty: "",
				duration: "",
				season: "",
				countries: [],
			});
			alert("Activity created successfully!");
			history.push("/home");
		}
	};

	const handleReset = () => {
		setInput({
			name: "",
			difficulty: "",
			duration: "",
			season: "",
			countries: [],
		});
		setErrors({});
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
			<NavBar />
			<div className="outerBox">
				<div className="bigBox">
					<form className="formBox" onSubmit={handleSubmit}>
						<Filter
							className="form-section"
							arr={allCountries}
							propName={"name"}
							propsFunction={handleChoose}></Filter>

						<label>Name:</label>
						<input
							className="form-section"
							onChange={(e) => {
								handleChange(e);
							}}
							placeholder="Activity Name"
							value={input.name}
							name="name"
							type="text"
						/>

						<label>Dificulty:</label>
						<input
							className="form-section"
							onChange={(e) => {
								handleChange(e);
							}}
							min="1"
							max="5"
							placeholder="Dificulty 1 to 5"
							value={input.difficulty}
							name="difficulty"
							type="number"
						/>
						<label>Duration:</label>
						<input
							className="form-section"
							onChange={(e) => {
								handleChange(e);
							}}
							value={input.duration}
							placeholder="Duration"
							name="duration"
							type="number"
						/>

						<label>Season:</label>
						<input
							className="form-section"
							onChange={(e) => {
								handleChange(e);
							}}
							value={input.season}
							placeholder="Time in year"
							name="season"
							type="text"
						/>

						<button className="formButtom" type="reset" onClick={handleReset}>
							Reset all
						</button>
						<button
							disabled={
								errors.err ? true : false || !input.season.length ? true : false
							}
							className="formButtom"
							type="submit">
							Submit Activity
						</button>
					</form>
				</div>
				<div className="listBox">
					<ul>
						{input.countries.map((el) => (
							<li className="list" key={el}>
								{el}
							</li>
						))}
					</ul>
				</div>
			</div>
			<div>
				<p className="error" hidden={errors.name ? false : true}>
					{errors.name}
				</p>
				<p className="error" hidden={errors.difficulty ? false : true}>
					{errors.difficulty}
				</p>
				<p className="error" hidden={errors.duration ? false : true}>
					{errors.duration}
				</p>
				<p className="error" hidden={errors.season ? false : true}>
					{errors.season}
				</p>
				<p className="error" hidden={errors.countries ? false : true}>
					{errors.countries}
				</p>
			</div>
		</>
	);
};
