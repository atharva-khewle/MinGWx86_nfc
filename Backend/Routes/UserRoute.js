import { registerUser, loginUser} from "../controllers/userController.js";
import { Router } from "express";
import ContentBasedRecommender from 'content-based-recommender';
import {User} from "../models/User.js";
import multer from "multer";
import {upload} from "../middlewares/multer.middleware.js"
import {isUser} from "../middlewares/isUser.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
  upload.fields([
    {
        name: "pfp",
        maxCount: 1
    },        
]),
    registerUser
)
router.route("/login").post(loginUser)

let final = []
let result = [];
let k = 0;

//match users according to hobbies, genderpref
router.get("/match", verifyJWT, async (req, res) => {
  const userId = req.user._id;
  console.log(userId);
  let posts = [];
  let final = [];

  const data = await User.find({ _id: { $ne: userId } });

  // Collect all posts based on user interests
  data.forEach(ele => {
      ele.interest.forEach(ele1 => {
          posts.push({
              id: ele._id,
              content: ele1
          });
      });
  });

  const data2 = await User.findById(userId);
  let i = 0;
  let tags = [];

  // Prepare tags for the recommender
  data2.interest.forEach(ele => {
      tags.push({
          id: i,
          content: ele
      });
      i++;
  });

  const tagMap = tags.reduce((acc, tag) => {
      acc[tag.id] = tag;
      return acc;
  }, {});

  const recommender = new ContentBasedRecommender();
  recommender.trainBidirectional(posts, tags);

  // Create a promise for each recommendation process
  await Promise.all(posts.map(async post => {
      const relatedTags = recommender.getSimilarDocuments(post.id);
      const tags = relatedTags.map(t => tagMap[t.id]?.content);

      // Check if the current post is relevant
      if (tags.length > 2 && final.length < 3) {
          const data3 = await User.findById(post.id);

          if (!final.includes(data3._id.toHexString())) {
              result.push(data3);
              final.push(data3._id.toHexString());
          }
      }
  }));

  const uniqueFinal = [...new Set(final)];
  console.log("FINAL:");
  console.log(uniqueFinal);

  res.json({ status: "success", users: uniqueFinal });
});


router.get("/cloudinarylink", (req, res) => {
  return res.status(200).json({ message: "mera les goooooooooooooooooo" });
});
router.get("/", (req, res) => {
  return res.status(200).json({ message: "mera server les goooooooooooooooooo" });
});

router.post("/cloudinarylink", upload.single("pfp"), async (req, res) => {
  try {
      const filePath = req.file.path;

      console.log(filePath)
      const cloudinaryResponse = await uploadOnCloudinary(filePath);

      if (cloudinaryResponse) {
          return res.status(200).json({ url: cloudinaryResponse.url });
      } else {
          return res.status(500).json({ message: "Upload failed" });
      }
  } catch (error) {
      console.error("Error during file upload:", error);
      res.status(500).json({ message: "Server error" });
  }
});

router.get("/getUser",verifyJWT,async(req,resp) => {
  console.log(req.user.id)
  const userId = req.user.id; 
  const user = await User.findById(userId);
  resp.send(user);
})

router.post("/addUserStats",verifyJWT,async (req,resp) => {
  const body = req.body;
  const userId = req.user.id; 
  
  // Find the user by ID
  const user = await User.findById(userId);
  
  if (!user) {
      throw new ApiError(404, "User not found");
  }
  
  // Find the index of the game in userStats
  const gameIndex = user.userStats.findIndex(stat => stat.game === body.game);

  if (gameIndex !== -1) {
      // If the game exists in userStats, increment the wins
      user.userStats.set(gameIndex, {
        game: body.game,
        wins: user.userStats[gameIndex].wins + 1,
    });
  } else {
      // If the game does not exist, you can choose to add a new entry or handle it accordingly
      user.userStats.push({
        "game":body.game,
        "wins":1
      })
  }
  
  // Save the updated user back to the database
  await user.save();

  const updatedUser = await User.findById(userId);
  
  resp.status(200).json({
      success: true,
      message: "User stats updated successfully",
      user: user,
  });
  

})


export default router;