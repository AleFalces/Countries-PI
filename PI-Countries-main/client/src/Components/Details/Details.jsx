import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CountryDetails } from "../../Redux/actions";
// import { CardDetails } from "./CardDetails";

export const Details = () => {
	const dispatch = useDispatch();
	const { paramsId } = useParams();
	const Detail = useSelector((state) => state.Detail);

	useEffect(() => {
		dispatch(CountryDetails(paramsId));
	}, [dispatch]);

	return (
		<>
			<div className="CountryDetails">
				<img
					className="card_detail_image"
					src={Detail.flag}
					alt={Detail.name}
				/>
				<h1>Name: {Detail.name}</h1>
				<h2>Capital: {Detail.capital}</h2>
				<h3>Continent:{Detail.continents}</h3>
				<p>Subregion: {Detail.subregion}</p>
				<p>Area: {Detail.area}</p>
				<p>Population: {Detail.population}</p>
			</div>
		</>
	);
};
