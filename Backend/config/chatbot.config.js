// Import Google Generative AI SDK
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load environment variables from the .env file
require("dotenv").config();

// Initialize Google Generative AI client with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
let model = null;

// Function to initialize the model (if not already initialized)
async function initializeModel() {
  if (!model) {
    try {
      model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      console.log("Model initialized successfully.");
    } catch (error) {
      console.error("Error initializing the model:", error);
      throw error; // In case of an error, propagate it
    }
  }
  return model; // Return the model for use
}

// Export the function so it can be used elsewhere
module.exports = { initializeModel };
