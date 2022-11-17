import { GET_ALL_COUNTRIES, GET_COUNTRY_BY_ID } from "../actionTypes";

const initialState = {
	allCountries: [],
	countries: [],
	continents: [],
	actualPage: 1,
	Detail: {},
};

const RootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_COUNTRIES:
			return {
				...state,
				allCountries: action.payload.countries,
				continents: action.payload.continents,
				countries: action.payload.countries,
			};
		case GET_COUNTRY_BY_ID:
			return {
				...state,
				countriesDetail: action.payload,
			};
		default:
			return state;
	}
};
export default RootReducer;
