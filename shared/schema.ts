import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name").notNull(),
  progressData: json("progress_data").notNull(),
});

// Course modules model
export const modules = pgTable("modules", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: json("content").notNull(),
  type: text("type").notNull(), // "intro", "printer", "materials", "process", "design"
  level: text("level").notNull(), // "beginner", "intermediate", "advanced"
  order: integer("order").notNull(),
  estimatedMinutes: integer("estimated_minutes").notNull(),
  imageUrl: text("image_url"),
});

// Quiz questions model
export const quizQuestions = pgTable("quiz_questions", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").notNull(),
  question: text("question").notNull(),
  options: json("options").notNull(), // Array of possible answers
  correctOption: integer("correct_option").notNull(), // Index of the correct answer
  explanation: text("explanation").notNull(),
});

// Quiz results model
export const quizResults = pgTable("quiz_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  moduleId: integer("module_id").notNull(),
  score: integer("score").notNull(),
  completedAt: timestamp("completed_at").notNull(),
});

// Glossary terms model
export const glossaryTerms = pgTable("glossary_terms", {
  id: serial("id").primaryKey(),
  term: text("term").notNull().unique(),
  definition: text("definition").notNull(),
  category: text("category").notNull(),
});

// 3D printer parts model
export const printerParts = pgTable("printer_parts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  function: text("function").notNull(),
  position: json("position").notNull(), // x, y coordinates for hotspot positioning
});

// 3D printing materials model
export const materials = pgTable("materials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  fullName: text("full_name").notNull(),
  difficulty: integer("difficulty").notNull(), // 1-5 scale
  strength: integer("strength").notNull(), // 1-5 scale
  flexibility: integer("flexibility").notNull(), // 1-5 scale
  temperature: text("temperature").notNull(),
  bedTemperature: text("bed_temperature").notNull(),
  useCases: text("use_cases").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
});

// Progress tracking model
export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  moduleId: integer("module_id").notNull(),
  completed: boolean("completed").notNull().default(false),
  lastAccessed: timestamp("last_accessed").notNull(),
  timeSpent: integer("time_spent").notNull().default(0),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertModuleSchema = createInsertSchema(modules).omit({ id: true });
export const insertQuizQuestionSchema = createInsertSchema(quizQuestions).omit({ id: true });
export const insertQuizResultSchema = createInsertSchema(quizResults).omit({ id: true });
export const insertGlossaryTermSchema = createInsertSchema(glossaryTerms).omit({ id: true });
export const insertPrinterPartSchema = createInsertSchema(printerParts).omit({ id: true });
export const insertMaterialSchema = createInsertSchema(materials).omit({ id: true });
export const insertProgressSchema = createInsertSchema(progress).omit({ id: true });

// Types for the models
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Module = typeof modules.$inferSelect;
export type InsertModule = z.infer<typeof insertModuleSchema>;

export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type InsertQuizQuestion = z.infer<typeof insertQuizQuestionSchema>;

export type QuizResult = typeof quizResults.$inferSelect;
export type InsertQuizResult = z.infer<typeof insertQuizResultSchema>;

export type GlossaryTerm = typeof glossaryTerms.$inferSelect;
export type InsertGlossaryTerm = z.infer<typeof insertGlossaryTermSchema>;

export type PrinterPart = typeof printerParts.$inferSelect;
export type InsertPrinterPart = z.infer<typeof insertPrinterPartSchema>;

export type Material = typeof materials.$inferSelect;
export type InsertMaterial = z.infer<typeof insertMaterialSchema>;

export type Progress = typeof progress.$inferSelect;
export type InsertProgress = z.infer<typeof insertProgressSchema>;
