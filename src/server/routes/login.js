import express from 'express';
import db from '../db/db.js';

const router = express.Router();

router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kiểm tra xem người dùng tồn tại trong CSDL hay không
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    //console.log(rows);
    if (rows.length === 0) {
      return res.status(400).json({ error: 'No matched user' });
    }

    const user = rows[0];

    //So sánh mật khẩu với dữ liệu trong CSDL
    const isValidPassword = password === user.password;
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Wrong password' });
    }

    // Trả về thông tin người dùng nếu đăng nhập thành công
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
