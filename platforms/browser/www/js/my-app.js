// Initialize app
var myApp = new Framework7({
});

// Creo el mapa llamado mymap
var mymap = L.map('mapid').setView([-34.6131516, -58.3772316], 13);
// Añadir el tapiz
// L.tileLayer('https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png', {
// 	maxZoom: 19,
// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(mymap);   //Añadir el tapiz al mapa

var mimapa = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);


L.control.locate().addTo(mymap);

L.Control.geocoder().addTo(mymap);  //Añadir el Geocoder

L.Routing.control({
    // waypoints: [
    //   L.latLng(57.74, 11.94),
    //   L.latLng(57.6792, 11.949)
    // ],
    routeWhileDragging: true,
    geocoder: L.Control.Geocoder.nominatim()
  }).addTo(mymap);

  var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);

var marker = L.marker([-34.5979, -58.435782]).addTo(mymap);
marker.bindPopup("<b>ComIT</b><br>Aquí hacemos futuro!").openPopup();

// L.Routing.control({
//     routeWhileDragging: true,
//     geocoder: L.Control.Geocoder.nominatim(),
//     waypointNameFallback: function(latLng) {
//         function zeroPad(n) {
//             n = Math.round(n);
//             return n < 10 ? '0' + n : n;
//         }
//         function sexagesimal(p, pos, neg) {
//             var n = Math.abs(p),
//                 degs = Math.floor(n),
//                 mins = (n - degs) * 60,
//                 secs = (mins - Math.floor(mins)) * 60,
//                 frac = Math.round((secs - Math.floor(secs)) * 100);
//             return (n >= 0 ? pos : neg) + degs + '°' +
//                 zeroPad(mins) + '\'' +
//                 zeroPad(secs) + '.' + zeroPad(frac) + '"';
//         }

//         return sexagesimal(latLng.lat, 'N', 'S') + ' ' + sexagesimal(latLng.lng, 'E', 'W');
//     }
// }).addTo(mymap);

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});



// Handle Cordova Device Ready Event
$$('.hide-navbar').on('click', function () {
    app.navbar.hide('.navbar');
  });
  $$('.show-navbar').on('click', function () {
    app.navbar.show('.navbar');
  });

$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})


/**
     * Handles the sign in button press.
     */
    function toggleSignIn() {
        if (firebase.auth().currentUser) {
          // [START signout]
          firebase.auth().signOut();
          // [END signout]
        } else {
          var email = document.getElementById('email').value;
          var password = document.getElementById('password').value;
          if (email.length < 4) {
            alert('Please enter an email address.');
            return;
          }
          if (password.length < 4) {
            alert('Please enter a password.');
            return;
          }
          // Sign in with email and pass.
          // [START authwithemail]
          firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
            } else {
              alert(errorMessage);
            }
            console.log(error);
            document.getElementById('quickstart-sign-in').disabled = false;
            // [END_EXCLUDE]
          });
          // [END authwithemail]
        }
        document.getElementById('quickstart-sign-in').disabled = true;
      }
      /**
       * Handles the sign up button press.
       */
      function handleSignUp() {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START createwithemail]
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          // [END_EXCLUDE]
        });
        // [END createwithemail]
      }
      /**
       * Sends an email verification to the user.
       */
      function sendEmailVerification() {
        // [START sendemailverification]
        firebase.auth().currentUser.sendEmailVerification().then(function() {
          // Email Verification sent!
          // [START_EXCLUDE]
          alert('Email Verification Sent!');
          // [END_EXCLUDE]
        });
        // [END sendemailverification]
      }
      function sendPasswordReset() {
        var email = document.getElementById('email').value;
        // [START sendpasswordemail]
        firebase.auth().sendPasswordResetEmail(email).then(function() {
          // Password Reset Email Sent!
          // [START_EXCLUDE]
          alert('Password Reset Email Sent!');
          // [END_EXCLUDE]
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == 'auth/invalid-email') {
            alert(errorMessage);
          } else if (errorCode == 'auth/user-not-found') {
            alert(errorMessage);
          }
          console.log(error);
          // [END_EXCLUDE]
        });
        // [END sendpasswordemail];
      }
      /**
       * initApp handles setting up UI event listeners and registering Firebase auth listeners:
       *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
       *    out, and that is where we update the UI.
       */
      function initApp() {
        // Listening for auth state changes.
        // [START authstatelistener]
        firebase.auth().onAuthStateChanged(function(user) {
          // [START_EXCLUDE silent]
          document.getElementById('quickstart-verify-email').disabled = true;
          // [END_EXCLUDE]
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
            if (!emailVerified) {
              document.getElementById('quickstart-verify-email').disabled = false;
            }
            // [END_EXCLUDE]
          } else {
            // User is signed out.
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            document.getElementById('quickstart-sign-in').textContent = 'Sign in';
            document.getElementById('quickstart-account-details').textContent = 'null';
            // [END_EXCLUDE]
          }
          // [START_EXCLUDE silent]
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authstatelistener]
        document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
        document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
        document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
        document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
      }
      window.onload = function() {
        initApp();
      };

     