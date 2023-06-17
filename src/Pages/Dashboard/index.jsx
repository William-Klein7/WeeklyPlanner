import CreateTasks from "../../components/CreateTasks";
import Header from "../../components/Header";
import "./index.css";

const Dashboard = () => {
	return (
		<div>
			<Header />
			<section className="tasks">
				<CreateTasks />
			</section>
		</div>
	);
};

export default Dashboard;
