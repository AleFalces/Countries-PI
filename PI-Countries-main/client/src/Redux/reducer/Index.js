import * as actions from "../actionTypes";

const initialState = {
	allCountries: [],
	countries: [],
	continents: [],
	actualPage: 1,
	countriesDetail: {},
};

const rootReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actions.GET_COUNTRIES:
			return {
				...state,
				allCountries: payload.countries,
				continents: payload.continents,
				countries: payload.countries,
			};
	}
};
