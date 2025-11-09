import z from "zod";

const schema = z.object({
  VITE_API_URL: z.url(),
});

console.log(import.meta.env);

export const env = schema.parse(import.meta.env);
export type Env = z.infer<typeof schema>;
