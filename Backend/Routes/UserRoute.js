import { registerUser, loginUser} from "../controllers/userController.js";
import { Router } from "express";
import ContentBasedRecommender from 'content-based-recommender';
import {User} from "../models/User.js";
import multer from "multer";
import {upload} from "../middlewares/multer.middleware.js"
import {isUser} from "../middlewares/isUser.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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
router.get("/match", async (req, res) => {
  const userId = req.body.id;
  let posts = [];
  // const userId = "64031e16883108eec9d7e072"

  const data = await User.find({_id: { $ne: userId }})
    data.forEach(ele => {

      ele.interest.forEach(ele1 => {
        let obj1 = {
          id: ele._id,
          content: ele1
        }
        posts.push(obj1)
      })

  })

  const data2 = await User.findById(userId);
    let i = 0;
    
      let tags = [];
      // console.log(data.searchkey);
      data2.interest.forEach(ele => {
        let obj = {
          id: i,
          content: ele
        }
        i++;
        tags.push(obj)
      })
      const tagMap = tags.reduce((acc, tag) => {
        acc[tag.id] = tag

        return acc
      }, {})

      const recommender = new ContentBasedRecommender()

      recommender.trainBidirectional(posts, tags)

      posts.forEach(async post => {
        k++;
        const relatedTags = recommender.getSimilarDocuments(post.id)
        const tags = relatedTags.map(t => tagMap[t.id].content)
        // console.log(post.content, 'related tags:', tags)
        // if(final.length==3){
        // 	return;
        // }
        if (tags.length > 2 && final.length < 3) {
          const data3 = await User.findById(post.id);
        
              // console.log("h33");
              // console.log(final);

              // console.log(final.includes(data._id.toHexString()));
              if (final.includes(data3._id.toHexString()) == false) {
                const data4 = await User.findById(data3._id)
                result.push(data4)
                final.push(data3._id.toHexString());
              }

              // res.json(data);
            

            // console.log(final.size);



          

          // console.log(final.length);


        }

        
        // if(final.length >=3){

        // 	res.json(final);
        // 	console.log(final);
        // }

      })
      //   res.json(final);

  
  res.json({ "status": "success" });


});

router.get("/cloudinarylink", (req, res) => {
  return res.status(200).json({ message: "mera les goooooooooooooooooo" });
});
router.get("/", (req, res) => {
  return res.status(200).json({ message: "mera server les goooooooooooooooooo" });
});

router.post("/cloudinarylink", upload.single("photo"), async (req, res) => {
  try {
      const filePath = req.file.path;
 
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


export default router;