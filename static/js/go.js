let workerLoaded;

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const formattedTime = `${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`;

  return formattedTime;
}

function formatTwoDigits(value) {
  return value < 10 ? `0${value}` : value;
}

const currentTime = getCurrentTime();
console.log(`Current time is: ${currentTime}`);


async function worker() {
  return await navigator.serviceWorker.register("../sw.js", {
    scope: "/service",
  });
}

document.addEventListener('DOMContentLoaded', async function(){
  await worker();
  workerLoaded = true;
})

function prependHttps(url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'https://' + url;
  }
  return url;
}

function isUrl(val = "") {
  // Use a regular expression to check for a valid URL pattern
  const urlPattern = /^(http(s)?:\/\/)?([\w-]+\.)+[\w]{2,}(\/.*)?$/;
  return urlPattern.test(val);
}


window.addEventListener('DOMContentLoaded', () => {
  const TargetURL = localStorage.getItem("TargetURL")
  const TargetName = localStorage.getItem("TargetName")
  var Sys = localStorage.getItem('seismetic-config');
  var storedInfo = JSON.parse(Sys);
  if (TargetURL) {
    const URL_ = document.getElementById("url")
    const h1 = document.createElement("h1")
    URL_.appendChild(h1)
    h1.textContent = TargetName
    setTimeout(() => {
      startPR(TargetURL);
      console.log(TargetURL)
    }, 1000);
  }
  function encodeUrl(str) {
    if (!str) return str;
    return encodeURIComponent(str.toString().split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join(''));
  }

  function startPR(Destination) {
    if (localStorage.getItem('sm-user')) {
      const sendDataToServer = async () => {
        const dataToSend = { data: localStorage.getItem('sm-user') + ' Is going to ' + Destination};
    
        try {
          const response = await fetch('http://' + window.location.host + '/ss', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
          });
    
          const result = await response.text();
          console.log('Server response:', result);
        } catch (error) {
          console.error('Error sending data to server:', error);
        }
      };
    
      sendDataToServer();
    }
    if (storedInfo.proxy == 'uv') {
        openUV(Destination)
    } else {
      if (storedInfo.proxy == 'dynamic') {
        Redir(Destination)
      }
    }
  }

  function openUV(url) {
    window.navigator.serviceWorker.register('./uv/sw.js', {
      scope: __uv$config.prefix
    }).then(() => {
      document.getElementById("loadingScreen").remove();
      var iframe = document.createElement("iframe");
      document.body.appendChild(iframe);
      iframe.id = 'content';
      iframe.src = __uv$config.prefix + encodeUrl(url);
    });
  }

  function Redir(targetURL) {
    console.log("Connecting to service -> loading");
  if (typeof navigator.serviceWorker === "undefined") {
    alert(
      "An error occurred registering your service worker."
    );
  }
  var iframe = document.createElement("iframe");
  document.body.appendChild(iframe);
  document.getElementById("loadingScreen").remove();
  iframe.id = 'content';
  const iValue = targetURL
  iframe.src = '../dynamic/#' + targetURL;
} 
});