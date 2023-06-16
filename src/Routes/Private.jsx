/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { auth } from "../FirebaseConection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
function Private({ children }) {
	const [loading, setLoading] = useState(true);
	const [signed, setSigned] = useState(false);

	useEffect(() => {
		async function checkLogin() {
			const ver = onAuthStateChanged(auth, (user) => {
				if (user) {
					const userData = {
						uid: user.uid,
						email: user.email,
					};
					localStorage.setItem("userLogado", JSON.stringify(userData));
					setLoading(false);
					setSigned(true);
				} else {
					setLoading(false);
					setSigned(false);
				}
			});
		}

		checkLogin();
	});
	if (loading) {
		return <div></div>;
	}
	if (!signed) {
		return <Navigate to="/" />;
	}
	return children;
}

export default Private;
