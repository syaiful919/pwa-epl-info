const CACHE_NAME = "firstpwa-v1";
var urlsToCache = [
  "/",
  "/manifest.json",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/tv.html",
  "/pages/movie.html",
  "/pages/all-anime.html",
  "/css/style.css",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/script.js",
  "/js/data.js",
  "/assets/fullmetal.jpg",
  "/assets/fullmetal2.jpg",
  "/assets/yourname.jpg"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request, {cacheName:CACHE_NAME})
		.then(function(response) {
			if(response){
				console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
				return response;
			}
			
			console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
			return fetch(event.request);
		})
	);
});

self.addEventListener("activate", function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.map(function(cacheName){
                    if(cacheName != CACHE_NAME){
                        console.log("ServiceWorker: cache " + cacheName + " dihapus")
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})
