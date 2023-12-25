import db from "../db/db.js";

class Chat {
  static async sendMessege({ user1_id, user2_id, content }/* user 1 là người gửi user 2 là người nhận */) {
    try {
      const checkExistenceQuery = `
            SELECT id, updated_at
            FROM conversations
            WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?);
          `;

      db.query(checkExistenceQuery, [user1_id, user2_id, user2_id, user1_id], (err, result) => {
        if (err) {
          console.error(err);
        } else {
          if (result.length > 0) {
            console.log('Bản ghi tồn tại trong bảng conversations.');

            // Cập nhật trường updated_at
            const updateQuery = `
                UPDATE conversations
                SET updated_at = NOW()
                WHERE id = ?;
                `;

            db.query(updateQuery, [result[0].id], (err, updateResult) => {
              if (err) {
                console.error('Lỗi khi cập nhật trường updated_at:', err);
              } else {
                console.log('Trường updated_at đã được cập nhật thành công.');
              }
            });
          } else {
            console.log('Bản ghi không tồn tại trong bảng conversations. Tạo mới bản ghi...');

            // Tạo mới bản ghi
            const insertQuery = `
                        INSERT INTO conversations (user1_id, user2_id, created_at, updated_at)
                        VALUES (?, ?, NOW(), NOW());
                        `;

            db.query(insertQuery, [user1_id, user2_id], (err, insertResult) => {
              if (err) {
                console.error('Lỗi khi tạo mới bản ghi:', err);
              } else {
                console.log('Bản ghi đã được tạo mới thành công.');
              }
            });
          }
        }
      });
      const insert_record_into_messeges_table = `
            INSERT INTO messeges ('${user1_id}',
              (SELECT id FROM conversations
               WHERE user1_id = '${user1_id}' AND user2_id = '${user2_id}';  
              ),?,?,'${content}',(SELECT updated_at FROM conversations WHERE user1_id = '${user1_id}' AND  user2_id = '${user2_id}'))
          `
    } catch (error) {
      throw error;
    }
  };
}

export default Chat;