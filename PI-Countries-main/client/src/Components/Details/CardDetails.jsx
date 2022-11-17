export const CardDetails = ({
	name,
	id,
	capital,
	subregion,
	area,
	population,
	flag,
	TuristActivities,
}) => {
	return (
		<>
			<div className="Card-Details">
				<img className="card_detail_image" src={flag} alt={name} />
				<h1>Name: {name}</h1>
				<h2>Capital: {capital}</h2>
				<p>id: {id}</p>
				<p>Subregion: {subregion}</p>
				<p>Area: {area}</p>
				<p>Population: {population}</p>
				<ul>
					Activities:
					{TuristActivities?.map((el) => (
						<li key={el.id}>{el.name}</li>
					))}
				</ul>
			</div>
		</>
	);
};
