import express from "express";
import User from "../models/user.js";
import express from "express";
import db from "../db/db.js";
import User from "../models/user.js";

const router = express.Router();

router.get("/api/filter", async (req, res) => {
  const { gender, hobbies, city, minAge, maxAge } = req.query;

  try {
    const usersWithHobbies = await User.getAllUsersWithHobbies({
      gender,
      hobbies,
      city,
      minAge,
      maxAge,
    });

    res.json(usersWithHobbies);
  } catch (error) {
    console.error("Error querying users with hobbies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/api/match/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    // Get a random user who is not in the friend list of the given userId
    const randomUser = await User.getRandomUserNotInFriends(userId);

    if (!randomUser) {
      return res.status(404).json({ error: "No matching user found" });
    }

    res.json(randomUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/api/users/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    const userInformations = await User.getUserInformation(userId);

    if (!userInformations) {
      return res.status(404).json({ error: "No matching user found" });
    }

    res.json(userInformations);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
