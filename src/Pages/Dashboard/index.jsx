import ContainerTask from "../../components/ContainerTasks";
import CreateTasks from "../../components/CreateTasks";
import Header from "../../components/Header";
import "./index.css";

const Dashboard = () => {
	return (
		<div>
			<Header />
			<section className="tasks">
				<CreateTasks />
				<ContainerTask />
			</section>
		</div>
	);
};

export default Dashboard;
