const express = require("express");
const User = require("../Models/UserModel");
const { followUser } = require("../Models/FollowModel");
const FollowRouter = express.Router();

FollowRouter.post("/follow-user", async (req, res) => {
  const followerUserId = req.session.user.userId;
  const followingUserId = req.body.followingUserId;

  if (followerUserId.toString() === followingUserId.toString()) {
    return res.send({
      status: 400,
      message: "Can not process the request",
    });
  }

  try {
    await User.verifyUserId({ userId: followerUserId });
  } catch (error) {
    return res.send({
      status: 400,
      message: "Follower User id not found",
    });
  }

  try {
    await User.verifyUserId({ userId: followingUserId });
  } catch (error) {
    return res.send({
      status: 400,
      message: "Following User id not found",
    });
  }

  try {
    const followDb = await followUser({ followerUserId, followingUserId });
    console.log(followDb);
    return res.send({
      status: 200,
      message: "Follow successfull",
      data: followDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Database error",
      error: error,
    });
  }
});

module.exports = FollowRouter;

//test1--->test2
//test1--->test3
