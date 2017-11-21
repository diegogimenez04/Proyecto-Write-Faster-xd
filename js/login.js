var config = {
  apiKey: "AIzaSyD7gFInlF1O98jKXhvwJEHRhNuDPMhuux8",
  authDomain: "write-faster-net.firebaseapp.com",
  databaseURL: "https://write-faster-net.firebaseio.com",
  projectId: "write-faster-net",
  storageBucket: "write-faster-net.appspot.com",
  messagingSenderId: "333583171425"
};

var name;
var score;
//var logout = document.createElement('BUTTON');
//var t = document.createTextNode("Salir de cuenta")
//logout.appendChild(t);
//logou.onclick(signOut());

function signOut(argument) {

  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log("Succesfull")
  }).catch(function(error) {
    // An error happened.
    console.log("An error happened")
  });

}

//function signIn(email, password) {
//
//  $("#ull").html("");
//  name = user;
//  var sc = 1;
//  $("#ull").append("Welcome " + name + " your scrore is " + sc + logout);
//
//  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
//    // Handle Errors here.
//    var errorCode = error.code;
//    var errorMessage = error.message;
//    // ...
//  });
//}



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
      name = user.displayName;
    }

  });

}

//function registerEmailPassword(email, password) {
//
//  $("#ull").html("");
//  var sc = 1;
//  $("#ull").append("Welcome " + name + " your scrore is " + sc);
//  document.getElementById("ull").setAttribute("style", "color : white");
//
//  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//    // Handle Errors here.
//    var errorCode = error.code;
//    var errorMessage = error.message;
//    // ...
//
//    console.error(errorCode, errorMessage);
//
//  });
//}

function mygoogle() {

  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    initAuthentication();
    console.log(user);
    firebase.database().ref(user.uid).once('value').then(function(snapshot) {
      score = snapshot.val();
      if (score === null){
        score = 0;
        firebase.database().ref(user.uid).set(score);
      }
      $("#ull").html("");
      $("#ull").append("Welcome " + name + " your hiscore is " + score);
      document.getElementById("ull").setAttribute("style", "color : white");
    });


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

firebase.initializeApp(config);

initAuthentication();