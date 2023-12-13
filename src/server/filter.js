const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sukana'
});
connect.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        throw err;
    }
    console.log('Connected to MySQL database');
});

app.get('/api/filter', (req, res) => {
    const {gender, hobbies, city, minAge, maxAge } = req.query;

    let sql = 'SELECT * FROM users';

    const whereConditions = [];

    if(gender) {
        whereConditions.push(`gender = '${gender}`);
    }

    if (hobbies) {
        const hobbiesArray = hobbies.split(',').map(Number);
    const hobbiesConditions = hobbiesArray.map(hobbyId => `EXISTS (SELECT 1 FROM users_hobbies 
            WHERE users_hobbies.user_id = users.id AND users_hobbies.hobby_id = ${hobbyId})`);
    whereConditions.push(`(${hobbiesConditions.join(' OR ')})`);
    }

    if (city) {
        whereConditions.push(`city = '${city}'`);
    }

    if (minAge && maxAge) {
        whereConditions.push(`age BETWEEN ${minAge} AND ${maxAge}`);
    }

    if(whereConditions.length > 0) {
        sql += ' WHERE ' + whereConditions.join(' AND ');
    }

    connect.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Interal server error' });
            erturn;
        }
        res.json(results);
    });
});

try {
    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    });
} catch (error) {
    console.error('Error starting the server:', error);
}