import { Link } from "react-router-dom";

export const NavBar = () => {
	return (
		<div className="NavBar">
			<h1>Countries</h1>
			<Link classname="linkHome" to="/home">
				<button>Home</button>
			</Link>
			<Link classname="createActivities" to="/CreateActivities">
				<button>Create Activities</button>
			</Link>
		</div>
	);
};
