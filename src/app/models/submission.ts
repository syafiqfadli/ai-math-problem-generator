import { z } from "zod";

export const SubmissionSchema = z.object({
    id: z.uuid(),
    session_id: z.uuid(),
    user_answer: z.number(),
    is_correct: z.boolean(),
    feedback_text: z.string(),
    score: z.number(),
    created_at: z.iso.datetime(),
});

export type Submission = z.infer<typeof SubmissionSchema>;

export type SubmissionResponse = {
    feedback_text: string;
    is_correct: boolean;
    score: number;
};
