import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getStorage, ref as fireStorageRef } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCNxKlCFIpHmyyyCfb7FWorhMaxwXvVs30",
  authDomain: "soundest-95e52.firebaseapp.com",
  projectId: "soundest-95e52",
  storageBucket: "soundest-95e52.appspot.com",
  messagingSenderId: "246221281013",
  appId: "1:246221281013:web:1f95f814e454bdb1d317bc",
  measurementId: "G-488SFBQ21Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const db = getDatabase(app)
export const dbRef = (path: string) => ref(db, path)
export const storageRef = (path: string) => fireStorageRef(storage, path)