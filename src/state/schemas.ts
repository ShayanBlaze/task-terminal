import { z } from "zod";

const priorities = ["Low", "Medium", "High"] as const;

export const todoSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
  priority: z.enum(priorities),
});

export const appStateSchema = z.object({
  active: z.array(todoSchema),
  completed: z.array(todoSchema),
});

export type Todo = z.infer<typeof todoSchema>;
export type AppState = z.infer<typeof appStateSchema>;
export type Priority = z.infer<typeof todoSchema.shape.priority>;
