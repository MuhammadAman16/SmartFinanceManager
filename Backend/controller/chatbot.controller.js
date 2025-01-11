const { initializeModel } = require("../config/chatbot.config");
const { getClass } = require("../chatbot/index");
const { getAllBudgets } = require("./budget.controller");
const { getAllRecords, createRecord } = require("./record.controller");
const { updatePassword, updateFullName } = require("./user.controller");
const { getAllAccounts } = require("./account.controller");

let model = null;
let params = "";
let data;
let result;

exports.getResponse = async (req, res, next) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }
  try {
    result = await getClass(query);
  } catch (error) {
    console.error("Failed to Fetch Class:", error);
    return res.status(500).json({ error: "Failed to get class" });
  }
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
  "account": "Cash",
  "category": "Food & Drinks",
  "amount": "Rs500",
  "date": "21-10-2024",
  "note": "apple"
}
Instructions:
- Extract parameters relevant to an expense, such as:
  - "category" (e.g., Food & Drinks", clothes, transport)
  - "amount" (e.g., Rs500, Rs3000)
  - "account" (e.g., Cash, Bank, Credit Card)
  - "date" (e.g., 21-10-2024, yesterday, last week)
  - "note" (e.g., item or reason for the expense like "apple" or "bus fare").
- For relative dates like "yesterday" or "last week," calculate the exact date in the format "dd-mm-yyyy."
- Ensure all extracted parameters are included, even if some need to be inferred.
- Example Queries and Responses:
  - Query: "I spent Rs500 on apples from Cash" → {"type": "EXPENSE","category": "Food & Drinks"", "account":"Cash" ,"amount": "500", "currency":"Rs", "date": "21-12-2024", "note": "apples"}.
  - Query: "Add an expense of Rs3000 for jeans yesterday from credit card account" → {"type": "EXPENSE","category": "clothes", "account":"credit card" ,"amount": "3000","currency":"Rs", "date": "20-12-2024", "note": "jeans"}.
  - Query: "I paid Rs1000 for transport last week" → {"type": "EXPENSE","category": "transport", "amount": "1000","currency":"Rs", "date": "14-12-2024", "note": "transport"}.
  - Query: "I eanned Rs5000 from wages" → {"type": "INCOME","category": "Food & Drinks"", "amount": "500","currency":"Rs", "date": "21-12-2024", "note": "apples"}.
- Ensure no irrelevant details or extra text are included. Only return the JSON object.

Query:
    ${query}`;
  const updatePassPrompt = `
      Extract the 'current password' and 'new password' from the given user query. 
      If either or both parameters ('current password' or 'new password') are missing in the query, return an empty JSON object: {}.
      Your response must strictly follow this format:
      {
        "currentPassword": "extractedCurrentPassword",
        "newPassword": "extractedNewPassword"
      }
      - Use camelCase for all keys.
      - If a password cannot be extracted, its value should not appear in the JSON.
      For example:
      1. Query: "Update my password from 'abc123' to 'hello123'"
        Output: {
          "currentPassword": "abc123",
          "newPassword": "hello123"
        }
      2. Query: "Change my password to 'newpass'"
        Output: {}
      3. Query: "Set my new password to 'mypassword123', current is 'oldpass456'"
        Output: {
          "currentPassword": "oldpass456",
          "newPassword": "mypassword123"
        }
      `;
  const updateNamePrompt = `
      Extract the name parameter from the given user query. The name will follow phrases like "Change my name to", "Set my name as", or similar variations. If the name is found, return it in this format:
    {"fullName": "extractedName"}
    If the query does not contain a name, respond with an empty JSON object ({}).
    Ensure to trim any extra spaces around the extracted name.
    Examples:
    Query: "Change my name to John Doe" Response: {"fullName": "John Doe"}
    Query: "Set my name as Alice Smith" Response: {"fullName": "Alice Smith"}
    Query: "Change name" Response: {}
    Query: "Update name to" Response: {}
    Rules for extraction:
    The name starts after phrases like "to", "as", or similar keywords.
    Handle cases where the input query may contain extra spaces, punctuation, or incomplete phrases.
    only return a json nothing else!!!
    `;
  const getAccPrompt = `Extract parameters, if any, from the given user query. If no parameters exist, return an empty JSON object {}. The response must be a JSON object where keys are in camelCase and the values are the corresponding extracted parameters. For example:
    {
      "name":"My saving account",
      "type::"Saving account",
      "createdAt": "21-10-2024",
      "bankAccountNumber": "123456879"
    }
    Instructions:
    - Identify relevant parameters based on the context.
    - For relative dates like "last month" or "next week," calculate the exact date or date range in the format "dd-mm-yyyy.".
    - For example:
      - Query: "What are my account details" → {}.
      - Query: "what is my Saving accounts details with bank account number 12345687" → { "type:"Saving account","bankAccountNumber": "12345687"}.
      - Query: "what is my cash account" → {"type": "Cash"}.
      - Query: "what is the detail of my My Home account" → {name:"My Home Account"}.
      - Query: "which account did I create today?" → {"createdAt": "11-01-2025"}.
    - Use appropriate keys for extracted parameters, such as "createdAt", "type", "bankAccountNumber"and "name"
    - Ensure no irrelevant details or extra text are included. Only return the JSON object.

    Query:
    ${query}`;
  try {
    async function getParams(prompt) {
      const paramsResponse = await model.generateContent(prompt);
      const cleanedResponse = paramsResponse.response
        .text()
        .replace(/```.*?\n/g, "");
      console.log(cleanedResponse);
      if (cleanedResponse) {
        params = JSON.parse(cleanedResponse);
      }
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
    } else if (trimmedResult == "get_u_email") {
      if (req.user) {
        const { email } = req.user;
        data = {
          response: `Your email is ${email}. please let me know if you have any other questions.`,
        };
      }
    } else if (trimmedResult == "get_u_pass") {
      data = {
        response:
          "Password cannot be retrived for security reasons. Is there something else I can help you with?",
      };
    } else if (trimmedResult == "get_trans") {
      if (req.user) {
        data = await getAllRecords(req, res);
        req.query = { ...req.query, ...params };
      }
    } else if (trimmedResult == "create_record") {
      await getParams(createRecPrompt);
      req.body = { userId: req.user.id, isTemplate: "No", ...params };
      data = await createRecord(req, res, next);
    } else if (trimmedResult == "update_pass") {
      await getParams(updatePassPrompt);
      if (params.currentPassword && params.newPassword) {
        req.body = { userId: req.user.id, ...params };
        data = await updatePassword(req, res, next);
      } else {
        data = { response: "Please provide both current and new password" };
      }
    } else if (trimmedResult == "update_name") {
      await getParams(updateNamePrompt);
      if (params.fullName) {
        req.body = { userId: req.user.id, ...params };
        data = await updateFullName(req, res, next);
      } else {
        data = { response: "Please provide the new user name" };
      }
    } else if (trimmedResult == "get_acc") {
      await getParams(getAccPrompt);
      console.log(params);
      req.query = { userId: req.user.id, ...params };
      await getAllAccounts(req, res, next);
    } else {
      const result = await model.generateContent(query);
      data = res.json({ response: result.response.text() });
    }
    if (
      trimmedResult == "get_u_pass" ||
      trimmedResult == "get_u_email" ||
      trimmedResult == "get_u_name"
    ) {
      return res.status(200).send(data);
    }
  } catch (error) {
    console.error("Chatbot error please try again:", error);
    return res.status(500);
  }
};
