import "./index.css";
import { BsFillCloudSunFill } from "react-icons/bs";
import LogoCompassSmall from "../../assets/logo-compass-p.svg";
import Arrow from "../../assets/arrow-right-north 1.svg";
const Header = () => {
	return (
		<header>
			<div className="header-container">
				<div className="header-box-title">
					<h1>Weekly Planner</h1>
					<h2>Use this plannerto organize your daily issues.</h2>
				</div>
				<div className="header-box-date">
					<h1>10:58</h1>
					<h2>November 22th, 2022 </h2>
				</div>
				<div className="header-box-temp">
					<h1>Asunción - Paraguay</h1>
					<BsFillCloudSunFill fontSize="34px" />
					<h2>22º</h2>
				</div>
				<div className="header-box-logout">
					<img src={LogoCompassSmall} alt="Compass" />
					<button>
						<img src={Arrow} alt="Arrow" />
						Logout
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
