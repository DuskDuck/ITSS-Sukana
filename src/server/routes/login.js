import express from 'express';
import bcrypt from 'bcrypt';
import db from '../db/db.js';

const router = express.Router();

router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Kiểm tra xem người dùng tồn tại trong CSDL hay không
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(400).json({ error: 'unauthenticated_user' });
        }

        const user = rows[0];
        // Ở đây, bạn cần thực hiện mã hóa mật khẩu được gửi đến và so sánh nó với mật khẩu trong CSDL.
        // Đây là một bước quan trọng để đảm bảo an ninh.
        // Giả sử bạn sử dụng bcrypt để mã hóa mật khẩu:
        // So sánh mật khẩu đã mã hóa từ CSDL với mật khẩu được gửi đến
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'unauthenticated_user' });
        }

        // Trả về thông tin người dùng nếu đăng nhập thành công
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
