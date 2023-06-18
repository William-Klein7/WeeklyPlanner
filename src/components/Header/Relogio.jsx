import { useState, useEffect } from "react";

const Relogio = () => {
	const [hora, setHora] = useState("");
	const [minutos, setMinutos] = useState("");

	useEffect(() => {
		function atualizarHora() {
			const dataAtual = new Date();
			const horas = dataAtual.getHours();
			const minutos = dataAtual.getMinutes();

			setHora(horas.toString().padStart(2, "0"));
			setMinutos(minutos.toString().padStart(2, "0"));
		}

		atualizarHora();

		const intervalo = setInterval(atualizarHora, 10000);
		return () => clearInterval(intervalo);
	}, [minutos, hora]);
	return <h1>{hora + ":" + minutos}</h1>;
};

export default Relogio;
