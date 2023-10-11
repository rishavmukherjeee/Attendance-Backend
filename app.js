const express = require("express");
const cors = require("cors");
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Router
app.use("/v1/teacher", require("./routes/teacher.routes"));
app.use("/v1/student", require("./routes/student.routes"));
app.use("/v1/admin", require("./routes/admin.routes"));

app.get("/", async (req, res) => {
  res.send("Server is running");
});

module.exports = app;
