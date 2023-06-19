import "./index.css";
import LogoCompassSmall from "../../assets/logo-compass-p.svg";
import Arrow from "../../assets/arrow-right-north 1.svg";
import { signOut } from "firebase/auth";
import { auth } from "../../FirebaseConection";
import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import Relogio from "./relogio";

const Header = () => {
	const [responceAPI, setResponce] = useState("");
	const user = JSON.parse(localStorage.getItem("userLogado"));

	function formatDate() {
		const date = new Date();
		const month = date.toLocaleDateString("en", { month: "long" });
		let day = date.getDate();
		const year = date.getFullYear();
		if (day == 1 || day == 21 || day == 31) {
			day = day + "th";
		} else if (day == 2) {
			day = day + "nd";
		} else if (day == 3) {
			day = day + "rd";
		} else {
			day = day + "th";
		}

		return month + " " + day + ", " + year;
	}

	useEffect(() => {
		async function searchLocation() {
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${user.data.city},${user.data.country}&units=metric&appid=fb467c7a3050db4a2dd8859d1484d947&lang=pt_br`;
			if (typeof responceAPI !== "object") {
				await axios.get(url).then((responce) => {
					setResponce(responce.data);
				});
			}
		}
		searchLocation();
	}, [responceAPI, user.data.city, user.data.country]);

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
					<h2>{formatDate()}</h2>
				</div>

				{responceAPI ? (
					<div className="header-box-temp">
						<h1>
							{responceAPI.name} - {user.data.country}
						</h1>
						<img
							src={`http://openweathermap.org/img/wn/${responceAPI.weather[0].icon}.png`}
							alt="Icon"
						/>
						<h2>{parseInt(responceAPI.main.temp)}°</h2>
					</div>
				) : (
					<div className="header-box-temp">
						<h1>{user.data.country}</h1>
					</div>
				)}
				<div className="header-box-logout">
					<Link to="https://compass.uol/en/home/" target="_blank">
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
