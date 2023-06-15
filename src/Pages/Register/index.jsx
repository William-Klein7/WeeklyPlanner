import "./index.css";
import backgroundImage from "../../assets/Background-image.png";
import { useState } from "react";
import { toastError, toastSucess, toastWarn } from "../../Hook/useToast";
import { ToastContainer } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../FirebaseConection";
import { auth } from "../../FirebaseConection";

const Register = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	function validatePassword(senha) {
		let caractereEspecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
		if (!caractereEspecial.test(senha)) {
			return false;
		}
		let numero = /[0-9]+/;
		if (!numero.test(senha)) {
			return false;
		}
		let letraMaiuscula = /[A-Z]+/;
		if (!letraMaiuscula.test(senha)) {
			return false;
		}
		return true;
	}
	function validateEmail(email) {
		var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
			toastWarn("Por favor, preencha todos os campos!");
		} else if (!verificarMaiorIdade(birthDate)) {
			toastError("Desculpe, mas você precisa ter pelo menos 18 anos.");
		} else if (!validateEmail(email)) {
			toastWarn("Insira um endereço de E-mail válido.");
		} else if (!validatePassword(password)) {
			toastWarn(
				"A senha deve conter no minimo, um caractere especial, uma letra maiúscula e um número."
			);
		} else if (password !== confirmPassword) {
			toastWarn("As senhas devem ser iguais!");
		} else {
			cadastrarUser();
		}
	}

	async function cadastrarUser() {
		await createUserWithEmailAndPassword(auth, email, password)
			.then((value) => {
				toastSucess("Usuario cadastrado com sucesso");
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
			.catch((error) => {
				console.log(error);
				toastError("Endereço de E-mail ja cadastrado");
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
		});
	}

	return (
		<section>
			<ToastContainer />
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
