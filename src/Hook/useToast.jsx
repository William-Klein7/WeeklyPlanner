import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const toastSucess = (text) => {
	toast.success(`${text}`, {
		position: "top-left",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark",
	});
};
const toastError = (text) => {
	toast.error(`${text}`, {
		position: "top-left",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark",
	});
};
const toastWarn = (text) => {
	toast.warn(`${text}`, {
		position: "top-left",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark",
	});
};

export { toastSucess, toastError, toastWarn };
