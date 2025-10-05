import { clearJSONFormat } from "@/app/helpers/jsonHelper";
import { responseData } from "@/app/helpers/responseHelper";
import { MathProblem, MathProblemSchema } from "@/app/models/mathProblem";
import { Session } from "@/app/models/session";
import { generateProblem } from "@/app/services/prompt";
import { supabase } from "@/lib/supabaseClient";


export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { difficulty } = body;
        const result = await generateProblem(difficulty);

        if (!result) {
            return responseData({
                isSuccess: false,
                message: "System error. Please try again.",
                data: {}
            });
        }

        const response = JSON.parse(clearJSONFormat(result)) as { problem_text: string; final_answer: number; };

        const jsonResponse = {
            problem_text: response.problem_text,
            final_answer: response.final_answer
        };

        const parsed = MathProblemSchema.partial({ session_id: true }).safeParse(jsonResponse);

        if (!parsed.success) {
            return responseData({ isSuccess: false, message: parsed.error.message, data: {} });
        }

        const { data, error } = await supabase
            .from("math_problem_sessions")
            .insert([{ problem_text: parsed.data.problem_text, correct_answer: parsed.data.final_answer, difficulty }])
            .select()
            .single<Session>();

        if (!data || error) {
            return responseData({
                isSuccess: false,
                message: error.message,
                data: {}
            });
        };

        const mathProblem: MathProblem = {
            ...parsed.data,
            session_id: data.id,
        };

        return responseData<MathProblem>({
            isSuccess: true,
            message: "",
            data: mathProblem
        });
    } catch (error) {
        return responseData({
            isSuccess: false,
            message: `${error}`,
            data: {}
        });
    }
};
