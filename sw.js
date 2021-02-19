// install
self.addEventListener('install', e => {
	e.waitUntil(
		caches.open("static").then(cache => {
			return cache.addAll(["./",
							"./index.js",
							"./css/default.css",
							"./manifest.json",
							"./sw.js",
							"./images/whatsapp.png",
							"./images/icon-72x72.png",
							"./images/icon-96x96.png",
							"./images/icon-128x128.png",
							"./images/icon-144x144.png",
							"./images/icon-152x152.png",
							"./images/icon-192x192.png",
							"./images/icon-384x384.png",
							"./images/icon-512x512.png"
							]);
		})
	);
});


self.addEventListener('fetch', (event) => {
	event.respondWith(
	  caches.match(event.request).then((resp) => {
		return resp || fetch(event.request).then((response) => {
		  return caches.open('v1').then((cache) => {
			cache.put(event.request, response.clone());
			return response;
		  });
		});
	  })
	);
});