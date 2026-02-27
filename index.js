// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  push,
  set,
  onValue,
  onChildAdded,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDeQT9TDL4QnpPWKs4RaCkhK4HNFSF4nas",
    authDomain: "humberdemo-b500c.firebaseapp.com",
    projectId: "humberdemo-b500c",
    storageBucket: "humberdemo-b500c.firebasestorage.app",
    messagingSenderId: "233418945440",
    appId: "1:233418945440:web:5419c55595ff70b41aeac5"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase();

const messages = ref(database, "/messages");

// onChildAdded
onChildAdded(
  messages,
  (snapshot) => {

    let ul = document.getElementById("messages");
    // ul.replaceChildren();

    // snapshot.forEach((childSnapshot) => {

      const childKey = snapshot.key;   
      const childData = snapshot.val();

      // console.log(childKey);
      // console.log(childData.name);

      let li = document.createElement("li");

      let text = document.createTextNode(
        childData.message + " ~ " + childData.name
      );

      li.appendChild(text);
      ul.appendChild(li);
            
    // });

  }
);

const add = document.getElementById("add");

add.addEventListener("click", function(){

    let name = document.getElementById("name");
    let message = document.getElementById("message");

    let newMessage = push(messages);

    set(
      newMessage,
      {
        name: name.value,
        message: message.value,
        date: serverTimestamp()
      }
    );

});