import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import connectToDb from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import notesRoutes from './routes/notesRoutes.js';
import { isLoggedIn } from './middleware/auth.js';
import cookieParser from 'cookie-parser';
const app=express();
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://notes-keep-frontend.vercel.app"],
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

config();
connectToDb();

app.use('/ping', (req, res)=>{
    res.json('pong');
})
const port=process.env.PORT || 5500;

app.use('/user', userRoutes);
app.use('/note', notesRoutes);



app.listen(port, '0.0.0.0', ()=>{
    console.log(`Server running on port: ${port}`);
})
