// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyCIpLadPZyHTQcmzxsV7bHRxMenWfXH0MM",
  authDomain:"canba-d4151.firebaseapp.com",
  projectId:"canba-d4151",
  storageBucket:"canba-d4151.appspot.com",
  messagingSenderId:"845206158209",
  appId:"1:845206158209:web:97a9a00c1b7f481c4f8680"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
