const { Router } = require("express");
const { Op } = require("sequelize");
const { db, Country, TuristActivities } = require("../db");
const controller = require("../controller/index.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

//triago todos los pises
router.get("/Countries", async (req, res) => {
	try {
		res.status(200).json({
			countries: await controller.CountriesDB(),
			activities: await TuristActivities.findAll(),
		});
	} catch (err) {
		res.status(400).json({ error: err.messege });
	}
});

//Busqueda x id
router.get("/Countries/:paramsId", async (req, res) => {
	const { paramsId } = req.params;
	try {
		const findCountry = await Country.findOne({
			where: {
				id: paramsId,
			},
			include: [TuristActivities],
		});
		res.status(200).json(findCountry);
	} catch (err) {
		res.status(400).json({ error: err });
	}
});

// // Busqueda x name
router.get("/countryName", async (req, res) => {
	const name = req.query.name;
	if (name) {
		try {
			const findName = await Country.findAll({
				where: {
					name: { [Op.iLike]: "%" + name + "%" },
				},
			});
			res.status(200).json(findName);
		} catch (err) {
			res.status(400).json({ Error: err });
		}
	} else {
		res.status(400).json({ Error: "Missing Query" });
	}
});

router.post("/CreateActivities", async (req, res) => {
	const { name, difficulty, duration, season, countries } = req.body;

	try {
		const searchCountries = await Country.findAll({
			where: {
				name: countries,
			},
		});

		const activity = await TuristActivities.create({
			name,
			difficulty,
			duration,
			season,
			countries,
		});

		activity.addCountries(searchCountries);

		res.status(201).json(activity);
	} catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;
