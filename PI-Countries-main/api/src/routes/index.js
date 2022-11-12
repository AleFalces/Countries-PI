const { Router } = require("express");
const { db, Country, TuristActivities } = require("../db");
const controller = require("../controller/index.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

//triago todos los pises
router.get("/Countries", async (req, res) => {
	try {
		res.status(200).json(await controller.CountriesDB());
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
		res.status(200).json(!findCountry ? "country not found" : findCountry);
	} catch (err) {
		res.status(400).json({ error: "asi no e" });
	}
});

// // Busqueda x name
router.get("/getCountryByName", async (req, res) => {
	const { countryName } = req.query;
	try {
		const findName = await Country.findOne({
			where: {
				name: countryName,
			},
		});
		res.status(200).json(!findName ? "Name not found" : findName);
	} catch (err) {
		res.status(400).json({ Error: err });
	}
});

module.exports = router;
