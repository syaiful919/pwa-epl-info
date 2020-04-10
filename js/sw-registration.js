//Service worker registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function () {
        console.log("service worker registration success");
      })
      .catch(function () {
        console.log("service worker rehistration failed");
      });
  });
} else {
  console.log("browser not support service worker");
}

