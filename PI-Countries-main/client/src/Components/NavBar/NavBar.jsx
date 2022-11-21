import { NavLink } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
	return (
		<div className="NavBar">
			<NavLink to="/home" className="link">
				Home
			</NavLink>
			<NavLink to="/CreateActivities" className="link">
				Create Activities
			</NavLink>
		</div>
	);
};
