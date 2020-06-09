// =========================VARIABLES DECLARATION=========================
// Numeric Variables
var beat = 0;
var escflag = 0;
var latency = 50;
var loadTime = 100;
var mcm = 1;
var mcmDen = 1;
var strlun = 15;
//Vectors
var archi = [];
var audioi = []; //audio informations
var beats = [];
var colors = [];
var circles = [];
var cicloTxt = []; //single function for eval
var ciclone = []; //sum of single functions for eval
var denominatori = [];
var docList = []; //Firebase elements
var dots = []; //metronome dots
var elstring = []; //loaded elements
var infostring = []; //informations to visualize in the lateral panel
var myLoop = []; //single loop
var tempo = [];
var numeratori = [];
var TemLoad = [];
//URL Da rinnovare dato che scade
var FireloadURL = "https://driveuploader.com/upload/DxdQnc5wqZ/";

//=========================ELEMENTS DEFINITION=========================
var audioCtx = new (window.AudioContext || webkitAudioContext)();
var bttn = document.querySelector(".record");
var canvas = document.querySelector(".visualizer");
var canvasCtx = canvas.getContext("2d");
var soundClips = document.querySelector(".sound-clips");
var myVar;
var spia = document.querySelector(".spia");
var mask = document.querySelector(".mask");
var ln = document.querySelector(".lancetta");
var slider = document.getElementById("myRange");
var slider2 = document.getElementById("Latency");
var output = document.getElementById("demo");
var outL = document.getElementById("demoL");
output.innerHTML = slider.value + " ms"; // Display the default slider value
outL.innerHTML = slider2.value + " ms";
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  output.innerHTML = this.value + " ms";
  loadTime = this.value;
};
slider2.oninput = function () {
  outL.innerHTML = this.value + " ms";
  latency = this.value;
};

//=========================GRAPHIC FUNCTIONS=========================
mask.onclick = function () {
  if (cont1.style.display == "block") {
    cont1.style = "display: none";
  } else {
    cont1.style = "display: block";
  }
};
function abilitazione() {
  if (audioi.length != 0) {
    xmlname3.disabled = true;
  } else {
    xmlname3.disabled = false;
  }
}
var rendabilita = setInterval(function () {
  abilitazione();
}, 500);

function brian(a, b) {
  if (beats.length == 0) {
    sar.style = "visibility: hidden;";
    return;
  }
  sar.style.visibility = "visible";
  sar.textContent = "";
  sar.textContent = a + "/" + b;
}

//Least common multiple
function gcd(a, b) {
  if (isNaN(a) || isNaN(b)) return "Must only enter numbers!";

  a = Math.abs(a);
  b = Math.abs(b);
  var r = 1; // remainder

  while (r != 0) {
    if (a > b) {
      var t = a; // temp
      a = b;
      b = t;
    }
    if (a == 0) return "Error : Cannot divide by 0!";

    r = b % a;
    console.log("a : " + a + " | b : " + b + " | r : " + r); /* Add Show Work */
    b = a;
    a = r != 0 ? r : a;
  }
  return a;
}

function lcmdue(a, b) {
  var gcdResult = gcd(a, b);
  if (isNaN(gcdResult)) return gcdResult;
  var lcmR = (a * b) / gcdResult;
  return lcmR;
}

function lcm(beatn) {
  lcmVector = new Array();
  lcmVector[0] = beatn[0];
  lcmVector[1] = beatn[1];
  beatn[beatn.length] = 1;
  for (i = 2; i < beatn.length; i++) {
    lcmVector[0] = lcmdue(lcmVector[0], lcmVector[1]);
    lcmVector[1] = beatn[i];
  }
  return lcmVector[0];
}

