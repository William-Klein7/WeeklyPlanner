import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDEJfqrYZHCr-9BhM-DesPCZFaTfrPe310",
	authDomain: "planner-cbac5.firebaseapp.com",
	projectId: "planner-cbac5",
	storageBucket: "planner-cbac5.appspot.com",
	messagingSenderId: "610561623172",
	appId: "1:610561623172:web:152ffe76cd7c68ca5aeed1",
	measurementId: "G-1FRPB0YQ5P",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
