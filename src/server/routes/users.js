import express from 'express';
import User from '../models/user.js';

const router = express.Router();

// route get du lieu thong tin user
router.get('/api/users/:userId,', async (req, res) => {
  try {
    const userId = parseInt(req.query.userId);

    const userInformations = await User.getUserInfomations(userId);
    
    if (!randomUser) {
      return res.status(404).json({ error: 'No matching user found' });
    }
    
    res.json(userInformations);
    res.status(200).json('Success');
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({error:'Internal Server Error'});
  }
}) 
  
  export default router;