import express from "express";
import dotenv from "dotenv";
import githubRoutes from "./routes/githubRoutes.js";
import cors from "cors";
import rateLimit from "express-rate-limit";
dotenv.config();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP,please try again later",
});



const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(apiLimiter);
app.use(express.json());
app.use("/github", githubRoutes);
app.get('/',async(req,res)=>{
    res.status(200).json({message:'Server is Live!'})
})

app.listen(PORT, () => {
  console.log(`Server running at Port ${PORT}`);
});
