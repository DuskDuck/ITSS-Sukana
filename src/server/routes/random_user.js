import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

router.get('/api/match/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const [rows] = await connection.execute(`
            SELECT u.*
            FROM users u
            WHERE u.id NOT IN (
                SELECT f.receiver_id
                FROM friends f
                WHERE f.requester_id = ?
                UNION
                SELECT f.requester_id
                FROM friends f
                WHERE f.receiver_id = ?
            )
            AND u.id <> ?
            ORDER BY RAND()
            LIMIT 1;
        `, [userId, userId, userId]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'No matching user found' });
        }
        const randomUser = rows[0];
        res.json(randomUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
try {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
} catch (error) {
    console.error('Error starting the server:', error);
}

export default router;