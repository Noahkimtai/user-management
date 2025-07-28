//ENV FILES
require("dotenv").config();
const cors = require("cors");

//EXPRESS
const express = require("express");
const app = express();

const allowedOrigins = [
    "http://localhost:8080", // React frontend
    "http://127.0.0.1:8080",
    "http://localhost:5173", // Vite or other frontend ttp://localhost:5173
    "http://127.0.0.1:5173",
  ];
  
  // CORS configuration
  const corsOptions = {
    origin: function (origin, callback) {
      // Allow requests with no origin like curl or Postman
      if (!origin) return callback(null, true);
  
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };
  
  app.use(cors(corsOptions));

app.use(express.json());
//PORT
const port = process.env.PORT || "8080";

//DB
const db = require("./config/database");

//PASSPORT
const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy");

//SWAGGER
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

app.use(express.urlencoded({ extended: false }));

//INDEX PAGE
app.get("/", (req, res) => {
  res.send('Hello' );
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// USER ROUTE
app.use("/", require("./routes"));

// STARTING SERVER
app.listen(port, function (err) {
  if (err) {
    console.log("Error starting in server", err.message);
  }

  console.log(`Server is successfully running at ${port}`);
});
