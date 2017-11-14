console.log("Initializing...");
var userId;
var password;
userId = "hello";
password = "hola";

function borrartodo(){
    document.getElementById('userid').value = "";
}

function onClickRegister(){
    window.open("../template/register.html");
}

function onClickLogIn(){
    
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