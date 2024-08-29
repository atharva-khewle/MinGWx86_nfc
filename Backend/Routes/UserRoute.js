import { registerUser, loginUser} from "../controllers/userController.js";
import { Router } from "express";
import ContentBasedRecommender from 'content-based-recommender';
import {User} from "../models/User.js";
import {upload} from "../middlewares/multer.middleware.js"
import {isUser} from "../middlewares/isUser.js";

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
router.get("/match", isUser, async (req, res) => {
  console.log(req.body)
  const userId = req.body.id;
  let posts = [];
  // const userId = "64031e16883108eec9d7e072"

  User.find({}, (er, data) => {
    data.forEach(ele => {

      ele.interests.forEach(ele1 => {
        let obj1 = {
          id: ele._id,
          content: ele1
        }
        posts.push(obj1)
      })

    })
  })

  User.findById(userId, (er, data) => {
    let i = 0;
    if (er) console.log(er);
    else {
      let tags = [];
      // console.log(data.searchkey);
      data.interests.forEach(ele => {
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
          console.log("helloooo");
          console.log(post.id);
          User.findById(post.id, (er, data) => {
            if (er) console.log(er);
            else {
              // console.log("h33");
              // console.log(final);

              // console.log(final.includes(data._id.toHexString()));
              if (final.includes(data._id.toHexString()) == false) {
                console.log(data._id.toHexString());
                User.findById(data._id, (er, response) => {
                  if (er) console.log(er);
                  else {
                    result.push(response)
                  }

                });
                final.push(data._id.toHexString());
              }


              // res.json(data);
            }

            // console.log(final.size);



          })

          // console.log(final.length);


        }

        // if(final.length >=3){

        // 	res.json(final);
        // 	console.log(final);
        // }

      })
      //   res.json(final);


    }
  })
  res.json({ "status": "success" });


});


export default router;