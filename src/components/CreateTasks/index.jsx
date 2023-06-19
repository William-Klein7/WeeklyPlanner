import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../FirebaseConection";
import {
	toastSucessLight,
	toastWarnLight,
	toastErrorLight,
} from "../../Hook/toasLight";
import "./index.css";
const CreateTasks = () => {
	const [selectDay, setSelectDay] = useState("");
	const [selectHours, setSelectHours] = useState("");
	const [task, setTask] = useState("");

	async function handleTask(e) {
		e.preventDefault();
		if (selectDay === "" || selectHours === "" || task === "") {
			toastWarnLight("Preencha todos os campos antes de adicionar uma task");
		} else {
			const user = JSON.parse(localStorage.getItem("userLogado"));
			console.log(user);
			const taskRef = collection(db, "tarefas");
			await addDoc(taskRef, {
				taskDescription: task,
				day: selectDay,
				hour: selectHours,
				uid: user.uid,
			})
				.then(() => {
					toastSucessLight("Tarefa cadastrada com sucesso");
					setTask("");
				})
				.catch(() => {
					toastErrorLight("Erro ao cadastrar a tarefa");
				});
		}
	}

	return (
		<section className="create-task">
			<form onSubmit={handleTask}>
				<div>
					<input
						type="text"
						name="text"
						id="descriptionId"
						placeholder="Task or issue"
						value={task}
						onChange={(e) => setTask(e.target.value)}
					/>
					<select
						name="day"
						id="dayId"
						value={selectDay}
						onChange={(e) => setSelectDay(e.target.value)}
					>
						<option value="Monday">Monday</option>
						<option value="Tuesday">Tuesday</option>
						<option value="Wednesday">Wednesday</option>
						<option value="Thursday">Thursday</option>
						<option value="Friday">Friday</option>
						<option value="Saturday">Saturday</option>
						<option value="Sunday">Sunday</option>
					</select>
					<select
						name="hours"
						id="hoursId"
						value={selectHours}
						onChange={(e) => setSelectHours(e.target.value)}
					>
						<option value="0h 00min">0h 00min</option>
						<option value="0h 30min">0h 30min</option>
						<option value="1h 00min">1h 00min</option>
						<option value="1h 30min">1h 30min</option>
						<option value="2h 00min">2h 00min</option>
						<option value="2h 30min">2h 30min</option>
						<option value="3h 00min">3h 00min</option>
						<option value="3h 30min">3h 30min</option>
						<option value="4h 00min">4h 00min</option>
						<option value="4h 30min">4h 30min</option>
						<option value="5h 00min">5h 00min</option>
						<option value="5h 30min">5h 30min</option>
						<option value="6h 00min">6h 00min</option>
						<option value="6h 30min">6h 30min</option>
						<option value="7h 00min">7h 00min</option>
						<option value="7h 30min">7h 30min</option>
						<option value="8h 00min">8h 00min</option>
						<option value="8h 30min">8h 30min</option>
						<option value="9h 00min">9h 00min</option>
						<option value="9h 30min">9h 30min</option>
						<option value="10h 00min">10h 00min</option>
						<option value="10h 30min">10h 30min</option>
						<option value="11h 00min">11h 00min</option>
						<option value="11h 30min">11h 30min</option>
						<option value="12h 00min">12h 00min</option>
						<option value="12h 30min">12h 30min</option>
						<option value="13h 00min">13h 00min</option>
						<option value="13h 30min">13h 30min</option>
						<option value="14h 00min">14h 00min</option>
						<option value="14h 30min">14h 30min</option>
						<option value="15h 00min">15h 00min</option>
						<option value="15h 30min">15h 30min</option>
						<option value="16h 00min">16h 00min</option>
						<option value="16h 30min">16h 30min</option>
						<option value="17h 00min">17h 00min</option>
						<option value="17h 30min">17h 30min</option>
						<option value="18h 00min">18h 00min</option>
						<option value="18h 30min">18h 30min</option>
						<option value="19h 00min">19h 00min</option>
						<option value="19h 30min">19h 30min</option>
						<option value="20h 00min">20h 00min</option>
						<option value="20h 30min">20h 30min</option>
						<option value="21h 00min">21h 00min</option>
						<option value="21h 30min">21h 30min</option>
						<option value="22h 30min">22h 30min</option>
						<option value="23h 00min">23h 00min</option>
						<option value="23h 30min">23h 30min</option>
					</select>
				</div>
				<div>
					<button type="submit" id="addId">
						+ Add to calendar
					</button>
					<button id="deleteId">- Delete All</button>
				</div>
			</form>
		</section>
	);
};

export default CreateTasks;
