
var deferredPrompt;
var enableNotificationsButtons = document.querySelectorAll('.enable-notifications');

if (!window.Promise) {
  window.Promise = Promise;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function () {
      console.log('Service worker registered!');
    })
    .catch(function(err) {
      console.log(err);
    });
}

window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  // event.preventDefault();
  deferredPrompt = event;
  return false;
});

function displayConfirmNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: 'Here is a notification body!',
        icon: '/src/images/icons/app-icon-96x96.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        }
      };
      reg.showNotification('Hello world!', options);
    });
  }
}

// function displayConfirmNotification() {
//   console.log('displayConfirmNotification')
//   if ('serviceWorker' in navigator) {
//     console.log('test')
//     var options = {
//       body: 'You successfully subscribed to our Notification service!',
//       icon: '/src/images/icons/app-icon-96x96.png',
//       image: '/src/images/main-image.jpg',
//       dir: 'ltr',
//       lang: 'en-US', // BCP 47,
//       vibrate: [100, 50, 200],
//       badge: '/src/images/icons/app-icon-96x96.png',
//       tag: 'confirm-notification',
//       renotify: true,
//       actions: [
//         { action: 'confirm', title: 'Okay', icon: '/src/images/icons/app-icon-96x96.png' },
//         { action: 'cancel', title: 'Cancel', icon: '/src/images/icons/app-icon-96x96.png' }
//       ]
//     };
//
//     navigator.serviceWorker.ready
//       .then(function(swreg) {
//         swreg.showNotification('Successfully subscribed (from SW)!', options);
//       });
//   }
// }

function askForNotificationPermission() {
  Notification.requestPermission().then(function(result){
    // alert('User Choice', result);
    displayConfirmNotification();
    if (result !== 'granted') {
      console.log('No notification permission granted!');
      displayConfirmNotification();
    } else {
      displayConfirmNotification();
    }
  });
}


function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }}

if ('Notification' in window) {
  for (var i = 0; i < enableNotificationsButtons.length; i++) {
    enableNotificationsButtons[i].style.display = 'inline-block';
    enableNotificationsButtons[i].addEventListener('click', askForNotificationPermission);
  }
}