// routes/index.js
import express from 'express';
import randomUserRoutes from './random_user.js';
import filterRoutes from './filter.js';
import friendRequestsRoutes from './friendRequests.js';  // Import route lời mời kết bạn

const router = express.Router();

router.use('/api', randomUserRoutes);
router.use('/api', filterRoutes);
router.use('/api', friendRequestsRoutes);  // Sử dụng route lời mời kết bạn

export default router;
