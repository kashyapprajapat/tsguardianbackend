const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 7777;


dotenv.config();

const app = express();
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
        You are an advanced AI trained in TypeScript development. Your task is to analyze the given TypeScript code and provide a detailed assessment.

        **Instructions:**  
        1️⃣ **Bug Detection:** Identify any syntax errors, type mismatches, or runtime issues.  
        2️⃣ **Code Improvement:** Suggest optimizations, refactoring, or better coding practices.  
        3️⃣ **Performance & Best Practices:** Recommend improvements for efficiency, readability, and maintainability.  
        4️⃣ **Security & Edge Cases:** Highlight potential security risks or edge cases that might cause failures.  
        5️⃣ **Appreciation:** If the code is well-written, acknowledge the good practices used.  

        ### **Input Code:**  
        ${code}

        ### **Output Format:**  
        - 🔴 **Errors & Issues:** [List all issues with explanations]  
        - 🛠️ **Suggested Fixes:** [Provide corrected code snippets]  
        - 🚀 **Best Practices & Performance Tips:** [Give TypeScript best practices]  
        - ✅ **Overall Feedback:** [If the code is good, praise it]  

        Respond concisely and ensure suggestions are accurate. Return modified code if applicable.
    `;

    try {
        const response = await axios.post(
            GEMINI_API_URL,
            {
                prompt,
                temperature: 0.7,
                max_tokens: 1000,
            },
            {
                headers: {
                    Authorization: `Bearer ${GEMINI_API_KEY}`,
                },
            }
        );

        res.json({ analysis: response.data });
    } catch (error) {
        res.status(500).json({ error: "AI processing failed", details: error.message });
    }
});


app.listen(PORT, () => console.log(`✅ AI Agent running on port no : ${PORT}`));
