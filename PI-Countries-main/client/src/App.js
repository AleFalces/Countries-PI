import "./App.css";
import { Route } from "react-router-dom";
import { NavBar } from "./Components/NavBar/NavBar";
import { Home } from "./Components/Home/home";
import { LandingPage } from "./Components/LandingPage/LandingPage";
import { CreateActivities } from "./Components/CreateActivities/CreateActivities";
import { Details } from "./Components/Details/Details";

function App() {
	return (
		<div className="App">
			<NavBar />
			<Route exact path="/" component={LandingPage}></Route>
			<Route exact path="/home" component={Home}></Route>
			<Route
				exact
				path="/CreateActivities"
				component={CreateActivities}></Route>
			<Route exact path="/Countries/:paramsId" component={Details}></Route>
		</div>
	);
}

export default App;
