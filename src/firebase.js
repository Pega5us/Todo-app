import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAtHiawhUKkBAzC6YQbNX7whRnNK0FBkC4",
  authDomain: "todo-app-83a97.firebaseapp.com",
  databaseURL: "https://todo-app-83a97.firebaseio.com",
  projectId: "todo-app-83a97",
  storageBucket: "todo-app-83a97.appspot.com",
  messagingSenderId: "1073564687074",
  appId: "1:1073564687074:web:b79d74c4084d79bf529cbb",
  measurementId: "G-EV8WFLD84J"
});

const db = firebaseApp.firestore();

export default db;