//Circles generation
function add_circle(arco, r, i) {
  el = document.createElement("div");
  el.classList.add("circle");
  station_container.prepend(el);
  el.style.width = r + "px";
  el.style.height = r + "px";
  el.style.top = "calc(50% - " + r / 2 + "px)";
  el.style.left = "calc(50% - " + r / 2 + "px)";
  // color assignment
  if (i < beats.length - 1) {
    //if track already exists use its color
    el.style.backgroundColor = "#" + colors[i];
  } else {
    //generate another random color
    var Rand = Math.random().toString(16).substr(2, 6);
    el.style.backgroundColor = "#" + Rand;
    colors[i] = Rand;
  }
  //sector width
  var s = Math.round((360 / arco) * 1000) / 1000;
  //sector creation
  if (arco == 360) {
    //el.style.backgroundColor = '#' + Rand;
  } else if (arco < 180) {
    var c = 90 + arco;
    el.style.backgroundImage =
      "linear-gradient(" +
      c +
      "deg, transparent 50%, white 50%), linear-gradient(90deg, white 50%, transparent 50%)";
  } else if (arco >= 180) {
    var c = 90 + arco;
    el.style.backgroundImage =
      "linear-gradient(" +
      c +
      "deg, transparent 50%, white 50%), linear-gradient(90deg, white 50%, transparent 50%)";
  }
  circles.push(el);
}

function reconstruct_circle(arco, r, i) {
  el = document.createElement("div");
  el.classList.add("circle");
  station_container.prepend(el);
  el.style.width = r + "px";
  el.style.height = r + "px";
  el.style.top = "calc(50% - " + r / 2 + "px)";
  el.style.left = "calc(50% - " + r / 2 + "px)";
  el.style.backgroundColor = "#" + colors[i];
  if (arco == 360) {
    el.style.backgroundColor = "#" + colors[i];
  } else if (arco < 180) {
    var c = 90 + arco;
    el.style.backgroundImage =
      "linear-gradient(" +
      c +
      "deg, transparent 50%, white 50%), linear-gradient(90deg, white 50%, transparent 50%)";
  } else if (arco >= 180) {
    var c = 90 + arco;
    el.style.backgroundImage =
      "linear-gradient(" +
      c +
      "deg, transparent 50%, white 50%), linear-gradient(90deg, white 50%, transparent 50%)";
  }
  circles.push(el);
}

function setup_circle() {
  for (i = 0; i < beats.length; i++) {
    el = station_container.querySelector(".circle");
    station_container.removeChild(el);
  }
  circles = [];
}

function estMcm(beats) {
  if (beats.length == 1) {
    var mcm = beats[0][0];
    mcmDen = beats[0][1];
    numeratori = mcm;
  } else {
    denominatori = [];

    for (i = 0; i < beats.length; i++) {
      denominatori.push(beats[i][1]);
    }

    mcmDen = lcm(denominatori);
    numeratori = [];
    for (i = 0; i < beats.length; i++) {
      numeratori.push((mcmDen / denominatori[i]) * beats[i][0]);
    }
    mcm = lcm(numeratori);
  }
  return mcm;
}

function get_data(num, den, N, bpm) {
  var ln = document.querySelector(".lancetta");
  var mask = document.querySelector(".mask");
  ln.style.animation = "";
  mask.style.animation = "";
  setup_circle();
  beats.push([num * N, den]);
  console.log(beats);
  mcm = estMcm(beats);
  brian(mcm, mcmDen);
  console.log("mcm è " + mcm);
  var r = 250;
  var h = 350;

  for (i = 0; i < beats.length; i++) {
    archi[i] = (numeratori[i] / mcm) * 360;
    r = r + 50;
    add_circle(archi[i], r, i);
    h = h + 50;
    var cont = station_container;
    cont.style.height = h + "px";
    var t = Math.round(((60 * 4 * mcm) / (bpm * mcmDen)) * 100) / 100;
    tempogen = t;
    ln.style.height = 125 + (i + 1) * 25 + "px";
  }
}

function rgbToHex(col) {
  if (col.charAt(0) == "r") {
    col = col.replace("rgb(", "").replace(")", "").split(",");
    var r = parseInt(col[0], 10).toString(16);
    var g = parseInt(col[1], 10).toString(16);
    var b = parseInt(col[2], 10).toString(16);
    r = r.length == 1 ? "0" + r : r;
    g = g.length == 1 ? "0" + g : g;
    b = b.length == 1 ? "0" + b : b;
    var colHex = r + g + b;
    return colHex;
  }
}

