import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../Card/Card";
import {
	getCountries,
	filterContinent,
	orderBy,
} from "../../Redux/actions/index";
import { Link } from "react-router-dom";
import { Pagination } from "../Pagination/Pagination";
import { SearchBar } from "../SearchBar/SearchBar";
import "./CardsConteiner.css";

export const CardsConteiner = () => {
	const allCountries = useSelector((state) => state.allCountries);
	const countries = useSelector((state) => state.countries);
	const continents = useSelector((state) => state.continents);
	const actualPage = useSelector((state) => state.actualPage);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCountries());
	}, [dispatch]);

	const orderTypes = ["Ascendent", "Descendent", "Poblation"];

	const [countriesPerPage] = useState(9);
	const lastIndex = actualPage * countriesPerPage;
	const firstIndex = lastIndex - countriesPerPage;
	const currentCountriesPerPage = countries.slice(firstIndex, lastIndex);

	return (
		<div className="CardsContainer">
			<div className="filterBar">
				<select
					className="Select"
					onChange={(e) =>
						dispatch(filterContinent(e.target.value, allCountries))
					}>
					<option>Filter By Continents</option>
					{continents?.map((el) => (
						<option value={el} key={el}>
							{el}
						</option>
					))}
				</select>

				<SearchBar />
				<select
					className="Select"
					onChange={(e) => {
						dispatch(orderBy(countries, e.target.value));
					}}>
					<option>Order By</option>
					{orderTypes.map((el) => (
						<option value={el} key={el}>
							{el}
						</option>
					))}
				</select>
			</div>
			<div className="Pagination">
				<Pagination countries={countries} countriesPerPage={countriesPerPage} />
			</div>
			<div className="Cards">
				{!countries?.length ? (
					<p>Country Not found</p>
				) : (
					currentCountriesPerPage?.map((el) => (
						<Link to={`/Countries/${el.id}`} key={el.id}>
							<Card data={el} />
						</Link>
					))
				)}
			</div>
			<div className="Pagination">
				<Pagination countries={countries} countriesPerPage={countriesPerPage} />
			</div>
		</div>
	);
};
