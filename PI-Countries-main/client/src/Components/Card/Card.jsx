import React from "react";

export const Card = ({ data: { flag, name, continents, population } }) => {
	return (
		<div className="CountryCard">
			<img src={flag} alt="no carga concha de dios" />
			<div className="TextCard">
				<p>{name}</p>
				<p>Continent:{continents}</p>
				<p>Population:{population}</p>
			</div>
		</div>
	);
};
