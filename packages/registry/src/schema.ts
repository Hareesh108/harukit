import { z } from "zod";

export const ComponentSchema = z.object({
  name: z.string(),
  description: z.string(),
  version: z.string(),
  dependencies: z.array(z.string()).default([]),
  devDependencies: z.array(z.string()).default([]),
  files: z.array(
    z.object({
      name: z.string(),
      content: z.string(),
      path: z.string(),
      type: z.enum(["component", "utility", "style", "config"]),
    })
  ),
  tags: z.array(z.string()).default([]),
  category: z.string(),
  author: z.string(),
  license: z.string(),
  repository: z.string().optional(),
  documentation: z.string().optional(),
});

export const RegistrySchema = z.object({
  components: z.array(ComponentSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

export type Component = z.infer<typeof ComponentSchema>;
export type Registry = z.infer<typeof RegistrySchema>; 