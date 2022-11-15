import { GET_COUNTRIES } from "../actionTypes";
const axios = require("axios");

export const getCountries = () => async (dispatch) => {
	try {
		const countries = await axios.get("http://localhost:3001/Countries");
		dispatch({
			type: GET_COUNTRIES,
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
