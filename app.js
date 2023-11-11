const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://samss.netlify.app'
  ],
  credentials: true,  
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

app.use("/v1",require("./src/middlewares/login"))
app.use("/v1/message",require("./src/utils/messages"))
// Router
app.use("/v1/teacher", require("./src/routes/teacher.routes"));
app.use("/v1/student", require("./src/routes/student.routes"));
app.use("/v1/admin", require("./src/routes/admin.routes"));

app.get("/", async (req, res) => {
  res.send("Server is running");
});

module.exports = app;