function getindex(e) {
  evtTgt = e.target;
  pointer = evtTgt.parentNode.style.backgroundColor;
  pointer_hex = rgbToHex(pointer);
  idx = colors.findIndex((colors) => colors == pointer_hex);
  return idx;
}

//==============================DATABASE===============================
// Get a reference to the database service
var firebaseConfig = {
  apiKey: "AIzaSyCyc8GfkSC1AHxrV_WQd8Gqi58lrHR9rKc",
  authDomain: "actamlab.firebaseapp.com",
  databaseURL: "https://actamlab.firebaseio.com",
  projectId: "actamlab",
  storageBucket: "actamlab.appspot.com",
  messagingSenderId: "260673144336",
  appId: "1:260673144336:web:0c6a16e5b788e2afc1ec95",
  measurementId: "G-FE4R2MVDDT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

//Load function
function salva(Nome) {
  IDaudio = new Array();
  LENaudio = new Array();
  Utili = new Array();
  var track = document.getElementById(Nome);
  var a = audioi.length;
  //devo scomporre i vettori perchè firestore non supporta vettori annidati
  for (i = 0; i < a; i++) {
    if (audioi[i][0].id == Nome) {
      IDaudio = audioi[i][0].id;
      LENaudio = audioi[i][1];
      Utili = audioi[i][3];
    }

    var docData = { NumDenNBPM: Utili, AudID: IDaudio, AudLEN: LENaudio };
    var docRef = db.collection("Audioi").doc(Nome);
    db.collection("Audioi")
      .doc(Nome)
      .set(docData)
      .then(function () {
        console.log("Document written");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }
}

//Download functions
function downInfo(el) {
  var tes = document.createElement("div");
  tes.classList.add("Info");
  tes.style =
    "text-size: 12px; color: black; position: relative; display: contents;";
  tes.textContent =
    "Click here to download, to share with other users and online storage. Load on drive in the window that will appear";
  container.appendChild(tes);
  el.onmouseout = function () {
    container.removeChild(tes);
  };
}

function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
}

function LoadData({ target }) {
  // Make sure we have files to use
  if (!target.files.length) return;
  // Create a blob that we can use as an src for our audio element
  for (i = 0; i < target.files.length; i++) {
    const urlObj = URL.createObjectURL(target.files[i]);
    console.log(target.files[i].name);
    var nome = target.files[i].name.slice(0, -4);
    if (document.getElementById(nome)) {
      var flagg = 0;
      for (j = 0; j < TemLoad.length; j++) {
        if (TemLoad[j][0] == nome) {
          flagg = 1;
        }
      }

      if (flagg == 0) {
        TemLoad.push([nome, urlObj]);
      }

      document.getElementById("audio-upload").style =
        "mix-blend-mode: color-burn;";
      document.getElementById(nome).style = "background: darkorchid;";
    } else {
      alert("The selected track is not in database!");
    }
  }
}

document.getElementById("audio-upload").addEventListener("change", LoadData);

function popola() {
  if (TemLoad.length == 0) {
    console.log("You haven't load datas!");
    alert("You haven't load datas!");
  }

  while (elstring.AudID == []) {
    setTimeout(alert("Loading selected Track..."), 500);
  }

  for (i = 0; i < TemLoad.length; i++) {
    if (TemLoad[i][0] == elstring.AudID) {
      xmlname3.disabled = true;
      var audioURL = TemLoad[i][1];
      var Utility = elstring["NumDenNBPM"];
      var num = Utility[0];
      xmlname1.value = num;
      var den = Utility[1];
      xmlname2.value = den;
      var BPM = Utility[3];
      if (xmlname3.value != BPM) {
        alert(
          "This track is recorded at " +
            BPM +
            "bpm, please set the same bpm value "
        );
        return;
      }
      var N = Utility[2];
      xmlname4.value = N;
      xmlname3.value = BPM;
      get_data(num, den, N, BPM);
      length = elstring["AudLEN"];
      mcm = estMcm(beats);
      var t = Math.round(((60 * 4 * mcm) / (BPM * mcmDen)) * 100) / 100;
      tempogen = t;
      var clipContainer = document.createElement("article");
      var clipLabel = document.createElement("p");
      var audio = document.createElement("audio");
      var deleteButton = document.createElement("button");
      clipContainer.classList.add("clip");
      var trac = document.querySelectorAll("audio");
      var tem = trac.length;
      clipContainer.style = "background-color:" + "#" + colors[tem];

      audio.setAttribute("controls", "");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete";
      clipContainer.appendChild(audio);
      clipContainer.appendChild(clipLabel);
      clipContainer.appendChild(deleteButton);
      soundClips.appendChild(clipContainer);
      audio.controls = true;
      audio.id = elstring.AudID + "aud";
      clipLabel.textContent = audio.id;
      clipLabel.style = "background-color:transparent;";
      audio.src = audioURL;
      audio.play();
      var moment = [audio, length, audioURL, Utility];
      audioi.push(moment);

      deleteButton.onclick = function (e, BPM) {
        stopall.click();
        var BPM = document.formxml3.xmlname3.value;
        setup_circle();
        station_container.style.height = "350px";
        ln.style.height = "125px";
        idx = getindex(e);
        colors.splice(idx, 1);
        beats.splice(idx, 1);
        circles.splice(idx, 1);
        audioi.splice(idx, 1);
        archi.splice(idx, 1);
        mcm = estMcm(beats);
        console.log("NUOVO mcm:" + mcm);
        var t = Math.round(((60 * 4 * mcm) / (BPM * mcmDen)) * 100) / 100;
        tempogen = t;
        var r = 250;
        var h = 350;

        for (i = 0; i < beats.length; i++) {
          archi[i] = (numeratori[i] / mcm) * 360;
          r = r + 50;
          h = h + 50;
          reconstruct_circle(archi[i], r, i);
          cont = document.querySelector("#station_container");
          cont.style.height = h + "px";
        }

        ln.style.height = 125 + i * 25 + "px";
        evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
        playall.disabled = false;
        if (audioi.length === 0) {
          xmlname3.disabled = false;
        }
        brian(mcm, mcmDen);
        remove_animations();
      };
      break;
    }
  }
}

function loadThis(e) {
  elstring = [];

  db.collection("Audioi")
    .doc(e)
    .onSnapshot(function (doc) {
      elstring = doc.data();
    });

  setTimeout(function () {
    popola();
    console.log("loading della traccia");
  }, 1000);
}

//Mouse-over informations
function loadInfo(e) {
  db.collection("Audioi")
    .doc(e)
    .onSnapshot(function (doc) {
      infostring = doc.data();
    });
}

function readInfo(el) {
  loadInfo(el.id);
  var lab = document.createElement("div");
  lab.classList.add("Info");
  lab.style = "text-size: 20px;";
  var con = document.getElementById("contieni2");
  con.appendChild(lab);
  lab.textContent = "Loading...";

  setTimeout(function () {
    if (infostring.AudID == el.id) {
      lab.textContent =
        infostring.NumDenNBPM[0] +
        "/" +
        infostring.NumDenNBPM[1] +
        " N: " +
        infostring.NumDenNBPM[2] +
        " bpm: " +
        infostring.NumDenNBPM[3];
    }
  }, 200);

  el.onmouseout = function () {
    con.removeChild(lab);
  };
}

function troncanome(stringa,maxval){
  var pass="";
  if(stringa.length>=maxval){
    pass=stringa.slice(0,maxval)+"..."
    return pass;
  }else{return stringa;}
}

function getFromFirebase(name) {
  sidepannel = document.querySelector(".contieni");
  var e = document.createElement("button");
  e.id = name;
  var nomeval = troncanome(name,strlun);
  e.textContent = nomeval;
  e.classList.add("traccia");
  e.classList.add("audioFileInput");
  e.style = "background: linear-gradient(0deg, #5F66A1, transparent);";

  for (i = 0; i < TemLoad.length; i++) {
    if (e.id == TemLoad[i][0]) {
      e.style = "background: darkorchid;";
    }
  }

  sidepannel.appendChild(e);
  e.onmouseover = function () {
    readInfo(e);
  };

  e.onclick = function () {
    loadThis(name);
    stopall.click();
  };
}

function readFirebase() {
  sidepannel = document.querySelector(".contieni");

  while (sidepannel.childElementCount != 0) {
    sidepannel.removeChild(sidepannel.childNodes[0]);
  }

  docList = [];
  console.log("loading");
  db.collection("Audioi")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        docList.push(doc.id);
        getFromFirebase(doc.id);
        console.log("...");
      });
    });

  if (docList === []) {
    document.querySelector(".contieni").textContent =
      "No saved tracks are present";
  } else {
    document.querySelector(".contieni").textContent = "";
  }
}

