import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
// import { asyncHandler } from "../utils/asyncHandler";

const verifyJWT = asyncHandler( async (req, _ , next) => {
    //here we check for cookies in the browser ,
    //we sent the cookies so it must be stored
    // so we conditionally check for accesstoken in cookies
    //if not cookies i.e mobile apps , we go for req.header which always has a key value pair as
    // Authorization: Bearer <jwt>
    //so we remove the "Bearer" and get the token
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if (!token) {
            throw new ApiError(401, "Authorization error")
        }
    
        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken._id.select("-password -refreshToken"))
    
        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "invalid access token")
    }
})


export {verifyJWT}