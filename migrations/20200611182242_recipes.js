
exports.up = function(knex) {
  return knex.schema.createTable("ingredients", tbl => {
      tbl.increments();
      tbl.string("ingredient_name", 225).notNullable().index();
  })
  .createTable("recipes", tbl => {
      tbl.increments();
      tbl.string("recipe_name", 225).notNullable().index();
      tbl.integer("ingredient_id")
      .notNullable()
      .unsigned()
      .references("ingredients.id")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");

      tbl.integer("ingredient_amount");
  })
  .createTable("recipe_steps", tbl => {
      tbl.increments();
      tbl.integer("step_number").notNullable();
      tbl.integer("recipe_id").notNullable()
      .unsigned()
      .references("recipes.id")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
      tbl.integer("ingredient_id").notNullable()
      .unsigned()
      .references("ingredients.id")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");

  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists("ingredients")
  .dropTableIfExists("recipes")
  .dropTableIfExists("recipe_steps");
};
