import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../Card/Card";
import { getCountries } from "../../Redux/actions/index";
import { Link } from "react-router-dom";

export const CardsConteiner = () => {
	// const allCountries = useSelector((state) => state.allCountries);
	const countries = useSelector((state) => state.countries);
	// const continents = useSelector((state) => state.continents);
	// const actualPage = useSelector((state) => state.actualPage);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCountries());
	}, [dispatch]);

	// tenes q cambiar el countries.map por el arreglo q uses para hacer la apginacion
	return (
		<div Classname="CardsContainer">
			{!countries.length
				? "missing countries"
				: countries.map((el) => (
						<Link Link to={`/Countries/${el.id}`}>
							<Card data={el} key={el.id} />
						</Link>
				  ))}
		</div>
	);
};
