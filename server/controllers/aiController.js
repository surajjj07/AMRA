import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import path from "node:path";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export const reportReview = async (req, res) => {
    try {
        const { language } = req.body;
        const reportfile = req.file;

        if (!reportfile) {
            return res.status(400).json({
                status: false,
                message: "Report file is required"
            });
        }

        const fileData = await fs.promises.readFile(reportfile.path);

        // -------- Extract Text --------
        const extractRes = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    inlineData: {
                        data: fileData.toString("base64"),
                        mimeType: reportfile.originalname.endsWith(".pdf")
                            ? "application/pdf"
                            : "image/png"
                    }
                },
                "Extract all text clearly"
            ]
        });

        const reportText = await extractRes.text();
        console.log("Extracted Report Text:\n", reportText);

        // -------- Review Report --------
        const prompt = `
You are an expert medical report reviewer.
Analyze the following report carefully.

TASK:
1. Give a short and clear summary
2. Highlight abnormal or risky values with reason
3. Provide simple explanation understandable to a normal person
4. Suggest what the patient should discuss with a doctor
5. If everything looks good, clearly say it is normal

Report:
${reportText}

Give output in ${language} language.
`;

        const reviewRes = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        const reviewText = await reviewRes.text();
        console.log("AI Report Review:\n", reviewText);

        res.status(201).json({
            status: true,
            message: "Report reviewed successfully",
            reportData: reviewText
        });

    } catch (error) {
        console.log("error :", error);
        res.status(500).json({
            status: false,
            message: "Report review failed",
            error: error.message
        });
    }
};









// async function reviewReport(reportText) {


   


// }

// // ===== Example Test =====
// reviewReport(`
// Patient Name: John
// Age: 45
// Blood Pressure: 150/98
// Hemoglobin: 12
// Cholesterol: 250
// Fasting Sugar: 130
// Symptoms: Headache & fatigue
// `);
