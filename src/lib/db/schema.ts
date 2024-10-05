import { relations, sql } from "drizzle-orm";
import {
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `belly-bites_${name}`);

export const meals = createTable("meals", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  mealName: varchar("meal_name", { length: 256 }).notNull(),
  mealType: varchar("meal_type", { length: 256 }),
  mealTime: timestamp("meal_time", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const ingredients = createTable("ingredients", {
  id: serial("id").primaryKey(),
  mealId: integer("meal_id").notNull(),
  categoryId: integer("category_id").notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const categories = createTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const mealRelations = relations(meals, ({ many }) => ({
  ingredients: many(ingredients),
}));

export const ingredientRelations = relations(ingredients, ({ one }) => ({
  category: one(categories, {
    fields: [ingredients.categoryId],
    references: [categories.id],
  }),
  meal: one(meals, {
    fields: [ingredients.mealId],
    references: [meals.id],
  }),
}));
