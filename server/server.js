import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();

// Connected MongoDB Database
await connectDB();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.get('/',(req,res)=>res.send("API is working"));
app.use('/api/admin',adminRouter);//for admin page
app.use('/api/blog', blogRouter);//for blog page


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>
console.log(`Server is running on port http://localhost:${PORT}`));

export default app;
process.env.PORT