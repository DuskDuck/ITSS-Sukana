import express from 'express';
import User from '../models/user.js';

const router = express.Router();

//route get dữ liệu tất cả user cùng hobby
router.get('/', async (req, res) => {
    try {
      const usersWithHobbies = await User.getAllUsersWithHobbies();
      res.json(usersWithHobbies);
    } catch (error) {
      console.error('Error fetching users with hobbies:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  export default router;