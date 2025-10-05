import { clearJSONFormat } from "@/app/helpers/jsonHelper";
import { responseData } from "@/app/helpers/responseHelper";
import { Session } from "@/app/models/session";
import { Submission, SubmissionResponse, SubmissionSchema } from "@/app/models/submission";
import { generateFeedback } from "@/app/services/prompt";
import { supabase } from "@/lib/supabaseClient";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();

        const parsed = SubmissionSchema.partial({
            id: true,
            created_at: true,
            is_correct: true,
            feedback_text: true,
            score: true,
        }).safeParse(body);

        if (!parsed.success) {
            return responseData({ isSuccess: false, message: parsed.error.message, data: {} });
        }

        const { session_id, user_answer } = parsed.data;

        const { data: session, error: sessionError } = await supabase
            .from("math_problem_sessions")
            .select("*")
            .eq("id", session_id)
            .single<Session>();

        if (sessionError || !session) {
            return responseData({
                isSuccess: false,
                message: sessionError.message,
                data: {}
            });
        }

        const is_correct = Number(user_answer) === Number(session.correct_answer);
        const scoreMap = { easy: 10, medium: 20, hard: 30 };
        const score = is_correct ? (scoreMap[session.difficulty as keyof typeof scoreMap] || 10) : 0;

        const result = await generateFeedback(session, user_answer);

        if (!result) {
            return responseData({ isSuccess: false, message: "System error. Please try again.", data: {} });
        }

        const response = JSON.parse(clearJSONFormat(result)) as { feedback_text: string; };
        const feedback_text = response.feedback_text;

        supabase
            .from("math_problem_submissions")
            .insert([{ session_id, user_answer, is_correct, feedback_text }])
            .select()
            .single<Submission>()
            .then(({ error }) => {
                if (error) console.error("Submission error:", error.message);
            });

        return responseData<SubmissionResponse>({
            isSuccess: true,
            message: "",
            data: { feedback_text, is_correct, score }
        });
    } catch (error) {
        return responseData({
            isSuccess: false,
            message: `${error}`,
            data: {}
        });
    }
};
