const firebaseConfig = {
    apiKey: "AIzaSyD6qPf6u7v4sTer6YsW2SykPDo-miKHz8w",
    authDomain: "todo-list-1ba2a.firebaseapp.com",
    databaseURL: "https://todo-list-1ba2a-default-rtdb.firebaseio.com",
    projectId: "todo-list-1ba2a",
    storageBucket: "todo-list-1ba2a.appspot.com",
    messagingSenderId: "381252466903",
    appId: "1:381252466903:web:43324d8f50d525d583d892",
    measurementId: "G-R61HXD0R88"
};
const App = firebase.initializeApp(firebaseConfig);
firebase.analytics(App);
firebase.firestore()
const db = firebase.firestore();