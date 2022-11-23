import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CountryDetails } from "../../Redux/actions";
import { NavBar } from "../NavBar/NavBar";
import "../Details/Details.css";

export const Details = () => {
	const dispatch = useDispatch();
	const { paramsId } = useParams();
	const Detail = useSelector((state) => state.Detail);

	useEffect(() => {
		dispatch(CountryDetails(paramsId));
	}, [dispatch]);

	return (
		<>
			<NavBar />
			<div className="CountryDetails">
				<div className="">
					<img className="cardImage" src={Detail.flag} alt={Detail.name} />
					<h1> {Detail.name}</h1>
					<h2>Capital: {Detail.capital}</h2>
				</div>
				<div>
					<h3>Continent:{Detail.continents}</h3>
					<p>Subregion: {Detail.subregion}</p>
					<p>Area: {Detail.area}</p>
					<p>Population: {Detail.population}</p>

					<ul>
						Activities:
						{Detail.TuristActivities?.map((el) => (
							<li key={el.id}>
								<ul>Activity :{el.name}</ul>
								<ul> Duration :{el.duration}hs</ul>
								<ul>Time of the year: {el.season}</ul>
								<ul>Difficulty: {el.difficulty}★</ul>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};
