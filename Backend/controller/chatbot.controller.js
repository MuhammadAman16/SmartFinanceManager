const { initializeModel } = require("../config/chatbot.config");
const { getClass } = require("../chatbot/index");
const { getAllBudgets } = require("./budget.controller");
const { getAllRecords, createRecord } = require("./record.controller");

let model = null;
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

exports.getResponse = async (req, res, next) => {
  let params = "";
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }
    const result = await getClass(query);
    let data;
    try {
      if (!model) {
        model = await initializeModel();
      }
    } catch (error) {
      console.error("Error connecting to Gemini:", error);
      return res.status(500).json({ error: "Failed connecting to Gemini" });
    }
    const trimmedResult = result.replace(/"/g, "");

    const budgetPrompt = `
    Extract parameters, if any, from the given user query. If no parameters exist, return an empty JSON object {}. The response must be a JSON object where keys are in camelCase and the values are the corresponding extracted parameters. For example:
    {
      "period":"Month",
      "startDate": "21-10-2024",
      "endDate": "21-11-2024",
      "category": "Food & Drinks",
      "amount": "500"
    }
    Instructions:
    - Identify relevant parameters based on the context.
    - For relative dates like "last month" or "next week," calculate the exact date or date range in the format "dd-mm-yyyy." If the query refers to a date range, return the start and end dates as separate keys (e.g., "startDate" and "endDate").
    - For example:
      - Query: "What is my budget for last month" → {"startDate": "01-10-2024", "endDate": "31-10-2024"}.
      - Query: "what is my education budget" → {"category": "Financials"}.
      - Query: "what are my yearly budgets" → {"period": "Year"}.
      - Query: "what are my budgets greater than 500" → {"amount": "500"}.
    - Use appropriate keys for extracted parameters, such as "date," "startDate," "endDate," "category," and "amount."
    - Ensure no irrelevant details or extra text are included. Only return the JSON object.

    Query:
    ${query}`;
    const getRecPrompt = `Extract parameters, if any, from the given user query. If no parameters exist, return an empty JSON object {}. The response must be a JSON object where keys are in camelCase and the values are the corresponding extracted parameters. For example:
    {
      "period":"Month",
      "startDate": "21-10-2024",
      "endDate": "21-11-2024",
      "category": "Food & Drinks",
      "amount": "500"
    }
    Instructions:
    - Identify relevant parameters based on the context.
    - For relative dates like "last month" or "next week," calculate the exact date or date range in the format "dd-mm-yyyy." If the query refers to a date range, return the start and end dates as separate keys (e.g., "startDate" and "endDate").
    - For example:
      - Query: "What is my income for last month" → {"createdAt": "01-10-2024"}.
      - Query: "what is my job income" → {"category": "Financials"}.
      - Query: "what is my cash expanse" → {"paymentType": "Cash"}.
      - Query: "what are my expanse greater than 1500" → {"amount": "1500"}.
      - Query: "what is my income where label is job" → {"label": "Job"}.
    - Use appropriate keys for extracted parameters, such as "createdAt", "paymentType", "label", "category" and "amount."
    - Ensure no irrelevant details or extra text are included. Only return the JSON object.

    Query:
    ${query}`;
    const createRecPrompt = `
Extract the relevant parameters for creating an expense or income from the given user query. If no parameters exist, return an empty JSON object {}. The response must be a JSON object where keys are in camelCase and the values are the corresponding extracted parameters. For example:
{
  "type": "Expense",
  "category": "Food & Drinks",
  "amount": "Rs500",
  "date": "21-10-2024",
  "note": "apple"
}
Instructions:
- Extract parameters relevant to an expense, such as:
  - "category" (e.g., Food & Drinks", clothes, transport)
  - "amount" (e.g., Rs500, Rs3000)
  - "date" (e.g., 21-10-2024, yesterday, last week)
  - "note" (e.g., item or reason for the expense like "apple" or "bus fare").
- For relative dates like "yesterday" or "last week," calculate the exact date in the format "dd-mm-yyyy."
- Ensure all extracted parameters are included, even if some need to be inferred.
- Example Queries and Responses:
  - Query: "I spent Rs500 on apples today" → {"type": "EXPENSE","category": "Food & Drinks"", "amount": "500", "currency":"Rs", "date": "21-12-2024", "note": "apples"}.
  - Query: "Add an expense of Rs3000 for jeans yesterday" → {"type": "EXPENSE","category": "clothes", "amount": "3000","currency":"Rs", "date": "20-12-2024", "note": "jeans"}.
  - Query: "I paid Rs1000 for transport last week" → {"type": "EXPENSE","category": "transport", "amount": "1000","currency":"Rs", "date": "14-12-2024", "note": "transport"}.
  - Query: "I eanned Rs5000 from wages" → {"type": "INCOME","category": "Food & Drinks"", "amount": "500","currency":"Rs", "date": "21-12-2024", "note": "apples"}.
- Ensure no irrelevant details or extra text are included. Only return the JSON object.

Query:
${query}`;

    async function getParams(prompt) {
      const paramsResponse = await model.generateContent(prompt);
      const cleanedResponse = paramsResponse.response
        .text()
        .replace(/```.*?\n/g, "");
      params = JSON.parse(cleanedResponse);
    }

    if (trimmedResult == "get_budget") {
      await getParams(budgetPrompt);
      req.query = { ...req.query, ...params };
      data = await getAllBudgets(req, res, next);
    } else if (trimmedResult == "get_exp") {
      await getParams(getRecPrompt);
      req.query = { ...req.query, ...params, type: "EXPENSE" };
      data = await getAllRecords(req, res);
    } else if (trimmedResult == "get_inc") {
      req.query = { ...req.query, ...params, type: "INCOME" };
      data = await getAllRecords(req, res);
    } else if (trimmedResult == "get_u_name") {
      if (req.user) {
        const { fullName } = req.user;
        data = { response: `your name is ${fullName}` };
      }
    } else if (trimmedResult == "get_trans") {
      if (req.user) {
        data = await getAllRecords(req, res);
        req.query = { ...req.query, ...params };
      }
    } else if (trimmedResult == "get_u_email") {
      if (req.user) {
        const { email, fullName } = req.user;
        data = { response: `your email is ${email} and name is ${fullName}` };
      }
    } else if (trimmedResult == "create_record") {
      await getParams(createRecPrompt);
      req.body = { userId: req.user.id, isTemplate: "No", ...params };
      data = await createRecord(req, res, next);
    } else {
      const result = await model.generateContent(query);
      data = res.json({ response: result.response.text() });
    }

    return res.status(200).send(data);
  } catch (error) {
    console.error("Error connecting to chatbot:", error);
    return res.status(500);
  }
};
