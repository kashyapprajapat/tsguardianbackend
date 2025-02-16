const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7777;

app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// AI Code Analysis Endpoint
app.post("/analyze-code", async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: "No code provided" });
    }

    const prompt = `
        You are an expert AI in TypeScript development. Analyze the given TypeScript code and provide a detailed assessment.

        **Instructions:**  
        1️⃣ **Bug Detection:** Identify syntax errors, type mismatches, or runtime issues.  
        2️⃣ **Code Improvement:** Suggest optimizations or better coding practices.  
        3️⃣ **Performance & Best Practices:** Recommend improvements for efficiency and readability.  
        4️⃣ **Security & Edge Cases:** Highlight potential security risks or failure cases.  
        5️⃣ **Appreciation:** If the code is well-written, acknowledge good practices.  

        ### **Input Code:**  
        \`\`\`typescript
        ${code}
        \`\`\`

        ### **Output Format:**  
        - 🔴 **Errors & Issues:** [List all issues]  
        - 🛠️ **Suggested Fixes:** [Provide corrected code snippets]  
        - 🚀 **Best Practices & Performance Tips:** [Recommend improvements]  
        - ✅ **Overall Feedback:** [Appreciate good practices]  

        Respond concisely with accurate suggestions. If no issues are found, praise the code quality.
    `;

    try {
        const response = await axios.post(
            GEMINI_API_URL,
            {
                contents: [
                    {
                        parts: [{ text: prompt }]
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({ analysis: response.data });
    } catch (error) {
        console.error("Error processing AI request:", error);
        res.status(500).json({
            error: "AI processing failed",
            details: error.response?.data || error.message
        });
    }
});

app.listen(PORT, () => console.log(`✅ AI Agent running on port ${PORT}`));
