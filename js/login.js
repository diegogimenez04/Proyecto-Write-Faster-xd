var config = {
  apiKey: "AIzaSyD7gFInlF1O98jKXhvwJEHRhNuDPMhuux8",
  authDomain: "write-faster-net.firebaseapp.com",
  databaseURL: "https://write-faster-net.firebaseio.com",
  projectId: "write-faster-net",
  storageBucket: "write-faster-net.appspot.com",
  messagingSenderId: "333583171425"
};

var t;
var sc;

function signOut(argument) {

  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log("Succesfull")
  }).catch(function(error) {
    // An error happened.
    console.log("An error happened")
  });

}

function signIn(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
  
  var name = document.createElement('TEXT');
  var txtSc = document.createElement('TEXT')
  t = document.createTextNode(email);
  sc = document.createTextNode(score);
  name.appendChild(t);
  
}



function initAuthentication() {

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid; 
      var providerData = user.providerData;
      console.log("Signed in user(email): " + email);
      // ...
    }

  });

}

function registerEmailPassword(email, password) {
  
  email = document.getElementById("txfEmail").value;
  password = document.getElementById("txfPassw").value;
  
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...

    console.error(errorCode, errorMessage);

  });

}

function mygoogle() {

  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...

  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...

    console.log(errorCode);

  });

}

if (mygoogle == true){
    document.getElementById('upBarWithLogIn').appendChild(name);
    document.getElementById('upBarWithLogIn').appendChild(txtSc);
    document.getElementById('upBarWithLogIn').removeChild(btnLoginGoogle);
    document.getElementById('upBarWithLogIn').removeChild(btnLoginPage);
    document.getElementById('upBarWithLogIn').removeChild(btnRegisterPage);
}

firebase.initializeApp(config);

initAuthentication();