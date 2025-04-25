import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const extractBillDataFromGemini = async (file) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const base64 = file.buffer.toString("base64");

    const result = await model.generateContent([
        {
        inlineData: {
            mimeType: file.mimetype,
            data: base64,
        },
        },
        {
        text: `Extract these details from the electricity bill:
        - Units consumed
        - Month of the bill
        - Bill number

        Return response as JSON:
        {
            "units": number,
            "month": "Month YYYY",
            "billNumber": "string"
        }`,
        },
    ]);

    const text = await result.response.text();
    const parsed = JSON.parse(text);

    return {
        units: parseFloat(parsed.units),
        month: parsed.month,
        billNumber: parsed.billNumber,
    };
};
