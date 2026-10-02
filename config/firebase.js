const admin = require('firebase-admin');
const serviceAccount = require('../backendex-585ee-firebase-adminsdk-fbsvc-19acea5a89.json');

const initializeFirebase = () => {
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
