import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.get('/api/match/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);

        // Get a random user who is not in the friend list of the given userId
        const randomUser = await User.getRandomUserNotInFriends(userId);

        if (!randomUser) {
            return res.status(404).json({ error: 'No matching user found' });
        }

        res.json(randomUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
