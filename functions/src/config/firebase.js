const admin = require("firebase-admin");
const serviceAccount = require("./admin.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://babrayanlocal-default-rtdb.europe-west1.firebasedatabase.app",
});

// Export Firestore instance
const db = admin.firestore();

module.exports = db; // Export Firestore instance
