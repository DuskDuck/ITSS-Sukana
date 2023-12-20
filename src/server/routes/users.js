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
// route get du lieu thong tin user
router.get('/:userId,', async (req, res) => {
  try {
    const userId = parseInt(req.query.id);
    if(isNaN(userId)){
      return res.status(400).json({error:'Invalid user id.'});
    }
    const userInformations = await User.getUserInfomations();
    res.json(userInformations);
    res.status(200).json('Success');
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({error:'Internal Server Error'});
  }
}) 
  
  export default router;