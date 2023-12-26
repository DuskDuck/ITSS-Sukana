import db from "../db/db.js";

class Chat {
  static async sendMessage({ user1_id, user2_id, content }) {
    try {
      const checkExistenceQuery = `
        SELECT id
        FROM conversations
        WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?);
      `;

      const [result] = await db.execute(checkExistenceQuery, [user1_id, user2_id, user2_id, user1_id]);
      console.log(result);
      if (result.length > 0) {
        console.log('Record exists in the conversations table.');

        // Update the updated_at field
        const updateQuery = `
          UPDATE conversations
          SET updated_at = NOW()
          WHERE id = ?;
        `;

        await db.query(updateQuery, [result[0].id]);
        console.log('The updated_at field has been successfully updated.');
      } else {
        console.log('Record does not exist in the conversations table. Creating a new record...');

        // Create a new record
        const insertQuery = `
          INSERT INTO conversations (user1_id, user2_id, created_at, updated_at)
          VALUES (?, ?, NOW(), NOW());
        `;

        await db.query(insertQuery, [user1_id, user2_id]);
        console.log('A new record has been successfully created.');
      }

      const insertMessageQuery = `
        INSERT INTO messages (from_user_id, conversation_id, message_type, status, content, created_at)
        VALUES (?, (SELECT id FROM conversations WHERE user1_id = ? AND user2_id = ?), 'TEXT', 'SENDING', ?, NOW());
      `;

      await db.query(insertMessageQuery, [user1_id, user1_id, user2_id, content]);
      console.log('Message has been successfully sent.');
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }
}

export default Chat;
