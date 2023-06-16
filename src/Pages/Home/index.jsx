import "./index.css";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/Background-image.png";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FirebaseConection";
import { useState } from "react";
import { toastError } from "../../Hook/toast";
import Modal from "../../components/Modal";

const Home = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [modal, setModal] = useState(false);
	const navigate = useNavigate();

	async function handleLogIn(e) {
		e.preventDefault();
		await signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				navigate("/dashboard");
			})
			.catch(() => {
				toastError("Erro ao logar o Usuario");
				setTimeout(() => {
					setModal(true);
				}, 3000);
			});
	}

	return (
		<section>
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
								className="form-input"
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
								className="form-input"
							/>
							<label className="labelFloat" htmlFor="passwordId">
								<AiOutlineLock color="#E0E0E0" fontSize={"20px"} />
							</label>
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
