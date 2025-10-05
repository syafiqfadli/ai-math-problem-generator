export const clearJSONFormat = (raw: string) => {
    try {
        let cleaned = raw.trim();

        // Remove ```json and ``` fences
        if (cleaned.startsWith("```")) {
            cleaned = cleaned.replace(/```json|```/g, "").trim();
        }

        // Replace smart quotes, backticks, or weird markdown remnants if any
        cleaned = cleaned.replace(/[\u201C\u201D]/g, '"'); // fancy quotes → "
        cleaned = cleaned.replace(/\\n/g, " ");            // collapse escaped newlines
        cleaned = cleaned.replace(/\n+/g, " ");            // collapse raw newlines

        // Remove markdown bold/italics if you don’t want them inside the JSON string
        cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, "$1"); // strip **bold**
        cleaned = cleaned.replace(/\*(.*?)\*/g, "$1");     // strip *italics*

        return cleaned;
    } catch (error) {
        throw new Error(`JSON error: ${error}`);
    }
};
