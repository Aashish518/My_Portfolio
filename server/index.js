const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./database/db');
connectDB();

const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const contactRoutes = require("./routes/contactRoutes");


const allowedOrigins = [
    process.env.FRONTEND_URL_1, 
    process.env.FRONTEND_URL_2   
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        allowedOrigins.includes(origin)
            ? callback(null, true)
            : callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);
app.use("/api", projectRoutes);
app.use("/api", skillRoutes);
app.use("/api", contactRoutes);



app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
});