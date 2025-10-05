import { z } from "zod";

export const SessionSchema = z.object({
    id: z.uuid(),
    created_at: z.iso.datetime(),
    problem_text: z.string(),
    correct_answer: z.number(),
    difficulty: z.enum(['easy', 'medium', 'hard']).nullable(),
});

export type Session = z.infer<typeof SessionSchema>;
