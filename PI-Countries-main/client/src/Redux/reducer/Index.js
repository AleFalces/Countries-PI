import {
	GET_ALL_COUNTRIES,
	GET_COUNTRY_BY_ID,
	ACTUAL_PAGE,
	GET_COUNTRY_NAME,
	FILTER_CONTINENTS,
	ORDER_COUNTRIES,
	FILTER_ACTIVITY,
} from "../actionTypes";

const initialState = {
	allCountries: [],
	activities: [],
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
				activities: action.payload.activities,
			};
		case GET_COUNTRY_NAME:
			return {
				...state,
				countries: action.payload,
				actualPage: 1,
			};
		case GET_COUNTRY_BY_ID:
			return {
				...state,
				Detail: action.payload,
			};
		case ACTUAL_PAGE:
			return {
				...state,
				actualPage: action.payload,
			};
		case FILTER_CONTINENTS:
			return {
				...state,
				countries: action.payload,
				actualPage: 1,
			};
		case FILTER_ACTIVITY:
			return {
				...state,
				countries: action.payload,
				actualPage: 1,
			};
		case ORDER_COUNTRIES:
			return {
				...state,
				countries: action.payload,
				actualPage: 1,
			};
		default:
			return state;
	}
};
export default RootReducer;
