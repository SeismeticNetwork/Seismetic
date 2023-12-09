let workerLoaded;

async function worker() {
  return await navigator.serviceWorker.register("/sw.js", {
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
  const urlPattern = /^(http(s)?:\/\/)?([\w-]+\.)+[\w]{2,}(\/.*)?$/;
  return urlPattern.test(val);
}

function Redir(targetURL) {
  console.log("Connecting to service -> loading");
if (typeof navigator.serviceWorker === "undefined") {
  alert(
    "An error occurred registering your service worker."
  );
}
const iValue = targetURL
const url = isUrl(iValue) ? prependHttps(iValue) : 'https://www.google.com/search?q=' + encodeURIComponent(iValue);
window.location.href = '/service/route' + "?url=" + encodeURIComponent(url);
}


