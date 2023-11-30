window.addEventListener('DOMContentLoaded', () => {
  const TargetURL = localStorage.getItem("TargetURL")
  const TargetName = localStorage.getItem("TargetName")
  if (TargetURL) {
    const URL_ = document.getElementById("url")
    const h1 = document.createElement("h1")
    URL_.appendChild(h1)
    h1.textContent = TargetName
    setTimeout(() => {
      openUV(TargetURL);
      console.log(TargetURL)
    }, 1000);
  }
  function encodeUrl(str) {
    if (!str) return str;
    return encodeURIComponent(str.toString().split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join(''));
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
});