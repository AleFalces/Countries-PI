import React from "react";
import { Link } from "react-router-dom";

export const LandingPage = () => {
	return (
		<div>
			<div className="Landing">
				<h1 className="titleLanding">Welecome</h1>
				<Link to="/home">
					<button className="Button">Enter</button>
				</Link>
			</div>
		</div>
	);
};
