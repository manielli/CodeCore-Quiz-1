//  ----------------------
//  CodeCore Quiz 1 Cluckr
//  ----------------------


// Requiring the required packages to create instances of each application
const path = require("path");
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const methodOverride = require ("method-override");

// Configuring and building the app.js

const app = express();
app.set("view engine", "ejs");

//  -----------
//  Middlewares
//  -----------

// Logger
app.use(logger("dev"));

// Static Assets
app.use(express.static(path.join(__dirname, "public")));

// URL Encoded
app.use(express.urlencoded({extended: true}));

app.use(
    methodOverride((request, response) => {
      if (request.body && request.body._method) {
        const method = request.body._method;
        return method;
      }
    })
  );

//  Cookie Parser
app.use(cookieParser());

// Custom Middleware for cookies
// Making the usernames globally accessible in our views as "username"
app.use((request, response, next) => {
    console.log("Cookies:", request.cookies);
    const username = request.cookies.username;
    response.locals.username = "";

    if (username) {
        response.locals.username = username;
        console.log(`Signed in as ${username}`);
    }
    next();
});

//  ------
//  Routes
//  ------

const postsRouter = require("./routes/posts");
const baseRouter = require("./routes/base");

app.use("/", baseRouter);
app.use("/posts", postsRouter);

//  ----------
//  Run Server
//  ----------

const PORT = 3535;
const HOST = "localhost";
app.listen(PORT, HOST, () => {

console.log(`Server is running. Listening on http://${HOST}:${PORT}`);
});
