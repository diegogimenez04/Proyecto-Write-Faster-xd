console.log('Ejecutando javascript...');

var newText = ""
var possible = "abcdefghijklmnopqrstuvwxyz";
var textAray;
//var randomIzeNumber = Math.random(10, 40);

$.ajax({
    url: "http://www.randomtext.me/api/lorem/p-1/5-9",
    type: "GET",
    datatype: 'json',
    success: function(data) {
        console.log(JSON.stringify(data));
        console.log("Todo ok");
        newText += data.text_out;
        newText = newText.slice(15, -6)
        initNewGame(newText);
    },
    error: function(e){
        alert(JSON.stringify(e));
    },
})

var avereage;
var sc;

/**ABCDEFGHIJKLMNOPQRSTUVWXYZ
var contador = 0;
var numero = 200
for (var i = 0; i <= numero; i++){
    newText += possible.charAt(Math.floor(Math.random() * possible.length));
    contador += 1;
    if (contador == 5 && i < numero){
        contador = 0
        newText += " "
    }
}**/

//var timeFinished = new Time();
var chart;
var pointsCounter = [0, 0];

xVal = 1;
yVal = 1;

var dps = [{x: 0, y: 0}];
$(function() {

    CreateChart();
});


function CreateChart(){

    var chart = new CanvasJS.Chart("chartContainer",{
        title :{
            text: "Grafico"
        },
        axisX: {
            title: "Eje X"
        },
        axisY: {
            title: "Promedio"
        },
        data: [{
            type: "line",
            dataPoints : dps
        }]
    });

    chart.render();
    var updateInterval = console.timeEnd("checkKeyPressed");
}

var pointsCounter = 0;

/*
** Returns the caret (cursor) position of the specified text field.
** Return value range is 0-oField.value.length.
*/
function getCaretPosition (oField) {

    //Finalizado
    // Inicializamos
    var iCaretPos = 0;

    // IE
    if (document.selection) {

        // Focuseamos el elemento
        oField.focus();

        // Getear el cursor por medio de una posicion
        var oSel = document.selection.createRange();

        // Mover la seleccion de vuelta a 0
        oSel.moveStart('character', -oField.value.length);

        // La caret posicion es igual al largo
        iCaretPos = oSel.text.length;
    }

    // Codigo de firefox
    else if (oField.selectionStart || oField.selectionStart == '0')
        iCaretPos = oField.selectionStart;

    // Return resultados
    return iCaretPos;

}

var correct = (pointsCounter[0] - pointsCounter[1]);
sc = correct*100;

function checkKeyPressed(e){

    //    timeFinished.setTime(5);
    var keynum;
    var index = getCaretPosition(document.getElementById("txtInput"));

    if(e.which){ // Netscape/Firefox/Opera
        keynum = e.which;
        console.log(keynum);
    }

    var key = String.fromCharCode(keynum);
    console.log(key);
    console.log (keynum);

    var arrayNumNotAllowed = [8, 225, 17, 9, 16, 18, 17, 20, 37, 38, 39, 40];
    var count = true;

    for(var i = 0; i < arrayNumNotAllowed.length; i++){
        if (arrayNumNotAllowed[i] == keynum){count = false}
    }
    console.log(parseInt(keynum));
    console.log(count);
    if(count==false){
        console.log("esta usando una letra invalida");
        sc = sc -100;
    }
    else{
        if (key.toLowerCase() == document.getElementById("elSpan").innerHTML[index].toLowerCase()) {

            pointsCounter[0] += 1;
            sc = correct*100;
            document.getElementById('lblScore').innerHTML = sc;
            document.getElementById("elSpan").setAttribute("style", "color : green");
            correct = (pointsCounter[0] - pointsCounter[1]);
            avereage = (correct/pointsCounter[0])*100;
            //            avereage = avereage.parseInt();
            document.getElementById('lblAvereage').innerHTML = "Your avereage is " + avereage + " % of correct words";
            xVal++;
            yVal++;
            dps.push({x: xVal, y: yVal});
            CreateChart();
            console.log(key.toLowerCase(), " ", document.getElementById("elSpan").innerHTML[index].toLowerCase());


            console.log(document.getElementById("txtInput").value.toLowerCase(), " ", document.getElementById("elSpan").innerHTML.toLowerCase());

            if ((document.getElementById("txtInput").value.toLowerCase() + key.toLowerCase()) == document.getElementById("elSpan").innerHTML.toLowerCase()) {

                console.log("You win");
                document.getElementById('elSpan').innerHTML = "";
                pointsCounter[0] += 1;
                finishCurrentGame();

            }

        } else {
            pointsCounter[1] += 1;
            sc = correct*100;
            document.getElementById('lblScore').innerHTML = sc;
            document.getElementById("elSpan").setAttribute("style", "color : red");
            correct = (pointsCounter[0] - pointsCounter[1]);
            avereage = (correct/pointsCounter[0])*100;
            //            avereage = avereage.parseInt();
            document.getElementById("lblAvereage").innerHTML = "Your avereage is "+ avereage + " % hitted";
            xVal++;
            yVal = yVal - 1;
            dps.push({x: xVal,y: yVal});
            CreateChart();
        }
    }

}

function initNewGame(sentence) {

    pointsCounter = [0, 0];
    var lblSentenceDisplayer = document.getElementById('elSpan');
    lblSentenceDisplayer.innerHTML = sentence;
}

function finishCurrentGame() {
    
    document.getElementById("txtInput").value = "";

    pointsCounter = [0, 0];
    window.alert("Le pegaste a " + avereage + "% letras");
    if (sc > score){
        $("#ull").html("");
        $("#ull").append("Congratulation " + name + " your new highscrore is " + sc);
        var user = firebase.auth().currentUser;
        if (user) {
          firebase.database().ref(user.uid).set(sc);
        }
    }
//    else{
//        $("#ull").html("");
//        $("#ull").append("Welcome " + name + " your hiscorescrore still being " + score);
//    }

    $(".elSpan").text("");
    $("#txtInput").val(null);
    return avereage;

}

//var scores=[];
//var numScores = 0;
//
//if (finishCurrentGame()){
//    scores.push(numScores + " " + avereage);
//    numScores++;
//    console.log("anda gController");
//}