//=========================LATERAL PANEL=========================
$(".esci").click(function () {
  readFirebase();
  document.getElementById("audio-upload").style = "mix-blend-mode: none;";
  let spWidth = $(".sidepanel").width();
  let spMarginLeft = parseInt($(".sidepanel").css("margin-left"), 10);
  let w = spMarginLeft >= 0 ? spWidth * -1 : 0;
  let cw = w < 0 ? -w : spWidth - 22;
  $(".sidepanel").animate({
    marginLeft: w
  });
  $(".sidepanel span").animate({
    marginLeft: w
  });
  $(".esci").animate(
    {
      left: cw
    },
    function () {
      $(".fa-chevron-left").toggleClass("hide");
      $(".fa-chevron-right").toggleClass("hide");
    }
  );
});

usci.click();

//=================MAIN BLOCK FOR AUDIO RECORDING=================
if (navigator.mediaDevices.getUserMedia) {
  console.log("getUserMedia supported.");

  var constraints = { audio: true };
  var chunks = [];

  var onSuccess = function (stream) {
    var mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = function (e) {
      chunks.push(e.data);
    };

    bttn.onclick = function () {
      if (audioi.length != 0) {
        xmlname3.disabled = true;
      }

      var num = document.formxml1.xmlname1.value;
      var den = document.formxml1.xmlname2.value;
      var BPM = document.formxml3.xmlname3.value;
      var N = document.formxml4.xmlname4.value;

      if (num === "" || den === "" || N === "" || BPM === "") {
        alert("Insert recording parameters");
      } else {
        container.style = "display: block";
        ValoriUtili = new Array();
        ValoriUtili = [num, den, N, BPM];
        spia.classList.add("spia_1");

        get_data(num, den, N, BPM);

        //length of the recording
        length = (60 * N * num * 4) / (BPM * den);

        bttn.disabled = true;

        //metronome creation
        for (i = 0; i < num; i++) {
          var ddot = document.createElement("div");
          ddot.classList.add("dot");
          container.appendChild(ddot);
          dots.push(false);
        }

        function render_beat() {
          document.querySelectorAll(".dot").forEach(toggle_beat);
          if (beat === 0) {
            c = new AudioContext();
            o = c.createOscillator();
            o.frequency.setValueAtTime(880, audioCtx.currentTime);
            o.start();
            g = c.createGain();
            g.gain.setValueAtTime(0.4, audioCtx.currentTime);
            o.connect(g);
            g.connect(c.destination);
            o.stop(0.1);
          } else {
            c = new AudioContext();
            o = c.createOscillator();
            o.start();
            g = c.createGain();
            g.gain.setValueAtTime(0.4, audioCtx.currentTime);
            o.connect(g);
            g.connect(c.destination);
            o.stop(0.1);
          }
          c.resume();
        }

        function toggle_beat(dot, index) {
          dot.classList.toggle("active", index == beat);
        }

        render_beat();

        myVar = setInterval(next_beat, (1000 * length) / (N * num));

        function next_beat() {
          beat = (beat + 1) % dots.length;
          render_beat();
        }

        function myStopFunction() {
          clearInterval(myVar);
        }

        function stoprecorder() {
          mediaRecorder.stop();
          stopall.click();
          ln.style.animation = "";
          mask.style.animation = "";
          console.log(mediaRecorder.state);
          console.log("recorder stopped");
          spia.classList.remove("spia_2");
          spia.classList.remove("spia_1");
          bttn.disabled = false;
          //stop metronome:
          myStopFunction();
          container.innerHTML = "";

          for (j = 0; j < num; j++) {
            dots.pop(false);
          }

          beat = 0;
        }

        //starting the tracks dureing the recording
        if (audioi.length != 0) {
          setTimeout(function () {
            playall.click();
          }, (length * 1000 * 2) / N - loadTime);
        }

        setTimeout(function () {
          mediaRecorder.start();
          mcm = estMcm(beats);
          var t = Math.round(((60 * 4 * mcm) / (BPM * mcmDen)) * 100) / 100;
          ln.style.animation = "rotation " + t + "s linear infinite";
          spia.classList.add("spia_2");
          console.log(mediaRecorder.state);
          console.log("recorder started");
        }, (length * 1000 * 2) / N + latency);

        setTimeout(function () {
          myStopFunction();
        }, length * 1000 -
          (length * 1000) / (N * num) +
          (length * 1000 * 2) / N);

        setTimeout(function () {
          if (mediaRecorder.state == "recording") {
            stoprecorder();
          }
        }, length * 1000 + (length * 1000 * 2) / N + latency);

        //Abort the recording with esc button
        $("a[name=close]").click(function () {
          var e = jQuery.Event("keyup"); // or keypress/keydown
          e.keyCode = 27; // for Esc
          $(document).trigger(e); // trigger it on document
        });

        $(document).keyup(function (e) {
          if (e.keyCode == 27 && mediaRecorder.state == "recording") {
            // Esc
            stoprecorder();
            //cancel graphics:
            el = station_container.querySelector(".circle");
            station_container.removeChild(el);
            //erease data:
            var BPM = document.formxml3.xmlname3.value;
            station_container.style.height = "350px";
            ln.style.height = "125px";
            colors.splice(colors.length - 1, 1);
            beats.splice(beats.length - 1, 1);
            circles.splice(circles.length - 1, 1);
            archi.splice(archi.length - 1, 1);
            mcm = estMcm(beats);
            console.log("NUOVO mcm:" + mcm);
            var t = Math.round(((60 * 4 * mcm) / (BPM * mcmDen)) * 100) / 100;
            tempogen = t;
            var r = 250;
            var h = 350;

            setup_circle();
            for (i = 0; i < beats.length; i++) {
              archi[i] = (numeratori[i] / mcm) * 360;
              r = r + 50;
              h = h + 50;
              reconstruct_circle(archi[i], r, i);
              cont = document.querySelector("#station_container");
              cont.style.height = h + "px";
            }

            ln.style.height = 125 + i * 25 + "px";
            //flag:
            escflag = 1;
          }
        });
      }
    };

    //At the end of the recording:
    mediaRecorder.onstop = function (e) {
      container.style = "display: none";
      if (escflag == 1) {
        chunks = [];
        escflag = 0;
      } else {
        var trac = document.querySelectorAll("audio");
        var tem = trac.length;

        console.log("data available after MediaRecorder.stop() called.");

        var clipName = prompt(
          "Enter a name for your sound clip",
          "My unnamed clip"
        );

        console.log(clipName);
        var clipContainer = document.createElement("article");
        var clipLabel = document.createElement("p");
        var audio = document.createElement("audio");
        var deleteButton = document.createElement("button");
        var fireloadButton = document.createElement("button");
        clipContainer.classList.add("clip");

        audio.setAttribute("controls", "");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";
        fireloadButton.textContent = "Load on Firebase";
        fireloadButton.className = "fireload";
        clipContainer.style = "background-color:" + "#" + colors[tem];
        clipLabel.style = "background-color:transparent;";

        if (clipName == null) {
          clipLabel.textContent = "My unnamed clip";
        } else {
          clipLabel.textContent = clipName;
        }

        clipContainer.appendChild(audio);
        clipContainer.appendChild(clipLabel);
        clipContainer.appendChild(deleteButton);
        clipContainer.appendChild(fireloadButton);

        soundClips.appendChild(clipContainer);

        var blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });

        var audioURL = window.URL.createObjectURL(blob);
        audio.controls = true;
        audio.src = audioURL;
        audio.id = clipName;

        audio.play(0);

        setTimeout(function () {
          console.log("DURATION " + audio.duration);
          audio.load();

          audioi.push([audio, length, colors[tem - 1], ValoriUtili]);
        }, length * 1000 + 1000);

        //length rounding
        lungh = Math.round(length * 1000);

        console.log("recorder stopped");

        chunks = [];

        fireloadButton.onmouseenter = function () {
          downInfo(fireloadButton);
        };

        fireloadButton.onclick = function (e) {
          stopall.click();
          idx = getindex(e);
          var actualname = audioi[idx][0].id;
          url = audioi[idx][0]["src"];
          downloadURI(url, actualname);
          window.open(FireloadURL, "_system", "location=yes");
          salva(actualname);
          console.log("Your track is on Firebase!");
        };

        deleteButton.onclick = function (e, BPM) {
          stopall.click();
          var BPM = document.formxml3.xmlname3.value;

          setup_circle();
          station_container.style.height = "350px";
          ln.style.height = "125px";

          idx = getindex(e);

          colors.splice(idx, 1);
          beats.splice(idx, 1);
          circles.splice(idx, 1);
          audioi.splice(idx, 1);
          archi.splice(idx, 1);

          mcm = estMcm(beats);

          console.log("NUOVO mcm:" + mcm);
          var t = Math.round(((60 * 4 * mcm) / (BPM * mcmDen)) * 100) / 100;
          tempogen = t;

          var r = 250;
          var h = 350;

          for (i = 0; i < beats.length; i++) {
            archi[i] = (numeratori[i] / mcm) * 360;
            r = r + 50;
            h = h + 50;
            reconstruct_circle(archi[i], r, i);
            cont = document.querySelector("#station_container");
            cont.style.height = h + "px";
          }

          window.URL.revokeObjectURL(audioURL);
          ln.style.height = 125 + i * 25 + "px";
          evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
          playall.disabled = false;

          if (audioi.length === 0) {
            xmlname3.disabled = false;
            mcm = 0;
          }
          brian(mcm, mcmDen);
          remove_animations();
        };

        clipLabel.onclick = function () {
          var existingName = clipLabel.textContent;
          var newClipName = prompt("Enter a name for your sound clip");
          if (newClipName == null) {
            clipLabel.textContent = existingName;
          } else {
            clipLabel.textContent = newClipName;
          }
          audio.id = "";
          audio.id = newClipName;
        };
      }
    };
  };

  var onError = function (err) {
    console.log("The following error occured: " + err);
  };

  navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
} else {
  alert("getUserMedia not supported on your browser!");
}

