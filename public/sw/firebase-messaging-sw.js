importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js');

const config = {
  'apiKey': 'AIzaSyDbEpYg_R2d1urPBabOHzrKN4rwpJQjC4o',
  'authDomain': 'text-roleplay-afae6.firebaseapp.com',
  'databaseURL': 'https://text-roleplay-afae6.firebaseio.com',
  'projectId': 'text-roleplay-afae6',
  'storageBucket': 'text-roleplay-afae6.appspot.com',
  'messagingSenderId': '497277640969',
  'appId': '1:497277640969:web:56bb7d2a6f3463567733d8'
};

firebase.initializeApp(config);
const messaging = firebase.messaging();
messaging.usePublicVapidKey('BAyoIImrqrRCYywaalz49AsXoR-e8LlbaN8Aljoc8EKUOlOXkGovTxThpj05thYO7vUV2gTnx6gSiHkX5oWlh5k');
