
exports.up = function(knex, Promise) {
  
    return knex.schema.createTable("posts", table => {
        table.increments("id"); // a self increment unique user id
        table.string("username"); // username
        table.text("content"); // content as text
        table.string("imageUrl"); // Image URL
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table("posts");
};
