const express = require("express"); // Import express
const bodyParser = require("body-parser"); // Import body-parser
const mongodb = require("./database/dataBaseConnection");
const indexRoutes = require("./routes/index");

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json()) // Middleware to parse JSON bodies
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // CORS middleware
    next();
  })
  .use("/", indexRoutes); // Set up routes

// Initialize the MongoDB connection and start the server
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log("Failed to connect to DB:", err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  }
});
