import express from 'express';
import friendship, { removeFriend } from '../models/friendship.js';
import { getUserId } from '../models/user.js';
import { tokenVerification } from '../useful/middleware.js';
import Op from 'sequelize';

const friendRoute = express.Router();

// add a friend
// this will just make people friends once someone presses "Add friend". This app is too irrelevant to make a complex friendship
friendRoute.route("/addfriend/:userId").post(tokenVerification, async (req, res) => {
  try {
    if (req.body.userId === req.params.userId)
      res.status(400).json('You cannot befriend yourself.')
    let duplicate;
    try {
      duplicate = friendship.findAll({
        where:
        {
          [Op.or]:        //where (uid1 = id1 AND uid2 = id2) OR (uid1 = id2 AND uid2 = id1)
            [
              {
                userId1: id1,
                userId2: id2
              },
              {
                userId1: id2,
                userId2: id1
              }
            ]
        }
      })
    }
    catch (e) {
      await friendship.create({
        userId1: req.body.userId,
        userId2: req.params.userId,
      });
      res.status(200).json(`New friend added: ${req.params.userId}`);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

friendRoute.route("/seefriends").get(tokenVerification, async (req, res) => {
  try {
    const id = req.body.userId;
    const friends = await friendship.findAll({
      where: {
        [Op.or]: [
          { userId1: id },
          { userId2: id }
        ]
      }
    });
    if (!friends)
      res.status(400).json('user has no friends');
    else
      res.status(201).json(friends);
  } catch (err) {
    res.status(500).json(err.message);
  }
});


//friendship ended with this friend...now the rest of whoever i follow are my best friends
//(remove a friend)
friendRoute.route("/deletefriend/:userId").delete(tokenVerification, async (req, res) => {
  try {
    const friendThatDeletes = await getUserId(req.body.userId);
    const friendToDelete = await getUserId(req.params.userId);
    if (friendToDelete && friendThatDeletes) {
      await removeFriend(friendThatDeletes, friendToDelete);
      res.status(200).json({
        message: `friend ${req.params.userId} deleted.`
      })
    }
    else {
      res.status(404).json({
        error: `friend ${req.params.userId} not found.`
      })
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

export default friendRoute;