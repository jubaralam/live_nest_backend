const express = require("express");
const server = express();
server.use(express.json());
const cors = require("cors");
server.use(cors());
const dotenv = require("dotenv").config();

const connection = require("./config/db");
const PORT = process.env.PORT;

//user routes
const userRouter = require("./routes/user.route");
server.use("/api/user", userRouter);

server.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server is runing on PORT: ${PORT} and db has connected`);
  } catch (error) {
    console.log(error.message);
  }
});
