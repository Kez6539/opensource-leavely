// Leavely Service Worker — Push Notifications

self.addEventListener('push', (event) => {
  if (!event.data) return

  let payload
  try {
    payload = event.data.json()
  } catch {
    payload = { title: 'Leavely', body: event.data.text() }
  }

  const options = {
    body: payload.body || '',
    icon: '/logo.webp',
    badge: '/logo.webp',
    data: { url: payload.url || '/' },
    tag: payload.tag || 'leavely-notification',
    renotify: true,
  }

  event.waitUntil(self.registration.showNotification(payload.title || 'Leavely', options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const url = event.notification.data?.url || '/'

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If there's already a window open, focus it and navigate
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.focus()
          client.navigate(url)
          return
        }
      }
      // Otherwise open a new window
      return clients.openWindow(url)
    })
  )
})

// PWA install — cache key pages for offline shell
const CACHE_NAME = 'leavely-v2'
const OFFLINE_URL = '/login'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([OFFLINE_URL, '/logo.webp', '/icons/icon-192.png'])
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      )
    }).then(() => self.clients.claim())
  )
})

// Network-first strategy — serve from network, fall back to cache
self.addEventListener('fetch', (event) => {
  if (event.request.mode !== 'navigate') return
  event.respondWith(
    fetch(event.request).catch(() => caches.match(OFFLINE_URL))
  )
})
