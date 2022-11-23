import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../Card/Card";
import {
	getCountries,
	filterContinent,
	orderBy,
	filterActivities,
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
	const activities = useSelector((state) => state.activities);

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
					<option hidden>Filter By Continent</option>
					{continents?.map((el) => (
						<option value={el} key={el}>
							{el}
						</option>
					))}
				</select>
				<select
					className="Select"
					onChange={(e) =>
						dispatch(filterActivities(e.target.value, allCountries))
					}>
					<option hidden>Filter By Activity</option>
					{activities.map((el) => (
						<option value={el.name} key={el.id}>
							{el.name}
						</option>
					))}
				</select>

				<select
					className="Select"
					onChange={(e) => {
						dispatch(orderBy(countries, e.target.value));
					}}>
					<option hidden>Order By</option>
					{orderTypes.map((el) => (
						<option value={el} key={el}>
							Order: {el}
						</option>
					))}
				</select>
				<SearchBar />
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
