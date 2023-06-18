import "./index.css";
const ContainerTask = () => {
	return (
		<div>
			<div className="container-btns">
				<button id="monday" className="selected">
					Monday
				</button>
				<button id="tuesday">Tuesday</button>
				<button id="wednesday">Wednesday</button>
				<button id="thursday">Thursday</button>
				<button id="friday">Friday</button>
				<button id="saturday">Saturday</button>
				<button id="sunday">Sunday</button>
			</div>
			<div className="container-time">
				<div>
					<h1>Time</h1>
				</div>
			</div>
			<div className="container-task">
				<div className="box-cards">
					<div className="card-line">
						<div className="container-time-task">
							<div>
								<h2>10h30m</h2>
							</div>
						</div>
						<div className="card">
							<div></div>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
								quia, laborum aliquam sint mollitia iste molestiae a amet beatae
							</p>
							<button>Delete</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContainerTask;
