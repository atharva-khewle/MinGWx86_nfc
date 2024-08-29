import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User}  from "../models/User.js";// Updated import
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    const { name,email, password, gender } = req.body;

    // Validation
    if (
        [name, email, password].some((field) => {
            return field?.trim() === "";
        })
    ) {
        throw new ApiError(400, `All fields are required`);
    }

    const existedUser = await User.findOne({
        $or: [{ email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    const avatarLocalPath = req.files.pfp[0].path;
    console.log("Reached Here")

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    
    console.log(avatar)
    if (!avatar) {
        throw new ApiError(400, "Avatar is required");
    }

    const user = await User.create({
        name: name,
        interest:[],
        gender,
        email,
        password,
        pfp: avatar.url,
        gamesComingUp: [],
        recentMatches: [],
        recentGames: [],
        userStats: [],
        friends: []
    });

    console.log("user: \n", user);
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    console.log("createdUser: \n", createdUser);

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );
});

const generateAccessAndRefreshTokens = async (userId) => {
    try {

        //finds user by userId

        // console.log(userId)
        const user = await User.findById(userId);
        // console.log(user)
        // generates access and refresh tokens by the methods that are created by me in the user.model.js
        const accessToken = user.generateAccessToken();
        const refreshToken =user.generateRefreshToken();

        console.log(accessToken)


        //saves refresh token on data base
        user.refreshToken = refreshToken;

        //saves user to database and while using save() method , all the model parameters kick in , so we switch off the validation so that the parameters dont kick in 
        await user.save({
            validateBeforeSave: false
            //true/false dono same ho raha hai 
        })



        return {
            accessToken,
            refreshToken
        }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens")
    }
}


const loginUser = asyncHandler(async (req, res) => {
    //req.body se data laao
    //check username or email
    //find user
    //check pass
    //access and refresh token generate and send user
    //send cookie
    //send res

    // console.log(req.body)
    console.log(req.body)
    const {email, name, password} = req.body
    // console.log(email)
    if(!name && !email){
        throw new ApiError(400, "Username or Email is required")
    }


    const user = await User.findOne({
        $or: [{name}, {email}]
    })

    if(!user){
        throw new ApiError(404, "User not found")
    }

    

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid Password")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    //makes the cookies only modifiable by the server and not the frontend
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie( "accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, 
        {
            user: loggedInUser, accessToken, refreshToken
        },
        "User Logged in SUCCESSFULLY"
    ),
        
    )
})


const logoutUser = asyncHandler(async (req,res) => {
    //we got the access to user using the middleware that we created in auth.middleware.js

    //findById bhi kar sakte thhe lekin kia nahi because fir wahi bar bar user lao , usme se password aur token hatao aur bakchodi , yaha direct hoga
    await User.findByIdAndUpdate(
        req.user._id, //found user
        {
            $set: {
                refreshToken: undefined
            }
        }, //updated value
        {
            new: true
        } //jo return me response milega , usme new and update value hogi bina refresh token ke
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "User logged out")
    )

})


const refreshAccessToken = asyncHandler( async (req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized Request")
    }

    try {
        
    } catch (error) {
        throw new ApiError(400, error?.message || "Invalid Refresh Token")
    }

} )

const changeCurrentPassword = asyncHandler(
async (req, res) => {
    const {oldPassword , newPassword} = req.body

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid Old Pass")
    }

    user.password = newPassword;
    await user.save(
        {
            validateBeforeSave: false
        }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Password Changed Successfully"
        )
    )
}
)

const getCurrentUser = asyncHandler(
    async (req, res) => {
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                req.user,
                "User fetched successfully"
            )
        )
    }
)

export { registerUser , getCurrentUser, changeCurrentPassword , refreshAccessToken , logoutUser,loginUser};
