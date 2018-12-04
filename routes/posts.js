const express = require("express");
// const knex = require("../db/client");
const router = express.Router();

router.get("/new", (request, response) => {
    response.render("posts/new");
});

router.post("/", (request, response) => {
    knex("posts")
      .insert({
        title: request.body.title,
        imageUrl: request.body.imageUrl,
        content: request.body.content
      })
      .returning("*")
      .then(posts => {
        const [post] = posts;
        response.redirect(`/posts/${post.id}`);
      });
  });

  router.get("/", (request, response) => {
    knex("posts")
      .orderBy("created_at", "desc")
      .then(posts => {
        response.render("posts/index", { posts: posts });
      });
  });
  
  router.get("/:id", (request, response, next) => {

    knex("posts")
      .where("id", request.params.id)
      .first()
      .then(post => {
          if (!post) {
              next(new Error("Post not found"));
          }
        response.render("posts/show", { post: post });
      });
  });
  
  router.delete("/:id", (request, response) => {
    knex("posts")
      .where("id", request.params.id)
      .del()
      .then(() => {
        response.redirect("/posts");
      });
  });
  
  router.get("/:id/edit", (request, response) => {
    knex("posts")
      .where("id", request.params.id)
      .first()
      .then(post => {
        response.render("posts/edit", { post: post });
      });
  });
  
  router.patch("/:id", (request, response) => {
      knex("posts", request.params.id)
          .update({
              imageUrl: request.body.imageUrl,
              content: request.body.content
          })
          .then(() => {
              response.redirect(`/posts/${request.params.id}`);
          });
  });
  

module.exports = router;