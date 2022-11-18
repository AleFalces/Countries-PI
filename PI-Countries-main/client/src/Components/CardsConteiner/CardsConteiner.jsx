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
import { PaginationCountries } from "./PaginationCountries";
import { SearchBar } from "../SearchBar/SearchBar";

export const CardsConteiner = () => {
	const allCountries = useSelector((state) => state.allCountries);
	const countries = useSelector((state) => state.countries);
	const continents = useSelector((state) => state.continents);
	const actualPage = useSelector((state) => state.actualPage);

	const dispatch = useDispatch();

	useEffect(() => {
		!allCountries.length && dispatch(getCountries());
	}, [dispatch]);

	const orderTypes = ["Ascendent", "Descendent", "Poblation"];

	const [countriesPerPage] = useState(10);
	const lastIndex = actualPage * countriesPerPage;
	const firstIndex = lastIndex - countriesPerPage;
	const currentCountriesPerPage = countries.slice(firstIndex, lastIndex);

	return (
		<div Classname="CardsContainer">
			<SearchBar />
			<select
				onChange={(e) =>
					dispatch(filterContinent(e.target.value, allCountries))
				}>
				<option>Filter By Continents</option>
				{continents?.map((el) => (
					<option value={el}>{el}</option>
				))}
			</select>

			<select
				onChange={(e) => {
					dispatch(orderBy(countries, e.target.value));
				}}>
				<option>Order By</option>
				{orderTypes.map((el) => (
					<option value={el}>{el}</option>
				))}
			</select>

			<div Classname="Cards">
				{!countries.length
					? "missing countries"
					: currentCountriesPerPage.map((el) => (
							<Link Link to={`/Countries/${el.id}`}>
								<Card data={el} key={el.id} />
							</Link>
					  ))}
			</div>
			<div className="Pagination">
				<PaginationCountries
					countries={countries}
					countriesPerPage={countriesPerPage}
				/>
			</div>
		</div>
	);
};
