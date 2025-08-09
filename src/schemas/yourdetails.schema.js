import { z } from "zod";

export const yourDetailsSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(5),
  title: z.string().optional(),
  headline: z.string().optional(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  portfolio: z.string().url().optional(),
  website: z.string().url().optional(),
  summary: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  nationality: z.string().optional(),
  birthDate: z.string().optional(),
  languages: z.string().optional(),
  relocate: z.boolean().optional(),
});
