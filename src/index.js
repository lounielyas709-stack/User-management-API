import 'dotenv/config'
import express from 'express'; 
import morgan from 'morgan'
import userRoutes from "./routes/userRoutes.js"
import errorHandler from "./middlewares/errorHandler.js"
import authRoutes from "./routes/authRoutes.js"

const app = express();
const PORT = 3000

app.use(express.json())
app.use(morgan("dev"))


app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to HETIC API'
    });
});


app.use("/api/auth", authRoutes)
app.use("/api", userRoutes)



app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})