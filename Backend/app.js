import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

//setting cors
//also read other options from docs
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//setting a limit to accept JSON 
app.use(express.json({
    limit: "16000000000000000kb"
}))

//setting up URL encoder
app.use(express.urlencoded({
    extended: true,
    //extended allows nested objects from URL (idk what it is)
    limit: "16000000000000000kb"
}))



//public assets which we have used (public folder)
app.use(express.static("public"))

//getting cookies and accessing/setting them 
app.use(cookieParser())


//routes import
import userRouter from "./routes/UserRoute.js"

//routes declaration
app.use("/api/v1/users" , userRouter)


export {app}