// Main Server Setup
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const { initializeFirebase } = require('./config/firebase');
const authRoutes = require('./routes/authRoutes');
const skillsRoutes = require('./routes/skillsRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const learningLogRoutes = require('./routes/learningLogRoutes');
const milestoneRoutes = require('./routes/milestoneRoutes');
const profileRoutes = require('./routes/profileRoutes');
const progressRoutes = require('./routes/progressRoutes');
const shareRoutes = require('./routes/shareRoutes');
const adminRoutes = require('./routes/adminRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const analysisRoutes = require('./routes/analysisRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/learning-logs', learningLogRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/skill-profiles', profileRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/share', shareRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/analysis', analysisRoutes);

connectDB();
initializeFirebase();

app.get('/', (req, res) => res.send('API Running'));

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
