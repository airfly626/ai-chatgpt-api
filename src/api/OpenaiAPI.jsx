import OpenAI from "openai";

const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

export const sendTextMessageToOpenAI = async (inputText) => {

    const response = await client.responses.create({
        model: "gpt-4o-mini",
        instructions: 'You are a 10-year-old student',
        input: inputText,
        temperature: 0.7,
        top_p: 1,
    });

    return response.output_text;
}

