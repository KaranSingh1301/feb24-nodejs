const FollowSchema = require("../Schemas/FollowSchema");

const followUser = ({ followerUserId, followingUserId }) => {
  return new Promise(async (resolve, reject) => {
    //check if A following B
    try {
      const followExist = await FollowSchema.findOne({
        followerUserId,
        followingUserId,
      });
      if (followExist) return reject("Already following the user");

      const followObj = new FollowSchema({
        followerUserId,
        followingUserId,
        creationDateTime: Date.now(),
      });

      const followDb = await followObj.save();
      resolve(followDb);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { followUser };
