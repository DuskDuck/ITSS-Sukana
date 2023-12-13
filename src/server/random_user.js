const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3307,
    password: '123456',
    database: 'datingapp',
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        throw err;
    }
    console.log('Connected to MySQL database');
});
app.get('/api/random-user/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        // Query random user from the database
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
