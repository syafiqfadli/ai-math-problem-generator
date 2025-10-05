import { z } from "zod";

export const MathProblemSchema = z.object({
    session_id: z.uuid(),
    problem_text: z.string(),
    final_answer: z.number(),
});

export type MathProblem = z.infer<typeof MathProblemSchema>;
