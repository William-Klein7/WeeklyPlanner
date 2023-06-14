import "./index.css";
import backgroundImage from "../../assets/Background-image.png";
import { useState } from "react";

const Register = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	function handleRegister(e) {
		e.preventDefault();
	}
	return (
		<section>
			<div className="container">
				<div className="box">
					<div className="box-title">
						<h1>Welcome,</h1>
						<h2>Please, register to continue</h2>
					</div>
					<form className="form" onSubmit={handleRegister}>
						<div className="box-input">
							<label>First Name</label>
							<input
								value={firstName}
								onChange={(e) => {
									setFirstName(e.target.value);
								}}
								type="text"
								placeholder="Your first name"
							/>
						</div>
						<div className="box-input">
							<label>Last name</label>
							<input
								value={lastName}
								onChange={(e) => {
									setLastName(e.target.value);
								}}
								type="text"
								placeholder="Your last name"
							/>
						</div>
						<div className="box-input">
							<label>Birth date</label>
							<input
								value={birthDate}
								onChange={(e) => {
									setBirthDate(e.target.value);
								}}
								type="date"
							/>
						</div>
						<div className="box-input">
							<label>Country</label>
							<input
								value={country}
								onChange={(e) => {
									setCountry(e.target.value);
								}}
								type="text"
								placeholder="Your Country"
							/>
						</div>
						<div className="box-input">
							<label>City</label>
							<input
								value={city}
								onChange={(e) => {
									setCity(e.target.value);
								}}
								type="text"
								placeholder="Your City"
							/>
						</div>
						<div className="box-input">
							<label>E-mail</label>
							<input
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								type="email"
								placeholder="A valid e-mail here"
							/>
						</div>
						<div className="box-input">
							<label>Password</label>
							<input
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								type="new-password"
								placeholder="Your password"
							/>
						</div>
						<div className="box-input">
							<label>Password</label>
							<input
								value={confirmPassword}
								onChange={(e) => {
									setConfirmPassword(e.target.value);
								}}
								type="new-password"
								placeholder="Confirm your password"
							/>
						</div>
						<button type="submit">Register Now</button>
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

export default Register;
