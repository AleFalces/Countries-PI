import {
	GET_ALL_COUNTRIES,
	GET_COUNTRY_BY_ID,
	ACTUAL_PAGE,
	GET_COUNTRY_NAME,
	FILTER_CONTINENTS,
	ORDER_COUNTRIES,
	FILTER_ACTIVITY,
	NEXT_PAGE,
	PREV_PAGE,
} from "../actionTypes";
import axios from "axios";

export const getCountries = () => async (dispatch) => {
	try {
		const countries = await axios.get("http://localhost:3001/Countries");
		dispatch({
			type: GET_ALL_COUNTRIES,
			payload: {
				countries: countries.data.countries,
				continents: [
					"AllContinents",
					...new Set(countries.data.countries.map((el) => el.continents)),
				],
				activities: countries.data.activities,
			},
		});
	} catch (err) {
		console.log(err.message);
	}
};

export const ActualPage = (page) => (dispatch) => {
	dispatch({
		type: ACTUAL_PAGE,
		payload: page,
	});
};

export const CountryByName = (name) => async (dispatch) => {
	try {
		const byName = await axios.get(
			`http://localhost:3001/countryName?name=${name}`
		);
		dispatch({
			type: GET_COUNTRY_NAME,
			payload: byName.data,
		});
	} catch (err) {
		console.log(err.message);
	}
};

export const CountryDetails = (id) => async (dispatch) => {
	try {
		const getID = await axios.get(`http://localhost:3001/Countries/${id}`);
		dispatch({
			type: GET_COUNTRY_BY_ID,
			payload: getID.data,
		});
	} catch (err) {
		console.log(err.message);
	}
};
export const filterContinent = (filterContinent, countries) => (dispatch) => {
	let filterByContinet =
		filterContinent === "AllContinents"
			? countries
			: countries.filter((el) => el.continents === filterContinent);

	dispatch({
		type: FILTER_CONTINENTS,
		payload: filterByContinet,
	});
};

export const filterActivities = (valueSelect, allCountries) => (dispatch) => {
	let filterByActivities = allCountries.filter((el) =>
		el.TuristActivities.some((activity) => activity.name === valueSelect)
	);

	dispatch({
		type: FILTER_ACTIVITY,
		payload: filterByActivities,
	});
};

export const orderBy = (countries, valueSelect) => (dispatch) => {
	let array = [];

	//ORDER BY NAME ASCENDENT

	if (valueSelect === "Ascendent") {
		array = countries.sort((a, b) => a.name.localeCompare(b.name));
	}
	//ORDER BY NAME DESCENDENT
	if (valueSelect === "Descendent") {
		array = countries.sort((a, b) => b.name.localeCompare(a.name));
	}
	//ORDER BY POPULATION
	if (valueSelect === "Poblation") {
		array = countries.sort((a, b) => a.population - b.population);
	}

	dispatch({
		type: ORDER_COUNTRIES,
		payload: [...array],
	});
};
export const Prev = (actualPage) => (dispatch) => {
	let next = actualPage - 1;
	dispatch({
		type: PREV_PAGE,
		payload: next,
	});
};
export const Next = (actualPage) => (dispatch) => {
	let next = actualPage + 1;
	dispatch({
		type: NEXT_PAGE,
		payload: next,
	});
};
