/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { auth, db } from "../FirebaseConection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
function Private({ children }) {
	const [loading, setLoading] = useState(true);
	const [signed, setSigned] = useState(false);

	useEffect(() => {
		async function checkLogin() {
			const ver = onAuthStateChanged(auth, async (user) => {
				if (user) {
					let userInfo = await getDoc(doc(db, "users", user.uid));
					let data = userInfo.data();
					const userData = {
						uid: user.uid,
						data,
					};
					console.log(userData);
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
