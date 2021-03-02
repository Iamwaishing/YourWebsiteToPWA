// Cache name
const cacheName = 'v1';

// install cache
self.addEventListener('install', e => {
	e.waitUntil(
		caches.open(cacheName).then(cache => {
			return cache.addAll(["./",
							"./index.js",
							"./sw.js",
							"./manifest.json",
							"./images/icon-72x72.png",
							"./images/icon-96x96.png",
							"./images/icon-128x128.png",
							"./images/icon-144x144.png",
							"./images/icon-152x152.png",
							"./images/icon-192x192.png",
							"./images/icon-384x384.png",
							"./images/icon-512x512.png",
							]) + skipWaiting();
							
		})
	);
});

// request cache
self.addEventListener('fetch', (event) => {
	event.respondWith(
	fetch(event.request).then((response) => {
		  return caches.open(cacheName).then((cache) => {
			cache.put(event.request, response.clone());
			return response;
		  });
		})
	  );
});

// update and delete old cache
self.addEventListener('activate', (event) => {
	var cacheKeeplist = [cacheName];
  
	event.waitUntil(
	  caches.keys().then((keyList) => {
		return Promise.all(keyList.map((key) => {
		  if (cacheKeeplist.indexOf(key) === -1) {
			return caches.delete(key);
		  }
		}));
	  })
	);
});