import "./index.css";
import { BsFillCloudSunFill } from "react-icons/bs";
import LogoCompassSmall from "../../assets/logo-compass-p.svg";
import Arrow from "../../assets/arrow-right-north 1.svg";
import { signOut } from "firebase/auth";
import { auth } from "../../FirebaseConection";
import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import Relogio from "./relogio";

const Header = () => {
	const [responceAPI, setResponce] = useState();

	const options = { month: "long", day: "numeric", year: "numeric" };
	const dataAtual = new Date().toLocaleDateString("en-US", options);

	async function searchLocation() {
		const user = JSON.parse(localStorage.getItem("userLogado"));
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${user.data.city},${user.data.country}&appid=fb467c7a3050db4a2dd8859d1484d947&lang=pt_br`;
		if (responceAPI !== "object") {
			await axios.get(url).then((responce) => {
				setResponce(responce.data);
				console.log(responceAPI);
			});
		}
	}

	searchLocation();

	async function logOut() {
		await signOut(auth).then(() => {
			localStorage.removeItem("userLogado");
			return <Navigate to="/" />;
		});
	}

	return (
		<header>
			<div className="header-container">
				<div className="header-box-title">
					<h1>Weekly Planner</h1>
					<h2>Use this plannerto organize your daily issues.</h2>
				</div>
				<div className="header-box-date">
					<Relogio />
					<h2>{dataAtual}</h2>
				</div>
				<div className="header-box-temp">
					<h1>Asunción - Paraguay</h1>
					<BsFillCloudSunFill fontSize="34px" />
					<h2>22º</h2>
				</div>
				<div className="header-box-logout">
					<Link to="https://www.exemplo.com/" target="_blank">
						<img src={LogoCompassSmall} alt="Compass" />
					</Link>
					<button onClick={logOut}>
						<img src={Arrow} alt="Arrow" />
						Logout
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
