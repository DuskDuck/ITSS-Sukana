import express from 'express';
import Chat from '../models/chat.js';

const router = express.Router();

router.post('/api/chat', async (req, res) => {
  const { from_user, to_user, content } = req.body;

  try {
    await Chat.sendMessage({ user1_id: from_user, user2_id: to_user, content });
    res.status(200).send('Message sent successfully!');
  } catch (err) {
    console.error('Internal server error:', err);
    res.status(500).send('Internal server error!');
  }
});

export default router;
