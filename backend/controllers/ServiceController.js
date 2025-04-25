
import { extractBillDataFromGemini } from "../services/geminiService.js";
import Bill from "../models/Bill.js";

export const verifyElectricityBill = async (req, res) => {
    try {
        const file = req.file;
        const userUnits = parseFloat(req.body.userUnits);
        const userId = req.user?._id;

        if (!file || isNaN(userUnits)) {
        return res.status(400).json({ error: "Invalid file or user input" });
        }

        const extractedData = await extractBillDataFromGemini(file);

        // Save extracted data to DB
        const billDoc = new Bill({
        userId,
        units: extractedData.units,
        month: extractedData.month,
        billNumber: extractedData.billNumber,
        matched: extractedData.units === userUnits,
        });

        await billDoc.save();

        const match = Math.abs(extractedData.units - userUnits) <= 5;

        res.json({
        message: match ? "Bill verified successfully!" : "Mismatch in units!",
        extractedData,
        match
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
