import express from 'express';
import friendship, { removeFriend } from '../models/friendship.js';
import { getUserId } from '../models/user.js';

const friendRoute = express.Router();

// add a friend
// this will just make people friends once someone presses "Add friend". This app is too irrelevant to make a complex friendship
friendRoute.route("/addfriend/:userId").post(async (req, res) => {
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
      res.status(200).json(`New friend added: ${req.params.idUser}`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


//friendship ended with this friend...now the rest of whoever i follow are my best friends
//(remove a friend)
friendRoute.route("/deleteFriend/:userId").delete(async (req, res) => {
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
    console.log(err);
    res.status(500).json(error);
  }
});

export default friendRoute;