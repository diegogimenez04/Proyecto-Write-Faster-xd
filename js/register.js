console.log("Esta funcionando el register");

var user;
var psword;

var arrayUser = [];
var arrayPsword = [];

function register(){

    user = document.getElementById('txfNewUsuario').value;
    psword = document.getElementById('txfNewContraseña').value;

    arrayUser.push(user);
    arrayPsword.push(psword);
    console.log("usuario y password agregados");
    console.log("Usuarios: " + arrayUser + " Passwords: " +arrayPsword)

}