const express = require("express");
const cookieParser = require('cookie-parser')


const app = express();

app.use(cookieParser())

//include express layouts
const expressLayouts = require('express-ejs-layouts');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setup Cross Origin
app.use(require("cors")());



//Bring in the routes
app.use("/anime", require("./routes/anime"));
app.use("/user", require("./routes/user"));


//Setup Error Handlers
const errorHandlers = require("./handlers/errorHandlers");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

module.exports = app;
