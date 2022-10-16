// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWyiANBGPSJpHeWPzTIjYCGBJuiF8XaVs",
  authDomain: "test-project-rn-58093.firebaseapp.com",
  databaseURL: "https://test-project-rn-58093-default-rtdb.firebaseio.com",
  projectId: "test-project-rn-58093",
  storageBucket: "test-project-rn-58093.appspot.com",
  messagingSenderId: "928395482439",
  appId: "1:928395482439:web:76437c83def3af80392862"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)