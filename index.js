const express = require("express");
const app = express();
const connection = require("./Config/db");
require("dotenv").config();
const cors = require("cors");
const { userRouter } = require("./Routes/user.route");
const { bookRouter } = require("./Routes/book.route");
const { authorization } = require("./Middlewares/validator");
const { relationship } = require("./Middlewares/relationship");
const { orderRouter } = require("./Routes/order.route");

app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(authorization);
app.use(relationship);
app.use(bookRouter);
app.use(orderRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("db is connected");
  } catch (error) {
    console.log("db is not connected");
  }
  console.log(`http://localhost:${process.env.port}`);
});
