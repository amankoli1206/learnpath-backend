const { admin } = require('../config/firebase');

exports.sendNotification = async (req, res) => {
  try {
    const { fcmToken, title, body } = req.body;

    if (!fcmToken) {
      return res.status(400).json({ error: "FCM Token is required to send notification" });
    }

    const message = {
      notification: {
        title: title || 'Milestone Achieved!',
        body: body || 'Congratulations on reaching your goal!'
      },
      token: fcmToken
    };

    const response = await admin.messaging().send(message);
    res.json({ message: "Push notification sent successfully via Firebase!", response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
