import express from "express";
import cors from 'cors'
import 'dotenv/config.js'
import connectDB from "./config/mongodb.js";
import connectCluadinary from "./config/claudinary.js";
import adminRouter from "./routes/AdminRoute.js";
import doctorRouter from "./routes/DoctorRoute.js";
import userRouter from "./routes/UserRoutes.js";


//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCluadinary();
//middlewares
app.use(express.json());
app.use(cors());

//api endpoint
app.use('/api/admin', adminRouter);//localhost:4000/api/admin
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send("api is working")
})
app.listen(port, () => {
    console.log(`app is listing on ${port}`)
})