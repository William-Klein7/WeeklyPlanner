import "./index.css";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/Background-image.png";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FirebaseConection";
import { useState } from "react";
import { toastError, toastWarn } from "../../Hook/toast";
import Modal from "../../components/Modal";

const Home = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [modal, setModal] = useState(false);
	const [passwordError, setPasswordError] = useState("");
	const navigate = useNavigate();

	async function handleLogIn(e) {
		e.preventDefault();
		if (email === "" || password == "") {
			setPasswordError("");
			toastWarn("Preencha todos os campos");
		} else {
			await signInWithEmailAndPassword(auth, email, password)
				.then(() => {
					navigate("/dashboard");
					setPasswordError("");
				})
				.catch((error) => {
					if (error.code === "auth/wrong-password") {
						console.log(error.code);
						setPasswordError(
							"Wow, invalid username or password. Please, try again!"
						);
					} else if (error.code === "auth/user-not-found") {
						console.log(error.code);
						setPasswordError("");
						toastError("Usuario não encontrado");
						setTimeout(() => {
							setModal(true);
						}, 3000);
					}
				});
		}
	}

	return (
		<section className="login">
			<Modal isOpen={modal} setCloseModal={() => setModal(!modal)} />
			<div className="container-login">
				<div className="box-login">
					<div className="box-title-login">
						<h1>Welcome,</h1>
						<h2>To continue browsing safely, log in to the network.</h2>
					</div>
					<form className="form-login" onSubmit={handleLogIn}>
						<h2>Login</h2>
						<div className="box-input-login">
							<input
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								id="userId"
								className={
									passwordError != ""
										? "form-input form-inptut-error"
										: "form-input"
								}
							/>
							<label className="labelFloat" htmlFor="userId">
								<AiOutlineUser color="#E0E0E0" fontSize={"20px"} />
							</label>
						</div>
						<div className="box-input-login">
							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								id="passwordId"
								className={
									passwordError != ""
										? "form-input form-inptut-error"
										: "form-input"
								}
							/>
							<label className="labelFloat" htmlFor="passwordId">
								<AiOutlineLock color="#E0E0E0" fontSize={"20px"} />
							</label>
						</div>
						{passwordError != "" && <p>{passwordError}</p>}
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
