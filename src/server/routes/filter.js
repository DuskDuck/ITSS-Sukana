import express from 'express';
import User from '../models/user.js';

const app = express();
const router = express.Router();

router.get('/api/filter', async (req, res) => {
    const { gender, hobbies, city, minAge, maxAge } = req.query;

    try {
        const usersWithHobbies = await User.getAllUsersWithHobbies({
            gender,
            hobbies,
            city,
            minAge,
            maxAge,
        });

        const firstUserWithHobbies = usersWithHobbies[0];

        res.json(firstUserWithHobbies);
    } catch (error) {
        console.error('Error querying users with hobbies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
