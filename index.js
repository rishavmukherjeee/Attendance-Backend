const app = require("./app");
const database = require("./src/utils/db");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 8000;

database();

app.listen(port, () => {
    console.log("Server is running on " + port);
});
