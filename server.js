const express = require("express");
const env = require("dotenv").config();
const app = express();
const { errorHandler } = require("./middleware/errorHandler");
const connectDb =  require("./config/dbConnection")

const port = process.env.PORT || 8000;
connectDb();
app.use(express.json());
app.use("/api", require("./routes/apiRoutes"));

app.get("/", (req, res) => {
  res.sendFile("pages/index.html", { root: __dirname });
});

app.get("/login", (req, res) => {
  res.sendFile("pages/login.html", { root: __dirname });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Express server is listening on http://localhost: ${port}`);
});