//===================PLAY AND STOP FUNCTIONS===================
function setVolume(el) {
  var track = document.querySelectorAll("audio");
  var gain = 100 - 7 * (track.length - 1);
  el.volume = (1 * gain) / 100;
}

function parti(aud) {
  setVolume(aud);
  aud.load();
  aud.play();
}

function stoppa(aud) {
  aud.pause();
}

function remove_animations() {
  ln.style.animation = "";
  mask.style.animation = "";
  var circles = document.getElementsByClassName("circle");
  for (i = 0; i < archi.length; i++) {
    var el = circles[i];
    el.style.animation = "";
  }
}

function partiamo() {
  remove_animations();
  //circles animations assignment
  for (i = 0; i < archi.length; i++) {
    el = circles[i];
    var s = Math.round((360 / archi[i]) * 1000) / 1000;
    el.style.animation =
      "rotazione " + tempogen + "s infinite steps(" + s + ")";
  }

  ln.style.animation = "rotation " + tempogen + "s linear infinite";
  mask.style.animation = "led " + tempogen + "s linear infinite";

  var tracce = document.querySelectorAll("audio");
  tracce.forEach(parti);
  var a = audioi.length;
  var b = tracce.length;
  if (b == 1) {
    for (i = 0; i < a; i++) {
      if (tracce[0] == audioi[i][0]) {
        I = i.toString();
        eval(
          "myLoop[0] = setInterval(function(){ parti(audioi[" +
            I +
            "][0])}, audioi[" +
            I +
            "][1]*1000); "
        );
      }
    }
  } else {
    for (j = 0; j < b; j++) {
      for (i = 0; i < a; i++) {
        if (tracce[j] === audioi[i][0]) {
          I = i.toString();
          J = j.toString();
          var T0 =
            "myLoop[" +
            J +
            "] = setInterval(function(){ parti(audioi[" +
            I +
            "][0])}, audioi[" +
            I +
            "][1]*1000); ";
          var Ttot = T0;
          cicloTxt.push(Ttot);
        }
      }
      ciclone += cicloTxt[j];
    }
  }
  console.log(ciclone);
  eval(ciclone);
}

