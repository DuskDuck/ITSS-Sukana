import express from 'express';
import ViteExpress from 'vite-express';
import db from './db/db.js';
import userRoutes from './routes/users.js';
import matchRoutes from './routes/random_user.js';
import filterRoutes from './routes/filter.js';

const app = express();

db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
  } else {
    console.log('Connected to MySQL');
    connection.release();
  }
});

app.use(matchRoutes);
app.use('/api/users', userRoutes);
app.use(filterRoutes);

ViteExpress.listen(app, 3000, () =>
  console.log('Server is listening on port 3000...'),
);