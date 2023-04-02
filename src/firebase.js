import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBcKZsaYtshv5zDY8o_m0qFtNWvS6FC06A",
  authDomain: "analytics-table-79e80.firebaseapp.com",
  projectId: "analytics-table-79e80",
  storageBucket: "analytics-table-79e80.appspot.com",
  messagingSenderId: "478846600461",
  appId: "1:478846600461:web:72b01fc80f11e2935b1c44",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
