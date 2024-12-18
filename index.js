require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.APP_PORT;
const userRouter = require("./routers/users.router");
const transactionRouter = require("./routers/transactions.router");
const transactionRepository = require("./repositories/transactions.repository");
const globalErrorHandler = require("./middlewares/error.middleware");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(userRouter);
app.use(transactionRouter);

app.use(globalErrorHandler);
//WALLED

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
