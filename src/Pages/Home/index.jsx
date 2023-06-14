import "./index.css";
import backgroundImage from "../../assets/Background-image.png";
import { AiOutlineUser, AiOutlineLock } from "react-icons/Ai";
const Home = () => {
	function handleLogIn() {}

	return (
		<section>
			<div className="container">
				<div className="box">
					<div className="box-title">
						<h1>Welcome,</h1>
						<p>To continue browsing safely, log in to the network.</p>
					</div>
					<form className="form" onSubmit={handleLogIn()}>
						<label>Login</label>
						<div className="box-input">
							<input type="email" placeholder="Email" />
							<AiOutlineUser color="#E0E0E0" fontSize={"20px"} />
						</div>
						<div className="box-input">
							<input type="password" placeholder="Password" />
							<AiOutlineLock color="#E0E0E0" fontSize={"20px"} />
						</div>
						<button type="submit">Log In</button>
					</form>
				</div>
			</div>
			<div className="img-back">
				<img src={backgroundImage} alt="" width="960px" height="1080px" />
				<div className="logo"></div>
			</div>
		</section>
	);
};

export default Home;
