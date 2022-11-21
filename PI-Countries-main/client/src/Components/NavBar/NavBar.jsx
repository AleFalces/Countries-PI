import { Link } from "react-router-dom";

export const NavBar = () => {
	return (
		<div className="NavBar">
			<h1>Countries</h1>
			<Link className="linkHome" to="/home">
				<button>Home</button>
			</Link>
			<Link className="createActivities" to="/CreateActivities">
				<button>Create Activities</button>
			</Link>
		</div>
	);
};
