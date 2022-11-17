import { GET_ALL_COUNTRIES, GET_COUNTRY_BY_ID } from "../actionTypes";
import axios from "axios";

export const getCountries = () => async (dispatch) => {
	try {
		const countries = await axios.get("http://localhost:3001/Countries");
		dispatch({
			type: GET_ALL_COUNTRIES,
			payload: {
				countries: countries.data,
				continents: [
					"AllContinents",
					...new Set(countries.data.map((el) => el.continents)),
				],
			},
		});
	} catch (err) {
		console.log(err.message);
	}
};

export const CountryDetails = (id) => async (dispatch) => {
	try {
		const getID = await axios.get(`http://localhost:3001/CountryDetails/${id}`);
		dispatch({
			type: GET_COUNTRY_BY_ID,
			payload: getID.data,
		});
	} catch (err) {
		console.log(err.message);
	}
};
