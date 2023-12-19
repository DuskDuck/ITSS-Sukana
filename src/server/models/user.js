import db from '../db/db.js';

class User {
  static async getAllUsersWithHobbies() {
    try {
      const query = `
        SELECT users.*, GROUP_CONCAT(hobbies.name) as hobbies
        FROM users
        LEFT JOIN user_hobbies ON users.id = user_hobbies.user_id
        LEFT JOIN hobbies ON user_hobbies.hobby_id = hobbies.id
        GROUP BY users.id;
      `;

      const [usersWithHobbies] = await db.query(query);

      return usersWithHobbies;
    } catch (error) {
      throw error;
    }
  }
}

export default User;