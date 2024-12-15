const { initializeModel } = require("../config/chatbot.config");
const { getClass } = require("../chatbot/index");

// let model = null;
// exports.initiateChatbot = async (req, res, next) => {
//   const prompt = "Ask me a question.";
//   model = await initializeModel();
//   try {
//     const result = await model.generateContent(prompt);
//     res.json({ response: "Hi, How can I help you today?" });
//   } catch (error) {
//     console.error("Error connecting to chatbot:", error);
//     res.status(500).json({ error: "Failed connecting to chatbot" });
//   }
// };

// exports.generateResponse = async (req, res, next) => {
//   const prompt = req.body.prompt;
//   try {
//     if (!model) {
//       model = await initializeModel();
//     }
//     const result = await model.generateContent(prompt);
//     res.json({ response: result.response.text() });
//   } catch (error) {
//     console.error("Error connecting to chatbot:", error);
//     res.status(500).json({ error: "Failed connecting to chatbot" });
//   }
// };

exports.getQueryClass = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }
    const result = await getClass(query);
    res.send(result);
  } catch (error) {
    console.error("Error connecting to chatbot:", error);
    res.status(500).json({ error: "Failed connecting to chatbot" });
  }
};