function stopindex(index) {
  clearInterval(myLoop[index]);
  clearInterval(tempo[index]);
}

var frazione;

function scorriTempo() {
  var i = 2;
  brian(1, mcmDen);
  frazione = setInterval(function () {
    if (i == mcm + 1) {
      i = 1;
    }
    brian(i, mcmDen);
    i += 1;
  }, (1000 * tempogen) / mcm);
}

playall.onclick = function () {
  document.getElementsByClassName("record").disabled = true;
  cicloTxt = [];
  ciclone = [];
  myLoop = [];
  var tracce = document.querySelectorAll("audio");
  if (tracce.length == 0) {
    var controllotrack = alert("There are no tracks to be played");
  } else {
    scorriTempo();
    Tempotrac();
    partiamo();
    playall.disabled = true;
    stopall.disabled = false;
  }
};

stopall.onclick = function () {
  clearInterval(frazione);
  document.getElementsByClassName("record").disabled = false;
  remove_animations();
  var tracce = document.querySelectorAll("audio");
  tracce.forEach(stoppa);
  var a = tracce.length;

  for (i = 0; i < a; i++) {
    stopindex(i);
  }
  BFNcont.innerHTML = "";
  var els = document.createElement("div");
  els.classList.add("BFN");
  els.id = "sar";
  BFNcont.appendChild(els);

  playall.disabled = false;
  brian(mcm, mcmDen);
};

