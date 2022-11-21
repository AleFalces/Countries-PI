import React from "react";
import "./Card.css";

export const Card = ({ data: { flag, name, continents, population } }) => {
	return (
		<div className="Card">
			<img className="Img" src={flag} alt={name} />
			<div className="TextCard">
				<p className="TextCard">{name}</p>
				<p className="TextCard">Continent:{continents}</p>
				<p className="TextCard">Population:{population}</p>
			</div>
		</div>
	);
};
