
import { extractBillDataFromGemini } from "../services/geminiService.js";
import Bill from "../models/Bill.js";

export const verifyElectricityBill = async (req, res) => {
    try {
        const file = req.file;
        const userId = req.user?._id;

        if (!file) {
        return res.status(400).json({ error: "Invalid file or user input" });
        }

        console.log("File:", file);

        const extractedData = await extractBillDataFromGemini(file);

        // Save extracted data to DB
        const billDoc = new Bill({
        userId,
        units: extractedData.units,
        month: extractedData.month,
        billNumber: extractedData.billNumber
        });

        await billDoc.save();

        // const match = Math.abs(extractedData.units - userUnits) <= 5;
        return res.status(200).json({ message: "Bill verified successfully!" , extractedData });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
