import db from "../db/db.js";
import { getImageURL } from "../config/firebaseConfig.js";

class User {
  static async getUserInformation(userId) {
    const [userRows] = await db.query(
      `
      SELECT * FROM users WHERE id = ?
    `,
      [userId]
    );

    if (userRows.length === 0) {
      return null;
    }

    try {
      const [rows] = await db.query(
        `
        SELECT 
          u.id, u. email, u.first_name, u.last_name, u.age, u.birthday, u.gender, u.address, u.city, u.phone, u.about,
          GROUP_CONCAT(hobbies.name) as hobbies, 
          images.url as default_image_url,
          GROUP_CONCAT(DISTINCT user_images.image_id) as image_ids,
          GROUP_CONCAT(DISTINCT images2.url) as image_urls
        FROM users u
        LEFT JOIN user_hobbies ON u.id = user_hobbies.user_id
        LEFT JOIN hobbies ON user_hobbies.hobby_id = hobbies.id
        LEFT JOIN images ON u.default_image_id = images.id
        LEFT JOIN user_images ON u.id = user_images.user_id
        LEFT JOIN images as images2 ON user_images.image_id = images2.id
        WHERE u.id = ?
      `,
        [userId]
      );

      if (rows.length > 0) {
        const user = rows[0];
        if (user.default_image_url) {
          user.default_image_url = await getImageURL(user.default_image_url);
        }
        if (user.image_urls) {
          user.image_urls = user.image_urls.split(",");
          for (let i = 0; i < user.image_urls.length; i++) {
            user.image_urls[i] = await getImageURL(user.image_urls[i]);
          }
        }
        return user;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  static async getAllUsersWithHobbies({
    gender,
    hobbies,
    city,
    minAge,
    maxAge,
  }) {
    try {
      let sql = `
        SELECT 
          users.id, users. email, users.first_name, users.last_name, users.age, users.birthday, users.gender, users.address, users.city, users.phone, users.about, 
          GROUP_CONCAT(hobbies.name) as hobbies, 
          images.url as filename
        FROM users
        LEFT JOIN user_hobbies ON users.id = user_hobbies.user_id
        LEFT JOIN hobbies ON user_hobbies.hobby_id = hobbies.id
        LEFT JOIN images ON users.default_image_id = images.id
      `;

      const whereConditions = [];
      let hobbiesConditions;

      if (gender) {
        whereConditions.push(`gender = '${gender}'`);
      }

      if (hobbies) {
        const hobbiesArray = hobbies.split(",").map(Number);
        hobbiesConditions = hobbiesArray.map(
          (hobbyId) => `EXISTS (SELECT 1 FROM user_hobbies 
            WHERE user_hobbies.user_id = users.id AND user_hobbies.hobby_id = ${hobbyId})`
        );
        whereConditions.push(`(${hobbiesConditions.join(" OR ")})`);
      }

      if (city) {
        whereConditions.push(`city = '${city}'`);
      }

      if (minAge && maxAge) {
        whereConditions.push(`age BETWEEN ${minAge} AND ${maxAge}`);
      }

      if (whereConditions.length > 0) {
        sql += " WHERE " + whereConditions.join(" AND ");
      }

      sql += " GROUP BY users.id";

      if (hobbies) {
        sql += ` ORDER BY COUNT(${hobbiesConditions.join(" OR ")}) DESC`;
      }

      const [usersWithHobbies] = await db.query(sql);

      const usersWithUrl = await Promise.all(
        usersWithHobbies.map(async (user) => {
          if (user.filename) {
            user.default_image_url = await getImageURL(user.filename);
          }
          return user;
        })
      );

      return usersWithUrl;
    } catch (error) {
      throw error;
    }
  }

  static async getRandomUserNotInFriends(userId) {
    try {
      const [userRows] = await db.query(
        `
        SELECT * FROM users WHERE id = ?
      `,
        [userId]
      );

      if (userRows.length === 0) {
        return null;
      }

      const [rows] = await db.query(
        `
        SELECT 
          u.id, u. email, u.first_name, u.last_name, u.age, u.birthday, u.gender, u.address, u.city, u.phone, u.about,
          images.url as filename
        FROM users u
        LEFT JOIN images ON u.default_image_id = images.id
        WHERE u.id NOT IN (
          SELECT f.receiver_id
            FROM friends f
            WHERE f.requester_id = ? AND f.status = 'ACCEPTED'
            UNION
            SELECT f.requester_id
            FROM friends f
            WHERE f.receiver_id = ? AND f.status = 'ACCEPTED'
        )
        AND u.id <> ?
        ORDER BY RAND()
        LIMIT 1;
      `,
        [userId, userId, userId]
      );

      if (rows.length > 0) {
        const user = rows[0];
        if (user.filename) {
          user.default_image_url = await getImageURL(user.filename);
        }
        return user;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default User;
