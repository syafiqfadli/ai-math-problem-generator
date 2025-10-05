import { sendPrompt } from "@/lib/geminiClient";
import { Session } from "../models/session";

export const generateProblem = async (difficulty: 'easy' | 'medium' | 'hard') => {
    const prompt = `
            You are a math problem generator.

            Generate ONE ${difficulty} math problem for a Primary 5 student that includes
            ADDITION/SUBTRACTION/DIVISION/MULTIPLICATION absed on the diffculties.

            Return the result strictly in JSON format with:
                - "problem_text": string (the math problem),
                - "final_answer": number (the correct answer)

            Do not include explanations, only valid JSON.
        `;

    const result = await sendPrompt(prompt);

    return result;
};

export const generateFeedback = async (session: Session, user_answer: number) => {
    const prompt = `
                You are a math tutor for a Primary 5 student.  Here are the details:
                    1. Math Problem: ${session.problem_text}
                    2. Correct Answer: ${session.correct_answer}
                    3. Student's Answer: ${user_answer}
    
                Your job is to:
                    - Compare the student's answer with the correct answer.
                    - If correct: give positive reinforcement (e.g., "Great job! You understood the problem well").
                    - If incorrect: explain why the answer is wrong in simple terms, then guide them to the correct solution step by step.
                    - Always keep the tone encouraging and suitable for a 10-11 year old student.
                    - Return the result strictly in JSON format with:
                        - "feedback_text": string (short feedback message)
            `;

    const result = await sendPrompt(prompt);

    return result;
};