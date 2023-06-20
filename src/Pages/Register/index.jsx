import "./index.css";
import backgroundImage from "../../assets/Background-image.png";
import { useState } from "react";
import { toastError, toastSucess, toastWarn } from "../../Hook/toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../FirebaseConection";
import { auth } from "../../FirebaseConection";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();

	function validatePassword(senha) {
		let regexSenha = /^(?=.*[\W_])(?=.*[A-Z])(?=.*\d).{6,}$/;
		if (!regexSenha.test(senha)) {
			return false;
		}
		return true;
	}
	function validateEmail(email) {
		let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (regex.test(email)) {
			return true;
		} else {
			return false;
		}
	}

	function formatFrase(frase) {
		const palavras = frase.split(" ");

		const fraseFormatada = palavras.map((palavra) => {
			const primeiraLetra = palavra.charAt(0).toUpperCase();
			const outrasLetras = palavra.slice(1).toLowerCase();
			return primeiraLetra + outrasLetras;
		});

		return fraseFormatada.join(" ");
	}
	function verificarMaiorIdade(data) {
		const dataAtual = new Date();
		const dataNascimento = new Date(data);
		const idadeEmMilissegundos = dataAtual - dataNascimento;
		const idadeEmAnos = idadeEmMilissegundos / (1000 * 60 * 60 * 24 * 365.25);

		if (idadeEmAnos < 18) {
			return false;
		}
		return true;
	}

	function handleRegister(e) {
		e.preventDefault();

		if (
			firstName === "" ||
			lastName === "" ||
			birthDate === "" ||
			country === "" ||
			city === "" ||
			email === "" ||
			password === "" ||
			confirmPassword === ""
		) {
			toastWarn("Please fill in all fields!");
		} else if (!verificarMaiorIdade(birthDate)) {
			toastError("Sorry, but you must be at least 18 years old.");
		} else if (!validateEmail(email)) {
			toastWarn("Enter a valid email address.");
		} else if (!validatePassword(password)) {
			toastWarn(
				"The password must contain at least 6 characters, one special character, one capital letter and one number."
			);
		} else if (password !== confirmPassword) {
			toastWarn("Passwords must match!");
		} else {
			cadastrarUser();
		}
	}

	async function cadastrarUser() {
		await createUserWithEmailAndPassword(auth, email, password)
			.then((value) => {
				toastSucess("Successfully registered user");
				setInfoDB(value.user.uid);
				setFirstName("");
				setLastName("");
				setBirthDate("");
				setCountry("");
				setCity("");
				setEmail("");
				setPassword("");
				setConfirmPassword("");
			})
			.catch(() => {
				toastError("Email address already registered");
			});
	}

	async function setInfoDB(id) {
		await setDoc(doc(db, "users", id), {
			firsName: formatFrase(firstName),
			lastName: formatFrase(lastName),
			birthDate: birthDate,
			country: formatFrase(country),
			city: formatFrase(city),
			email: email,
		})
			.then(() => {
				setTimeout(() => {
					navigate("/");
				}, 3000);
			})
			.catch(() => {
				toastError("An error occurred while registering the user");
			});
	}

	return (
		<section className="login">
			<div className="container">
				<div className="box">
					<div className="box-title">
						<h1>Welcome,</h1>
						<h2>Please, register to continue</h2>
					</div>
					<form className="form" onSubmit={handleRegister}>
						<div className="box-input">
							<label htmlFor="firstNameId">First Name</label>
							<input
								value={firstName}
								onChange={(e) => {
									setFirstName(e.target.value);
								}}
								type="text"
								placeholder="Your first name"
								id="firstNameId"
							/>
						</div>
						<div className="box-input">
							<label htmlFor="LastNameId">Last name</label>
							<input
								value={lastName}
								onChange={(e) => {
									setLastName(e.target.value);
								}}
								type="text"
								placeholder="Your last name"
								id="LastNameId"
							/>
						</div>
						<div className="box-input">
							<label htmlFor="BirthDateId">Birth date</label>
							<input
								value={birthDate}
								onChange={(e) => {
									setBirthDate(e.target.value);
								}}
								type="date"
								id="BirthDateId"
							/>
						</div>
						<div className="box-input">
							<label htmlFor="countryId">Country</label>
							<input
								value={country}
								onChange={(e) => {
									setCountry(e.target.value);
								}}
								type="text"
								placeholder="Your Country"
								id="countryId"
							/>
						</div>
						<div className="box-input">
							<label htmlFor="cityId">City</label>
							<input
								value={city}
								onChange={(e) => {
									setCity(e.target.value);
								}}
								type="text"
								placeholder="Your City"
								id="cityId"
							/>
						</div>
						<div className="box-input">
							<label htmlFor="emailId">E-mail</label>
							<input
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								type="email"
								placeholder="A valid e-mail here"
								id="emailId"
							/>
						</div>
						<div className="box-input">
							<label htmlFor="passwordId">Password</label>
							<input
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								type="new-password"
								placeholder="Your password"
								id="passwordId"
							/>
						</div>
						<div className="box-input">
							<label htmlFor="confirmPasswordId">Password</label>
							<input
								value={confirmPassword}
								onChange={(e) => {
									setConfirmPassword(e.target.value);
								}}
								type="new-password"
								placeholder="Confirm your password"
								id="confirmPasswordId"
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
