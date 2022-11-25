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
				<div className="capitalContainer">
					<img className="cardImage" src={Detail?.flag} alt={Detail.name} />
					<h1 className="CapAndcontinet"> {Detail.name}</h1>
					<h2 className="CapAndcontinet">Capital: {Detail.capital}</h2>
				</div>
				<div className="capitalContainer">
					<h3>Continent:{Detail.continents}</h3>
					<p>Subregion: {Detail.subregion}</p>
					<p>Area: {Detail.area}</p>
					<p>Population: {Detail.population}</p>
					<div className="activities">
						<ul className="ActivityList">
							Activities:
							{Detail.TuristActivities?.map((el) => (
								<li key={el.id} className="ActivityList">
									<p>Activity :{el.name}</p>
									<p>Duration :{el.duration}hs </p>
									<p>Time of the year: {el.season}</p>
									<p>Difficulty: {el.difficulty}★</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};