var JVec = [];
var TempiSingoli = [];
var TempiToto = [];
function Tempotrac() {
  TempiSingoli = [];
  TempiToto = [];
  tempo = [];
  var utili = [];
  for (var indice = 0; indice < audioi.length; indice++) {
    JVec[indice] = 2;
    var sig = document.createElement("div");
    sig.classList.add("BFN");
    utili = audioi[indice][3];
    sig.style = "color: " + "#" + colors[indice];
    sig.textContent = 1 + "/" + utili[1];
    sig.id = audioi[indice][0].id + "sig";
    BFNcont.appendChild(sig);
    var nometem = audioi[indice][0].id.toString() + "sig";
    var TempiS =
      "tempo[" +
      indice +
      "]=setInterval(function () {if (JVec[" +
      indice +
      "] == " +
      utili[0] +
      "+1){JVec[" +
      indice +
      "] = 1;} document.getElementById('" +
      nometem +
      "').textContent = JVec[" +
      indice +
      "] + '/' +" +
      utili[1] +
      "; JVec[" +
      indice +
      "] += 1; },(1000 *audioi[" +
      indice +
      "][1]) / (" +
      utili[0] * utili[2] +
      "));";
    TempiSingoli.push(TempiS);
    TempiToto += TempiSingoli[indice];
  }
  eval(TempiToto);
}

function quantodura() {
  var intervallo = tempogen;
  var giorni = Math.floor(intervallo / 86400);
  var secondi_resto = intervallo - giorni * 86400;
  var ore = Math.floor(secondi_resto / 3600);
  secondi_resto = intervallo - giorni * 86400 - ore * 3600;
  var minuti = Math.floor(secondi_resto / 60);
  secondi_resto = intervallo - giorni * 86400 - ore * 3600 - minuti * 60;
  console.log(giorni, ore, minuti);
}
