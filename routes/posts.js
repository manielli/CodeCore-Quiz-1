const express = require("express");
// const knex = require("../db/client");
const router = express.Router();

router.get("/new", (request, response) => {
    response.render("posts/new");
});



module.exports = router;