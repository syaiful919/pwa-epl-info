if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function () {
        console.log("pendaftaran service worker berhasil");
      })
      .catch(function () {
        console.log("pendaftaran service worker gagal");
      });
  });
} else {
  console.log("service worker belum didukung browser ini");
}
