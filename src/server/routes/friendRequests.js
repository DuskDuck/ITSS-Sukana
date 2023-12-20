import express from "express";
import db from "../db/db.js";
import { getImageURL } from "../config/firebaseConfig.js";

const router = express.Router();

router.post("/api/friends/send", async (req, res) => {
  const { requester_id, receiver_id } = req.body;
  let connection;

  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    const [existingRequests] = await connection.execute(
      "SELECT * FROM friends WHERE requester_id = ? AND receiver_id = ?",
      [requester_id, receiver_id]
    );

    if (existingRequests.length > 0) {
      return res.status(400).json({ error: "Friend request already sent" });
    }

    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    await connection.execute(
      "INSERT INTO friends (requester_id, receiver_id, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
      [requester_id, receiver_id, "SENT", currentDate, currentDate]
    );

    await connection.commit();

    res.status(201).json({ success: "Friend request sent successfully" });
  } catch (error) {
    console.error(error);
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({ error: "Failed to process the request" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

router.put("/api/friends/respond", async (req, res) => {
  const { requester_id, receiver_id, status } = req.body;
  let connection;

  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    await connection.execute(
      "UPDATE friends SET status = ?, updated_at = ? WHERE requester_id = ? AND receiver_id = ?",
      [status, currentDate, requester_id, receiver_id]
    );

    await connection.commit();

    res.status(200).json({ success: "Response updated successfully" });
  } catch (error) {
    console.error(error);
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({ error: "Failed to process the request" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

router.get("/api/friends/recieved/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const [friendRequests] = await db.execute(
      `SELECT f.id, f.requester_id, f.receiver_id, f.status, f.created_at, 
             u.first_name AS requester_first_name, u.last_name AS requester_last_name, i.url AS requester_filename
             FROM friends f
             JOIN users u ON f.requester_id = u.id
             JOIN images i ON u.default_image_id = i.id
             WHERE f.receiver_id = ? AND f.status = 'SENT'`,
      [user_id]
    );

    const friendRequestsWithImages = await Promise.all(
      friendRequests.map(async (friend) => {
        if (friend.requester_filename) {
          friend.requester_image_url = await getImageURL(
            friend.requester_filename
          );
        }
        return friend;
      })
    );

    res.status(200).json({ friendRequestsWithImages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch friend requests" });
  }
});

export default router;
