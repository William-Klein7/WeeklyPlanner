import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const toastSucessLight = (text) => {
	toast.success(`${text}`, {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
	});
};
const toastErrorLight = (text) => {
	toast.error(`${text}`, {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
	});
};
const toastWarnLight = (text) => {
	toast.warn(`${text}`, {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
	});
};

export { toastSucessLight, toastErrorLight, toastWarnLight };
