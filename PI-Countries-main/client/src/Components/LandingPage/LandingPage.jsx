import React from "react";
import { Link } from "react-router-dom";
import "../LandingPage/LandingPage.css";

export const LandingPage = () => {
	return (
		<div>
			<div className="Landing">
				<h1 className="titleLanding">Welecome</h1>
				<Link to="/home">
					<button className="Button">Go Trip</button>
				</Link>
			</div>
		</div>
	);
};
