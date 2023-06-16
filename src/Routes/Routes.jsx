import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";
import Private from "./Private";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/dashboard"
					element={
						<Private>
							<Dashboard />
						</Private>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
