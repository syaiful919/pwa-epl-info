// Notification
urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

requestPermission = () => {
  if ("Notification" in window) {
    Notification.requestPermission().then(function (result) {
      if (result === "denied") {
        console.log("notification denieded");
        return;
      } else if (result === "default") {
        console.log("notification dialog closed");
        return;
      }

      if ("PushManager" in window) {
        navigator.serviceWorker.getRegistration().then(function (registration) {
          registration.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(
                "BILn754vPEi7PKCOT4CwZ4VaQ1hGByrdLZFpPbX1B2iEbsnpjnAvAOrsKHvcBc2hGeWl2P78B0oNWg1GhtlroEk"
              ),
            })
            .then(function (subscribe) {
              console.log(
                "subscribe succesfull, endpoint: ",
                subscribe.endpoint
              );
              console.log(
                "subscribe succesfull, p256dh key: ",
                btoa(
                  String.fromCharCode.apply(
                    null,
                    new Uint8Array(subscribe.getKey("p256dh"))
                  )
                )
              );
              console.log(
                "subscribe succesfull, auth key: ",
                btoa(
                  String.fromCharCode.apply(
                    null,
                    new Uint8Array(subscribe.getKey("auth"))
                  )
                )
              );
            })
            .catch(function (e) {
              console.error("cannot do subscribe ", e.message);
            });
        });
      }
    });
  }
};

requestPermission();
