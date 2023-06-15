import "./index.css";
import backgroundImage from "../../assets/Background-image.png";
import { AiOutlineUser, AiOutlineLock } from "react-icons/Ai";
const Home = () => {
	function handleLogIn() {}

	return (
		<section>
			<div className="container-login">
				<div className="box-login">
					<div className="box-title-login">
						<h1>Welcome,</h1>
						<h2>To continue browsing safely, log in to the network.</h2>
					</div>
					<form className="form-login" onSubmit={handleLogIn()}>
						<h2>Login</h2>
						<div className="box-input-login">
							<input type="email" placeholder="Email" />
							<AiOutlineUser color="#E0E0E0" fontSize={"20px"} />
						</div>
						<div className="box-input-login">
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
