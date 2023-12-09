




// ↑ UP = Popups  //   ↓  DOWN = Settings   //
let sys = ''
if (localStorage.getItem('seismetic-config')) {
    sys = localStorage.getItem('seismetic-config')
} else {
var st5 = { 

    proxy: 'uv',
    panicKey: 'none',
    theme: 'classic'

     };
     var jsonString = JSON.stringify(st5);
     localStorage.setItem('seismetic-config', jsonString)
}


var storedInfo = JSON.parse(localStorage.getItem('seismetic-config'));
const TH_V = storedInfo.theme
const PK = storedInfo.panicKey

TH_V
if (TH_V == 'classic') {
    console.log('classic')
}

if (TH_V == 'white') {
    document.getElementById('CSS').href = './estylo/white.css';
}

if (TH_V == 'tyson black') {
    document.getElementById('CSS').href = './estylo/black.css';
}

if (TH_V == 'carti') {
    document.getElementById('CSS').href = './estylo/carti-theme.css';
}

if (TH_V == 'OG') {
    document.getElementById('CSS').href = './estylo/OG.css';
}


document.addEventListener('keydown', function (event) {
    var g = JSON.parse(localStorage.getItem('seismetic-config'));
    if (event.key === g.panicKeyKey) {
     window.open('https://classroom.google.com/')
    }
  });