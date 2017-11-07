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

//var timeFinished = new Time();
var chart;
var pointsCounter = [0, 0];
var newText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Itaque hic ipse iam pridem est reiectus; Parvi enim primo ortu sic iacent, tamquam omnino sine animo sint. Portenta haec esse dicit, neque ea ratione ullo modo posse vivi; Maximus dolor, inquit, brevis est" 
//Duo Reges: constructio interrete. Falli igitur possumus. Sed potestne rerum maior esse dissensio? Quid, quod res alia tota est? Age, inquies, ista parva sunt. Conferam avum tuum Drusum cum C. Age, inquies, ista parva sunt. Cyrenaici quidem non recusant; Expectoque quid ad id, quod quaerebam, respondeas. Inde sermone vario sex illa a Dipylo stadia confecimus. Graecum enim hunc versum nostis omnes-: Suavis laborum est praeteritorum memoria. Cur iustitia laudatur? Laboro autem non sine causa; Animi enim quoque dolores percipiet omnibus partibus maiores quam corporis. Quacumque enim ingredimur, in aliqua historia vestigium ponimus. Inde igitur, inquit, ordiendum est.Quis suae urbis conservatorem Codrum, quis Erechthei filias non maxime laudat? Naturales divitias dixit parabiles esse, quod parvo esset natura contenta. At coluit ipse amicitias. Nihilo beatiorem esse Metellum quam Regulum. Prioris generis est docilitas, memoria; Sint modo partes vitae beatae. Nos quidem Virtutes sic natae sumus, ut tibi serviremus, aliud negotii nihil habemus.

var dps = [{x: 1, y: 10}, {x: 2, y: 13}, {x: 3, y: 18}, {x: 4, y: 20}, {x: 5, y: 17},{x: 6, y: 10}, {x: 7, y: 13}, {x: 8, y: 18}, {x: 9, y: 20}, {x: 10, y: 17}];

function CreateChart(){


    var chart = new CanvasJS.Chart("chartContainer",{
        title :{
            text: "Live Data"
        },
        axisX: {						
            title: "Axis X Title"
        },
        axisY: {						
            title: "Units"
        },
        data: [{
            type: "line",
            dataPoints : dps
        }]
    });

    chart.render();
    var xVal = dps.length + 1;
    var yVal = 15;	
    var updateInterval = 10000000;

    var updateChart = function () {


        yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
        dps.push({x: xVal,y: yVal});

        xVal++;
        if (dps.length >  10 )
        {
            dps.shift();				
        }

        chart.render();		

        // update chart after specified time. 

    };

    setInterval(function(){updateChart()}, updateInterval);
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

function checkKeyPressed(e){

    //    timeFinished.setTime(5);
    var keynum;
    var index = getCaretPosition(document.getElementById("txtInput"));

    if(e.which){ // Netscape/Firefox/Opera
        keynum = e.which;
    }

    var key = String.fromCharCode(keynum);

    if (key.toLowerCase() == document.getElementById("elSpan").innerHTML[index].toLowerCase()) {

        document.getElementById("elSpan").setAttribute("style", "color : green");
        pointsCounter[0] += 1;
        //        dataPoints.push({x: xValue++ ,y: yValue++});
        //        timeFinished.getTime();

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
        //        dataPoints.push({x: ++,y: yValue-1});
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