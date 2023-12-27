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

router.get('/api/chat/conversations/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const conversations = await Chat.getConversationsWithLastMessages(userId);
    res.status(200).json(conversations);
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/api/chat/messages', async (req, res) => {
  const { user1_id, user2_id } = req.query;

  try {
    const messages = await Chat.getMessagesByConversation({ user1_id, user2_id });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
