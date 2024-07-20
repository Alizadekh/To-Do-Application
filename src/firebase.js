import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC84sPRDAZbkqZtP71qDCKzxdTYR89PW8g",
  authDomain: "todochallenge-5ceea.firebaseapp.com",
  databaseURL: "https://todochallenge-5ceea-default-rtdb.firebaseio.com",
  projectId: "todochallenge-5ceea",
  storageBucket: "todochallenge-5ceea.appspot.com",
  messagingSenderId: "883104790346",
  appId: "1:883104790346:web:5ec6a6b8437b4bacc6f3b3",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
