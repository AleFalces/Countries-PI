const axios = require("axios");
const { Country, TuristActivities } = require("../db");

const getCountries = async () => {
	const api = await axios.get("https://restcountries.com/v3/all");
	const result = api.data.map((el) => {
		return {
			name: el.name.common,
			flag: el.flags[0],
			continents: el.continents[0],
			capital: el.capital ? el.capital[0] : "No tiene capital",
			subregion: el.subregion ? el.subregion : el.continents[0],
			area: el.area,
			population: el.population,
		};
	});

	return result;
};

const CountriesDB = async () => {
	try {
		const valid = await Country.findAll();

		if (!valid.length) {
			const dataApi = await getCountries();
			dataApi.forEach((el) => {
				Country.findOrCreate({
					where: {
						name: el.name,
						flag: el.flag,
						continents: el.continents,
						capital: el.capital,
						subregion: el.subregion,
						area: el.area,
						population: el.population,
					},
				});
			});
		}

		const country = await Country.findAll({
			include: [TuristActivities],
		});

		return country;
	} catch (err) {
		console.log(err.message);
	}
};

module.exports = { CountriesDB };
