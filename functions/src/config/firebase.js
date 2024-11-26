var admin = require("firebase-admin");

var serviceAccount = require("./admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://babrayanlocal-default-rtdb.europe-west1.firebasedatabase.app"
});

module.exports = admin;