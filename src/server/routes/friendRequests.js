import express from 'express';
import db from '../db/db.js';

const router = express.Router();

// API để gửi lời mời kết bạn
router.post('/friend-request/send', async (req, res) => {
    const { requester_id, receiver_id } = req.body;

    try {
        // Kiểm tra xem lời mời đã tồn tại hay chưa
        const [existingRequests] = await db.execute(
            'SELECT * FROM friends WHERE requester_id = ? AND receiver_id = ?',
            [requester_id, receiver_id]
        );

        if (existingRequests.length > 0) {
            return res.status(400).json({ error: 'Friend request already sent' });
        }

        // Tạo lời mời mới
        await db.execute(
            'INSERT INTO friends (requester_id, receiver_id, status) VALUES (?, ?, ?)',
            [requester_id, receiver_id, 'SENT']
        );

        res.status(200).json({ success: 'Friend request sent successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API để phản hồi lời mời kết bạn
router.put('/friend-request/respond', async (req, res) => {
    const { requester_id, receiver_id, status } = req.body;

    try {
        // Cập nhật trạng thái của lời mời
        await db.execute(
            'UPDATE friends SET status = ? WHERE requester_id = ? AND receiver_id = ?',
            [status, requester_id, receiver_id]
        );

        res.status(200).json({ success: 'Response updated successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
