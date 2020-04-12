var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BILn754vPEi7PKCOT4CwZ4VaQ1hGByrdLZFpPbX1B2iEbsnpjnAvAOrsKHvcBc2hGeWl2P78B0oNWg1GhtlroEk",
   "privateKey": "cWtSDorJ0bQ26_Izaakq9CxsVlgUefY1xm8ao6Dy0nc"
};
 
 
webPush.setVapidDetails(
   'mailto:syaiful919@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/c9S89d2HFuA:APA91bFcjMafIsBUoroea3u3cfwHxlw2D1JLOByFPVi9Nz7tIfVI6KoEe6vk21qtR_QQyYYrYez7t94FY-YV1vJ2860Yojo39q2LIrQlSlDO9RmG_QyRNdPMKlphOjtDKjt1FAp5iQBk",
   "keys": {
       "p256dh": "BLrB8Axw0McC7wBw1K8wCn3OgbHZjJbM62KIDU0LDFF6Ign6E4z3pZe9N6W/voksXcYCDsKlnKGPUNaziNmfb1Y=",
       "auth": "W9S6jb33Xa4VeV7Ia+Usew=="
   }
};
var payload = 'Welcome to EPL Info';
 
var options = {
   gcmAPIKey: '975954488298',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);