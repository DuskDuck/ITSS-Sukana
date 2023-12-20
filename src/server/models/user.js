import db from '../db/db.js';

class User {
  static async getUserInfomations({userId}) {
    try {
      let sql = `
      SELECT Users.name, Users.age, Users.address, Users.city,Users.about, user_Images.image_id, Hobbies.name AS hobby_name
      FROM Users
      LEFT JOIN user_Images ON Users.id = user_Images.user_id
      LEFT JOIN Users_Hobbies ON Users.id = Users_Hobbies.user_id
      LEFT JOIN Hobbies ON Users_Hobbies.hobby_id = Hobbies.id
      WHERE Users.id = :'${useId}';      
      `
      const [userInformations] = db.query(sql);
    } catch (error) {
      throw error;
    }
  }
  static async getAllUsersWithHobbies({ gender, hobbies, city, minAge, maxAge }) {
    try {
      let sql = `
        SELECT users.*, GROUP_CONCAT(hobbies.name) as hobbies
        FROM users
        LEFT JOIN user_hobbies ON users.id = user_hobbies.user_id
        LEFT JOIN hobbies ON user_hobbies.hobby_id = hobbies.id
      `;

      const whereConditions = [];
      let hobbiesConditions; // Declare the variable here

      if (gender) {
        whereConditions.push(`gender = '${gender}'`);
      }

      if (hobbies) {
        const hobbiesArray = hobbies.split(',').map(Number);
        hobbiesConditions = hobbiesArray.map(
          hobbyId => `EXISTS (SELECT 1 FROM user_hobbies 
            WHERE user_hobbies.user_id = users.id AND user_hobbies.hobby_id = ${hobbyId})`
        );
        whereConditions.push(`(${hobbiesConditions.join(' OR ')})`);
      }

      if (city) {
        whereConditions.push(`city = '${city}'`);
      }

      if (minAge && maxAge) {
        whereConditions.push(`age BETWEEN ${minAge} AND ${maxAge}`);
      }

      if (whereConditions.length > 0) {
        sql += ' WHERE ' + whereConditions.join(' AND ');
      }

      sql += ' GROUP BY users.id';

      if (hobbies) {
        sql += ` ORDER BY COUNT(${hobbiesConditions.join(' OR ')}) DESC`;
      }

      const [usersWithHobbies] = await db.query(sql);

      return usersWithHobbies;
    } catch (error) {
      throw error;
    }
  }
}

export default User;
