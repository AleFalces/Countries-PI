import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CountryDetails } from "../../Redux/actions";
// import { CardDetails } from "./CardDetails";

export const Details = () => {
	const dispatch = useDispatch();
	const { countryId } = useParams();
	const countryDetail = useSelector((state) => state.countriesDetail);

	useEffect(() => {
		dispatch(CountryDetails(countryId));
	}, [countryId, dispatch]);

	return (
		<>
			<img
				className="card_detail_image"
				src={countryDetail?.flag}
				alt={countryDetail?.name}
			/>
			<h1>Name: {countryDetail?.name}</h1>
			<h2>Capital: {countryDetail?.capital}</h2>
			<p>id: {countryDetail?.id}</p>
			<p>Subregion: {countryDetail?.subregion}</p>
			<p>Area: {countryDetail?.area}</p>
			<p>Population: {countryDetail.population}</p>
			<ul>
				Activities:
				{countryDetail.TuristActivities?.map((el) => (
					<li key={el.id}>{el.name}</li>
				))}
			</ul>
		</>
	);
};
