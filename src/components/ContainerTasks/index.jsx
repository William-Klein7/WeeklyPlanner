/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
	collection,
	where,
	onSnapshot,
	query,
	deleteDoc,
	doc,
} from "firebase/firestore";
import { db } from "../../FirebaseConection";
import "./index.css";
import { toastSucessLight, toastErrorLight } from "../../Hook/toasLight";

const ContainerTask = () => {
	const [selectedButton, setSelectedButton] = useState("Monday");
	const [bgColor, setBgColor] = useState("#FF0024");
	const [tarefas, setTarefa] = useState([]);
	const [user, setUser] = useState({});

	const sortItemsByHour = (items) => {
		return items.sort((a, b) => {
			const hourA = parseInt(a.hour.split("h")[0]);
			const minuteA = parseInt(a.hour.split(" ")[1].split("min")[0]);

			const hourB = parseInt(b.hour.split("h")[0]);
			const minuteB = parseInt(b.hour.split(" ")[1].split("min")[0]);

			if (hourA === hourB) {
				return minuteA - minuteB;
			}

			return hourA - hourB;
		});
	};

	const sortedItems = sortItemsByHour(tarefas);

	console.log(sortedItems);
	const occurrences = {};
	const repeatedItems = [];

	tarefas.forEach((item) => {
		if (occurrences[item.hour]) {
			repeatedItems.push(item);
		} else {
			occurrences[item.hour] = true;
		}
	});

	async function deleteTask(id) {
		const docRef = doc(db, "tarefas", id);
		await deleteDoc(docRef)
			.then(() => {
				toastSucessLight("Task deletada com sucesso");
			})
			.catch(() => {
				toastErrorLight("Erro ao deletar a task");
			});
	}

	useEffect(() => {
		async function loadTarefas() {
			const userDetail = localStorage.getItem("userLogado");
			setUser(JSON.parse(userDetail));
			if (userDetail) {
				const data = JSON.parse(userDetail);

				const tarefaRef = collection(db, "tarefas");
				const q = query(tarefaRef, where("uid", "==", data?.uid));

				const unsub = onSnapshot(q, (snapshot) => {
					let lista = [];

					snapshot.forEach((doc) => {
						lista.push({
							id: doc.id,
							taskDescription: doc.data().taskDescription,
							day: doc.data().day,
							hour: doc.data().hour,
							uid: doc.data().uid,
						});
					});
					setTarefa(lista);
				});
			}
		}

		loadTarefas();
	}, []);

	return (
		<div>
			<div className="container-btns">
				<button
					className={selectedButton === "Monday" ? "selected" : ""}
					id="Monday"
					onClick={() => {
						setBgColor("#FF0024");
						setSelectedButton("Monday");
					}}
				>
					Monday
				</button>
				<button
					className={selectedButton === "Tuesday" ? "selected" : ""}
					id="Tuesday"
					onClick={() => {
						setBgColor("#FF8000");
						setSelectedButton("Tuesday");
					}}
				>
					Tuesday
				</button>
				<button
					className={selectedButton === "Wednesday" ? "selected" : ""}
					id="Wednesday"
					onClick={() => {
						setBgColor("#FFCE00");
						setSelectedButton("Wednesday");
					}}
				>
					Wednesday
				</button>
				<button
					className={selectedButton === "Thursday" ? "selected" : ""}
					id="Thursday"
					onClick={() => {
						setBgColor("rgba(255, 0, 36, 0.7)");
						setSelectedButton("Thursday");
					}}
				>
					Thursday
				</button>
				<button
					className={selectedButton === "Friday" ? "selected" : ""}
					id="Friday"
					onClick={() => {
						setBgColor("rgba(255, 128, 0, 0.7)");
						setSelectedButton("Friday");
					}}
				>
					Friday
				</button>
				<button
					className={selectedButton === "Saturday" ? "selected" : ""}
					id="Saturday"
					onClick={() => {
						setBgColor("rgba(255, 206, 0, 0.7)");
						setSelectedButton("Saturday");
					}}
				>
					Saturday
				</button>
				<button
					className={selectedButton === "Sunday" ? "selected" : ""}
					id="Sunday"
					onClick={() => {
						setBgColor("rgba(255, 0, 36, 0.5)");
						setSelectedButton("Sunday");
					}}
				>
					Sunday
				</button>
			</div>
			<div className="container-time">
				<div>
					<h1>Time</h1>
				</div>
			</div>
			<div className="container-task">
				<div className="box-cards">
					{sortedItems.map(
						(items) =>
							selectedButton === items.day && (
								<div className="card-line" key={items.id}>
									<div className="container-time-task">
										<div style={{ background: bgColor }}>
											<h2>{items.hour}</h2>
										</div>
									</div>
									{sortedItems.some((task) => {
										task.hour === items.hour;
									})}
									<div className="card">
										<div style={{ background: bgColor }}></div>
										<p>{items.taskDescription}</p>
										<button onClick={() => deleteTask(items.id)}>Delete</button>
									</div>
								</div>
							)
					)}
				</div>
			</div>
		</div>
	);
};

export default ContainerTask;
