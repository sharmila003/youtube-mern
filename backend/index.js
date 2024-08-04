// index.js 
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import watchLaterRoutes from "./routes/watch-later.js";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import cors from 'cors';

dotenv.config();
  const app = express();
  const  port =   8800;


// Connect to MongoDB
   const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;

    });
};
app.use(cors({
  origin: 'http://localhost:5173', // Adjust to your frontend's URL
  credentials: true
}));
app.use(cookieParser())
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/watch-later", watchLaterRoutes);



app.listen(port, () => {
  connect();
  console.log("Connected to Server");
});


export  default  app;