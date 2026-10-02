const admin = require('firebase-admin');
let serviceAccount;

try {
  // Try to load the local JSON file
  serviceAccount = require('../backendex-585ee-firebase-adminsdk-fbsvc-19acea5a89.json');
} catch (error) {
  console.log("Firebase JSON key not found (this is normal in production). Skipping Firebase auth.");
}

const initializeFirebase = () => {
  if (!serviceAccount) {
    console.log("Running without Firebase Admin capabilities.");
    return;
  }
  
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin Initialized successfully');
  } catch (error) {
    console.error('Firebase initialization error:', error.message);
  }
};

module.exports = { admin, initializeFirebase };
