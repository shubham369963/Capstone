import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routers/authRoute.js";
import cors from "cors";


dotenv.config();
const app = express();
const PORT = process.env.PORT ;
connectDB();


app.use(cors());
app.use(express.json());
app.use(morgan("dev"));



app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res)=>{
    res.send({
        message: "running",
    })
});


app.listen(PORT, ()=>{
    const MODE = process.env.DEV_MODE;
    console.log(`listening port ${PORT} on ${MODE} mode`);
})