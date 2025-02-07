const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

// Load environment variables
dotenv.config();

// Initialize Google Generative AI with API Key
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-pro' });

// Path to your local image file
const imagePath = path.join(__dirname, "assets", "news7.jpg");

try {
    // Read image file as buffer
    const imageBuffer = fs.readFileSync(imagePath);
    
    // Convert buffer to Base64
    const imageBase64 = imageBuffer.toString("base64");

    // Generate caption for the image
    async function generateCaption() {
        const result = await model.generateContent([
            {
                inlineData: {
                    data: imageBase64,
                    mimeType: "image/jpeg", // Change if using PNG: "image/png"
                },
            },
            "Caption this image.",
        ]);

        console.log("Generated Caption:", result.response.text());
    }

    generateCaption(); // Call the function to generate the caption

} catch (error) {
    console.error("Error reading image:", error);
}
