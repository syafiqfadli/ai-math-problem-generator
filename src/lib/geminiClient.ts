import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

if (!geminiKey) {
    throw new Error('Missing Gemini environment variables');
}

const genAI = new GoogleGenerativeAI(geminiKey);

export const sendPrompt = async (prompt: string) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const response = result.response.text().trim();

        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
};