import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

//setting cors
//also read other options from docs
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//setting a limit to accept JSON 
app.use(express.json({
    limit: "16000000000000000kb"
}))

//setting up URL encoder
app.use(
  express.urlencoded({
    extended: true,
    //extended allows nested objects from URL (idk what it is)
    limit: "16kb"
}))

//public assets which we have used (public folder)
app.use(express.static("public"));

//getting cookies and accessing/setting them
app.use(cookieParser());

//routes import
import userRouter from "./routes/UserRoute.js";
import axios from "axios";

//routes declaration
app.use("/api/v1/users", userRouter);

app.post("/tournaments", async (req, res) => {
  try {
    const { query } = req.body;
    const apiKey =
      "faf77a60da15f38033845500f580e07a5056996fe55844af874cbd095e545f43";

    if (!apiKey) {
      throw new Error("API key is missing");
    }

    console.log("API Key:", apiKey); // For debugging purposes

    const response = await axios.get(`https://serpapi.com/search.json`, {
      params: {
        q: `${query} online tournaments`,
        num: 15,
        api_key:
          "faf77a60da15f38033845500f580e07a5056996fe55844af874cbd095e545f43",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching tournaments:", error.message);
    res.status(500).json({ message: "Error fetching tournaments" });
  }
});

export { app };
