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


app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", projectRoutes);
app.use("/api", skillRoutes);
app.use("/api", contactRoutes);



app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
});