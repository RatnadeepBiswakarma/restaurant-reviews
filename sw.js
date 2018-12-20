let cacheName = 'restaurant-review-cache-v1';

// assets to cache
let cacheAssets = [
    './',
    './index.html',
    './restaurant.html',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js',
    './css/styles.css',
    './img/1.jpg',
    './img/10.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './data/restaurants.json',
]

// service worker install function
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            cache.addAll(cacheAssets)
            console.log('files cached');
        }).then(() => {
            self.skipWaiting();
        })
    )
});

// service worker active function
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cache) => {
            return Promise.all(
                cache.map(oldCache => {
                    if (oldCache !== cacheName) {
                        caches.delete(oldCache);
                    }
                })
            )
        })
    )
});

// fetch data
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            } else {
                return fetch(event.request);
            }
        }).catch(err => console.log(`Something went wrong : ${err}`))
    );
});