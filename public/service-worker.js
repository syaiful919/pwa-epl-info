importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox successfully loaded`);
else
  console.log(`Workbox failed do load`);

workbox.precaching.precacheAndRoute([
  {url: "/manifest.json", revision: "1"},
  {url: "/nav.html", revision: "1"},
  {url: "/index.html", revision: "1"},
  {url: "/team-detail.html", revision: "1"},
  {url: "/css/style.css", revision: "1"},
  {url: "/css/materialize.min.css", revision: "1"},
  {url: "/js/materialize.min.js", revision: "1"},
  {url: "/js/index.js", revision: "1"},
  {url: "/js/api.js", revision: "1"},
  {url: "/js/db.js", revision: "1"},
  {url: "/js/sw-registration.js", revision: "1"},
  {url: "/js/team-detail.js", revision: "1"},
  {url: "/js/notification.js", revision: "1"},
  {url: "/lib/idb.js", revision: "1"},
  {url: "/assets/1.jpg", revision: "1"},
  {url: "/assets/2.jpg", revision: "1"},
  {url: "/assets/3.jpg", revision: "1"},
  {url: "/assets/4.jpg", revision: "1"},
  {url: "/assets/5.jpg", revision: "1"},
  {url: "/assets/back.svg", revision: "1"},
  {url: "/assets/burger.svg", revision: "1"},
  {url: "/assets/epl.svg", revision: "1"},
  {url: "/assets/fav.svg", revision: "1"},
  {url: "/assets/fav-outline.svg", revision: "1"},
  {url: "/assets/coach.png", revision: "1"},
  {url: "/assets/flag.png", revision: "1"},
  {url: "/assets/goal.png", revision: "1"},
  {url: "/assets/history.png", revision: "1"},
  {url: "/assets/shield.png", revision: "1"},
  {url: "/assets/stadium.png", revision: "1"},
  {url: "/assets/tshirt.png", revision: "1"},
  {url: "/assets/icon192x192.png", revision: "1"},
  {url: "/assets/icon512x512.png", revision: "1"},
])

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
  new RegExp('/team-detail.html?'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'team-detail'
    })
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'remote'
  })
);

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  if (!event.action) {
    console.log("notificationclick");
    return;
  }

  switch (event.action) {
    case "yes-action":
      console.log("yes clicked");
      break;
    case "no-action":
      console.log("no clicked");
      break;
    default:
      console.log("action not found:" + event.action);
      break;
  }
});

self.addEventListener('push', (event) => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  let options = {
    body: body,
    icon: 'assets/icon192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
