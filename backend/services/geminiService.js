import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const extractBillDataFromGemini = async (file) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Extract the following from this electricity bill:
    - Bill Number
    - Month of Bill
    - Units Consumed

    translate to English from any foreign language

    Return only JSON format like:
    {
        "billNumber": "123456789",
        "month": "March 2025",
        "units": 148
        }
    `;

    const result = await model.generateContent([
        prompt,
        {
        inlineData: {
            data: file.buffer.toString("base64"),
            mimeType: file.mimetype,
        },
        },
    ]);

    const text = result.response.text();

    // Clean response if wrapped in markdown code block
    const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleaned);
};
