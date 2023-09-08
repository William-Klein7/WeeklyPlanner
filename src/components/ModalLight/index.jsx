/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { AiOutlineCloseCircle } from "react-icons/ai";
import { db } from "../../FirebaseConection";
import { doc, deleteDoc } from "firebase/firestore";

const background_modal = {
	position: "fixed",
	top: "0",
	bottom: "0",
	left: "0",
	right: "0",
	backgroundColor: "rgb(0,0,0,0.7)",
	zIndex: "500",
};
const modal_container = {
	width: "1000px",
	height: "600px",
	position: "absolute",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	alignItens: "center",
	top: "50%",
	left: "50%",
	transform: "translate(-50%,-50%)",
	background: "#FFF",
	borderRadius: "50px",
	border: "none",
	padding: "80px",
	zIndex: "600",
};
const button_register = {
	width: "300px",
	height: "100px",
	textAlign: "center",
	background: "linear-gradient(90deg, #FF2D04 0%, #C13216 100%)",
	boxShadow: "inset 5px 5px 15px rgba(0, 0, 0, 0.15)",
	borderRadius: "50px",
	border: "none",
	color: "#e0e0e0",
	fontSize: "28px",
};
const button_yes = {
	width: "300px",
	height: "100px",
	textAlign: "center",
	boxShadow: "inset 5px 5px 15px rgba(0, 0, 0, 0.15)",
	backgroundColor: "transparent",
	borderRadius: "50px",
	border: "1px solid #3B3E45",
	color: "#3B3E45",
	fontSize: "28px",
};
const box_btns = {
	width: "100%",
	height: "auto",
	display: "flex",
	justifyContent: "space-around",
	alignItens: "center",
};
const btn_close = {
	width: "47px",
	height: "47px",
	position: "absolute",
	top: "20px",
	left: "92.5%",
	backgroundColor: "transparent",
	borderRadius: "50%",
	border: "none",
};
const h1 = {
	color: "#3B3E45",
	fontWeight: "600",
	fontSize: "25px",
	textAlign: "center",
	letterSpacing: "0.2em",
};

export default function ModalLight({ isOpen, setCloseModal }) {
	const lista = JSON.parse(localStorage.getItem("listaTask"));
	async function deleteTodasTask() {
		if (lista.length != 0) {
			for (let i = 0; i < lista.length; i++) {
				const element = lista[i];
				deleteDoc(doc(db, "tarefas", element.id));
			}
		}
	}

	if (isOpen) {
		return (
			<div style={background_modal}>
				<div style={modal_container}>
					<div>
						<h1 style={h1}>Do you want to delete all tasks?</h1>
					</div>
					<div style={box_btns}>
						<button style={button_yes} onClick={() => deleteTodasTask()}>
							Yes
						</button>
						<button style={button_register} onClick={setCloseModal}>
							No
						</button>
					</div>
					<button style={btn_close} onClick={setCloseModal}>
						<AiOutlineCloseCircle color="#e0e0e0" fontSize="50px" />
					</button>
				</div>
			</div>
		);
	}
	return null;
}
