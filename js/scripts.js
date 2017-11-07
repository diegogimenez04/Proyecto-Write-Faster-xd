console.log('Ejecutando javascript...');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD7gFInlF1O98jKXhvwJEHRhNuDPMhuux8",
  authDomain: "write-faster-net.firebaseapp.com",
  databaseURL: "https://write-faster-net.firebaseio.com",
  projectId: "write-faster-net",
  storageBucket: "",
  messagingSenderId: "333583171425"
};

var chart;
var pointsCounter = [0, 0];
var newText = "Hola me llamo diego";
var avereage;
var pointsCounter = 0;

function generarGrafico() {

  var dataPoints = [];

  chart = new CanvasJS.Chart("chartContainer", {
    theme: "light2",
    title: {
      text: "Live Data"
    },
    data: [{
      type: "line",
      dataPoints: dataPoints
    }]
  });
  updateData();

  // Initial Values
  var xValue = 0;
  var yValue = 10;
  var newDataCount = document.getElementById("elSpan").innerHTML.length;

  function addData(data) {
    if(newDataCount != 1) {
      $.each(data, function(key, value) {
        dataPoints.push({x: value[0], y: parseInt(pointsCounter[0])});
        xValue++;
        yValue = parseInt(pointsCounter[0]);
      });
    } else {
      dataPoints.shift();
      dataPoints.push({x: data[0][0], y: parseInt(data[0][1])});
      xValue++;
      yValue = parseInt(data[0][1]);
    }

    newDataCount = 1;
    chart.render();
  }

  function updateData() {
    
    $.getJSON("xstart="+xValue+"&ystart="+yValue+"&length="+newDataCount+"type=json", addData);
  }

}

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

function checkKeyPressed(e){

  var keynum;
  var index = getCaretPosition(document.getElementById("txtInput"));

  if(window.event) { // IE
    keynum = e.keyCode;
  } else if(e.which){ // Netscape/Firefox/Opera
    keynum = e.which;
  }

  var key = String.fromCharCode(keynum);

  if (key.toLowerCase() == document.getElementById("elSpan").innerHTML[index].toLowerCase()) {

    document.getElementById("elSpan").setAttribute("style", "color : green");
    pointsCounter[0] += 1;

    console.log(key.toLowerCase(), " ", document.getElementById("elSpan").innerHTML[index].toLowerCase());


    console.log(document.getElementById("txtInput").value.toLowerCase(), " ", document.getElementById("elSpan").innerHTML.toLowerCase());

    if ((document.getElementById("txtInput").value.toLowerCase() + key.toLowerCase()) == document.getElementById("elSpan").innerHTML.toLowerCase()) {

      console.log("You win");
      document.getElementById('elSpan').innerHTML = "";
      pointsCounter[0] += 1;
      finishCurrentGame();

    }

  } else {
    document.getElementById("elSpan").setAttribute("style", "color : red");
    pointsCounter[1] += 1;
  }


}

function initNewGame(sentence) {

  pointsCounter = [0, 0];
  var lblSentenceDisplayer = document.getElementById('elSpan');
  lblSentenceDisplayer.innerHTML = sentence;

}

function finishCurrentGame() {

  avereage = ((pointsCounter[0] - pointsCounter[1]) * 100) / document.getElementById("elSpan").innerHTML.length
  if (avereage < 0) {

    avereage = 0;

  } else if(avereage>100){

    avereage = 100;

  }

  document.getElementById("txtInput").value = "";
  window.alert("Le pegaste a " + avereage + "% letras");
  document.getElementById("elSpan").innerHTML = "";
  pointsCounter = [0, 0];
  return avereage;

}
firebase.initializeApp(config);