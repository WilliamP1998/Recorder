require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoute");
const bodyParser = require("body-parser");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri =
  "mongodb+srv://admin:Matkhau194311@cluster0-mb8mv.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongoose");
});
mongoose.connection.on("Error", () => {
  console.error("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email:${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on 3000");
});
