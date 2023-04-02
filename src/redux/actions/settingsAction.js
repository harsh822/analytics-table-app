import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from ".././../firebase.js";
export const getSettingsFromDB = createAsyncThunk("settings", async () => {
  const querysnapshot = await getDocs(collection(db, "settings"));
  const newData = querysnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  delete newData[0].id;
  console.log("newData", newData[0], typeof newData[0], newData[0].length);
  return Object.values(newData[0]);
});
