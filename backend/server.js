const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();
const app = express();


// app.use("/api/version/vannstand", require("./routes/vannstandRoutes")); feks
app.use(express.json());
// app.use(express.urlencoded({extended: false}))
app.use(errorHandler);
app.use("/api/version/users", require('./routes/userRoutes'));


app.listen(port, () => console.log(`Server started on port ${port}`));



// app.get('/turbine/:turbineId/:status', (req, res) => { eksempel på shit