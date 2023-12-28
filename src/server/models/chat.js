import db from "../db/db.js";

class Chat {
  static async sendMessage({ user1_id, user2_id, content }) {
    try {
      const checkExistenceQuery = `
        SELECT id
        FROM conversations
        WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?);
      `;

      const [result] = await db.query(checkExistenceQuery, [user1_id, user2_id, user2_id, user1_id]);
      if (result.length > 0) {
        //console.log('Record exists in the conversations table.');

        // Update the updated_at field
        const updateQuery = `
          UPDATE conversations
          SET updated_at = NOW()
          WHERE id = ?;
        `;

        await db.query(updateQuery, [result[0].id]);
        //console.log('The updated_at field has been successfully updated.');
      } else {
        //console.log('Record does not exist in the conversations table. Creating a new record...');

        // Create a new record
        const insertQuery = `
          INSERT INTO conversations (user1_id, user2_id, created_at, updated_at)
          VALUES (?, ?, NOW(), NOW());
        `;

        await db.query(insertQuery, [user1_id, user2_id]);
        //console.log('A new record has been successfully created.');
      }

      const insertMessageQuery = `
        INSERT INTO messages (from_user_id, conversation_id, message_type, status, content, created_at)
        VALUES (?, (SELECT id FROM conversations WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)), 'TEXT', 'SENDING', ?, NOW());
      `;

      await db.query(insertMessageQuery, [user1_id, user1_id, user2_id, user2_id, user1_id, content]);
      //console.log('Message has been successfully sent.');
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }

  static async getConversationsWithLastMessages(user_id) {
    try {
      const getConversationsQuery = `
      SELECT c.id AS conversation_id,
        c.user1_id,
        c.user2_id,
        m.id AS message_id,
        m.from_user_id,
        m.message_type,
        m.status,
        m.content,
        m.created_at AS last_message_created_at
      FROM conversations c
      LEFT JOIN (
      SELECT conversation_id, MAX(created_at) AS created_at
      FROM messages
      GROUP BY conversation_id
      ) m1 ON c.id = m1.conversation_id
      LEFT JOIN messages m ON m1.conversation_id = m.conversation_id AND m1.created_at = m.created_at
      WHERE c.user1_id = ? OR c.user2_id = ?
      ORDER BY last_message_created_at DESC;
      `;

      const [conversations] = await db.query(getConversationsQuery, [user_id, user_id]);

      return conversations;
    } catch (error) {
      console.error('An error occurred while fetching conversations:', error);
      throw error;
    }
  }

  static async getMessagesByConversation({ user1_id, user2_id }) {
    try {
      const getMessagesQuery = `
        SELECT *
        FROM messages
        WHERE conversation_id IN (
          SELECT id
          FROM conversations
          WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)
        )
        ORDER BY created_at DESC;
      `;

      const [result] = await db.execute(getMessagesQuery, [user1_id, user2_id, user2_id, user1_id]);
      return result;
    } catch (error) {
      console.error('An error occurred while fetching messages:', error);
      throw error;
    }
  }
}

  

export default Chat;
