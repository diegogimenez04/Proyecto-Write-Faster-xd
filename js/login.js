console.log("Initializing...");

var config = {
            apiKey: "AIzaSyD7gFInlF1O98jKXhvwJEHRhNuDPMhuux8",
            authDomain: "write-faster-net.firebaseapp.com",
            databaseURL: "https://write-faster-net.firebaseio.com",
            projectId: "write-faster-net",
            storageBucket: "write-faster-net.appspot.com",
            messagingSenderId: "333583171425"
        };

var user = {
	this.user: document.getElementById('usrR').innerHTML,
	this.psw: document.getElementById('pswR').innerHTML,
	this.mail: document.getElementById('mailR').innerHTML,
};


function onClickRegister(){
	config.createUser(user, function(error)) = {
		user: document.getElementById('usrR').innerHTML,
		psw: document.getElementById('pswR').innerHTML,
		mail: document.getElementById('mailR').innerHTML,
	};
	if(error){
		console.log(error);
	}else{
		console.log("usuario registrado");
	}
    // userid.push(document.getElementById('usrR').innerHTML);
    // password.push(document.getElementById('pswR').innerHTML);
    // mail.push(document.getElementById('mailR').innerHTML);
    window.open("../template/index.html");
    console.log("Agregados usuario " + userid + " contraseña " + password + " y mail " + mail);
}

function onClickLogIn(){
    
}

function OnCancel(){
	document.getElementById('lg01').style.display='none';
}

var modal = document.getElementById('id01');
var modelLogIn = document.getElementById('lg01');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        } else if (event.target == modelLogIn){
          modalLogin.style.display = "none";
        }
    }

//function check(form) { /*function to check userid & password*/
//    /*the following code checkes whether the entered userid and password are matching*/
//    if( form.userid.value.toLowerCase() == userId && form.pswrd.value.toLowerCase() == password
//      ) {
//        window.open('index.html');/*opens the target page while Id & password matches*/
//    }
//    else if (document.getElementById('userid') != userId){
//        alert("Error Username");/*displays error message*/
//    } else if(form.pswrd.value != password){
//        console.log("Messsi")
//    }
//}
firebase.initializeApp(config);