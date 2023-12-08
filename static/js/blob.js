const DefaultProxy = 'uv'
const DefaultTheme = 'classic'
const DefaultPanicKey = 'none'

let fart = 1
let pee = 1
let saveProxy = ''
let saveTheme = ''
let savePanicKey = ''
var Sys = localStorage.getItem('seismetic-config');
var storedInfo = JSON.parse(Sys);
function RequestProxyChange() {
    if (Sys) {
        const buttonOutput = document.getElementById('switchP');
        if (fart === 1) {
            saveProxy = 'dynamic';
            buttonOutput.textContent = 'Dynamic (Click to Switch)';
            fart = 2;
        } else {
            saveProxy = 'uv';
            buttonOutput.textContent = 'Ultraviolet (Click to Switch)';
            fart = 1;
        }
    }
}

function SetPanicKey() {
    var but = document.getElementById('key')
    but.textContent = 'Listening'
    document.addEventListener('keydown', function(event) {
        alert('Panic key was set to : ' + event.key);
        savePanicKey = event.key;
        document.removeEventListener('keydown', arguments.callee); 
        but.textContent = 'Set Keybind'
      });
}

function SetTheme() {
    var Get = prompt('Please type in the name of the theme some options are | white, tyson black, classic | More themes coming soon and this is case sensitive')
    saveTheme = Get
}

function ApplyChanges() {
    let proxyToSave = ''
    if (saveProxy == '') {
        proxyToSave = DefaultProxy;
    } else {
        proxyToSave = saveProxy;
    }

    let panicKeyToSave = ''
    if (savePanicKey == '') {
        panicKeyToSave = DefaultPanicKey;
    } else {
        panicKeyToSave = savePanicKey;
    }

    let themetoSave = ''
    if (saveTheme == '') {
        themetoSave = DefaultTheme;
    } else {
        themetoSave = saveTheme;
    }
    var st5 = { 

        proxy: proxyToSave,
        panicKey: panicKeyToSave,
        theme: themetoSave

         };
         var jsonString = JSON.stringify(st5);
         alert('Saves your stuff : ' + proxyToSave + ' ' + panicKeyToSave + ' ' + themetoSave)
         localStorage.setItem('seismetic-config', jsonString)
         window.location.href = window.location.href + '?refresh'
}