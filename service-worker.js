const CACHE_NAME = "firstpwa-v1";
var urlsToCache = [
  "/",
  "/manifest.json",
  "/nav.html",
  "/index.html",
  "/team-detail.html",
  "/pages/fav-teams.html",
  "/pages/home.html",
  "/pages/tables.html",
  "/pages/teams.html",
  "/pages/top-scores.html",
  "/css/style.css",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/index.js",
  "/js/api.js",
  "/js/db.js",
  "/js/sw-registration.js",
  "/js/team-detail.js",
  "/lib/idb.js",
  "/assets/1.jpg",
  "/assets/2.jpg",
  "/assets/3.jpg",
  "/assets/4.jpg",
  "/assets/5.jpg",
  "/assets/back.svg",
  "/assets/burger.svg",
  "/assets/epl.svg",
  "/assets/fav.svg",
  "/assets/fav-outline.svg",
  "/assets/coach.png",
  "/assets/flag.png",
  "/assets/goal.png",
  "/assets/history.png",
  "/assets/shield.png",
  "/assets/stadium.png",
  "/assets/tshirt.png",
  "/assets/icon192x192.png",
  "/assets/icon512x512.png",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  const baseUrl = "https://api.football-data.org/v2/";
  const header = {
    headers: {
      "X-Auth-Token": "b40c7816650a44638b508fc392f5dac6",
    },
  };

  if (event.request.url.indexOf(baseUrl) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function(response) {
        return response || fetch (event.request);
      })
    )
  }
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
