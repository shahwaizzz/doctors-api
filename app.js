require("express-async-errors");
const express = require("express");
const cors = require("cors");
const app = express();
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const authenticationMiddleware = require("./middlewares/authentication");
const connectDb = require("./db/connect");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user-routes");
const authRoutes = require("./routes/auth-routes");
const doctorsRoutes = require("./routes/doctor-routes");
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => res.send("Home"));
app.use("/auth", authRoutes);
app.use("/admin", userRoutes);
app.use("/doctor", doctorsRoutes);
// app.use('/user', authenticationMiddleware, (req, res) => {res})
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async (req, res) => {
  try {
    await connectDb(
      "mongodb+srv://shahwaiz:JCdUqcyl1nfW75B7@taskmanager.an4it.mongodb.net/database?retryWrites=true&w=majority"
    );
    app.listen(PORT, console.log(`server is listening on port ${PORT} `));
  } catch (error) {
    console.log(error);
  }
};

start();
