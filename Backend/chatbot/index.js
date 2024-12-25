const { OpenAIEmbeddings } = require("@langchain/openai");
const { PineconeStore } = require("@langchain/pinecone");
const { Pinecone: PineconeClient } = require("@pinecone-database/pinecone");
const { Document } = require("@langchain/core/documents");

require("dotenv").config();

console.log(process.env.OPENAI_API_KEY);
async function addDataToPinecone() {
  const embeddings = new OpenAIEmbeddings({
    apiKey:
      "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",
    batchSize: 512,
    model: "text-embedding-3-small",
  });

  // Initialize Pinecone Client
  const pinecone = new PineconeClient({
    apiKey: "389d3ec7-3672-4b5f-b7a6-459d38414d20",
  });
  // Initialize Pinecone Index
  const pineconeIndex = pinecone.Index("smartfinance-embeddings");
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
  });
  const documents = [
    {
      pageContent: "What is my total expenditure for this month?",
      metadata: { class: "get_exp" },
    },
    {
      pageContent: "Can you show me my expenses from last month?",
      metadata: { class: "get_exp" },
    },
    {
      pageContent: "How much did I spend overall this week?",
      metadata: { class: "get_exp" },
    },
    {
      pageContent: "List my expanses for the past year.",
      metadata: { class: "get_exp" },
    },
    {
      pageContent: "What were my total expenses last year?",
      metadata: { class: "get_exp" },
    },
    {
      pageContent: "Can you summarize my expenditures for this month?",
      metadata: { class: "get_exp" },
    },
    {
      pageContent: "What is my spending for this quarter?",
      metadata: { class: "get_exp" },
    },
    {
      pageContent: "Show me my overall expenses for the last two weeks.",
      metadata: { class: "get_exp" },
    },
    {
      pageContent: "How much have I spent on entertainment recently?",
      metadata: { class: "get_exp" },
    },
    {
      pageContent: "What is my total spending on groceries?",
      metadata: { class: "get_exp" },
    },
    {
      pageContent: "Can you provide a summary of my travel expenses?",
      metadata: { class: "get_exp" },
    },
    {
      pageContent: "How much did I spend on utilities last month?",
      metadata: { class: "get_exp" },
    },
    {
      pageContent: "List my expenses for food and dining.",
      metadata: { class: "get_exp" },
    },
    {
      pageContent: "What are my total expenditures on shopping?",
      metadata: { class: "get_exp" },
    },
    {
      pageContent:
        "How much did I spend on health-related expenses this month?",
      metadata: { class: "get_exp" },
    },
    {
      pageContent: "Can you summarize my monthly expenses?",
      metadata: { class: "get_exp" },
    },
    {
      pageContent: "What was my overall spending last year?",
      metadata: { class: "get_exp" },
    },
    {
      pageContent: "Show me my spending on subscriptions.",
      metadata: { class: "get_exp" },
    },
    {
      pageContent: "What is my total expenditure on household supplies?",
      metadata: { class: "get_exp" },
    },
    {
      pageContent: "How much did I spend on entertainment last month?",
      metadata: { class: "get_exp" },
    },
    {
      pageContent: "What are my total expenses categorized by type?",
      metadata: { class: "get_exp" },
    },
    { pageContent: "What is my total income?", metadata: { class: "get_inc" } },
    {
      pageContent: "Show me my income sources.",
      metadata: { class: "get_inc" },
    },
    {
      pageContent: "How much did I earn this month?",
      metadata: { class: "get_inc" },
    },
    {
      pageContent: "Retrieve my salary details.",
      metadata: { class: "get_inc" },
    },
    {
      pageContent: "What are my monthly income reports?",
      metadata: { class: "get_inc" },
    },
    {
      pageContent: "List my total earnings for the year.",
      metadata: { class: "get_inc" },
    },
    {
      pageContent: "How much income did I generate last month?",
      metadata: { class: "get_inc" },
    },
    {
      pageContent: "What is my annual income?",
      metadata: { class: "get_inc" },
    },
    {
      pageContent: "Show me my income for freelance work.",
      metadata: { class: "get_inc" },
    },
    {
      pageContent: "How much have I earned from investments?",
      metadata: { class: "get_inc" },
    },
    {
      pageContent: "Retrieve my rental income details.",
      metadata: { class: "get_inc" },
    },
    {
      pageContent: "What was my total income last year?",
      metadata: { class: "get_inc" },
    },
    {
      pageContent: "How much did I earn from bonuses?",
      metadata: { class: "get_inc" },
    },
    {
      pageContent: "List my income for side jobs.",
      metadata: { class: "get_inc" },
    },
    {
      pageContent: "What is my total passive income?",
      metadata: { class: "get_inc" },
    },
    {
      pageContent: "Show me my income summary for this month.",
      metadata: { class: "get_inc" },
    },
    {
      pageContent: "How much do I earn from my primary job?",
      metadata: { class: "get_inc" },
    },
    {
      pageContent: "Retrieve my overall income history.",
      metadata: { class: "get_inc" },
    },
    {
      pageContent: "What are my income projections for the next month?",
      metadata: { class: "get_inc" },
    },
    {
      pageContent: "How much income do I have from royalties?",
      metadata: { class: "get_inc" },
    },
    {
      pageContent: "Show me my total income breakdown.",
      metadata: { class: "get_inc" },
    },
    {
      pageContent: "What is my budget for food?",
      metadata: { class: "get_budget" },
    },
    {
      pageContent: "Show me my entertainment budget.",
      metadata: { class: "get_budget" },
    },
    {
      pageContent: "How much have I budgeted for transportation?",
      metadata: { class: "get_budget" },
    },
    {
      pageContent: "Retrieve my budget for housing.",
      metadata: { class: "get_budget" },
    },
    {
      pageContent: "What is my allocated budget for utilities?",
      metadata: { class: "get_budget" },
    },
    {
      pageContent: "List my budget for healthcare expenses.",
      metadata: { class: "get_budget" },
    },
    {
      pageContent: "Show me my budget for education.",
      metadata: { class: "get_budget" },
    },
    {
      pageContent: "What is my budget for clothing?",
      metadata: { class: "get_budget" },
    },
    {
      pageContent: "How much is allocated for savings?",
      metadata: { class: "get_budget" },
    },
    {
      pageContent: "Retrieve my budget for travel.",
      metadata: { class: "get_budget" },
    },
    {
      pageContent: "What is my entertainment budget for this month?",
      metadata: { class: "get_budget" },
    },
    {
      pageContent: "Show me my food budget for the week.",
      metadata: { class: "get_budget" },
    },
    {
      pageContent: "How much have I budgeted for miscellaneous expenses?",
      metadata: { class: "get_budget" },
    },
    {
      pageContent: "What is my budget for dining out?",
      metadata: { class: "get_budget" },
    },
    {
      pageContent: "List my budget for hobbies.",
      metadata: { class: "get_budget" },
    },
    {
      pageContent: "What is my budget for gifts?",
      metadata: { class: "get_budget" },
    },
    {
      pageContent: "which is my max budgt?",
      metadata: { class: "get_budget" },
    },
    {
      pageContent: "Retrieve my budget for last week.",
      metadata: { class: "get_budget" },
    },
    {
      pageContent: "What is my budget for last month?",
      metadata: { class: "get_budget" },
    },
    {
      pageContent: "Show me my budget for last year.",
      metadata: { class: "get_budget" },
    },
    {
      pageContent: "How much have I budgeted for emergency fund?",
      metadata: { class: "get_budget" },
    },
    {
      pageContent: "What is my registered name?",
      metadata: { class: "get_u_name" },
    },
    {
      pageContent: "Can you tell me my name associated with the account?",
      metadata: { class: "get_u_name" },
    },
    {
      pageContent: "What's the name I used to sign up?",
      metadata: { class: "get_u_name" },
    },
    {
      pageContent: "Retrieve my account name, please.",
      metadata: { class: "get_u_name" },
    },
    {
      pageContent: "What name did I register with?",
      metadata: { class: "get_u_name" },
    },
    {
      pageContent: "Can you find my name linked to the account?",
      metadata: { class: "get_u_name" },
    },
    {
      pageContent: "What is the name on file for my account?",
      metadata: { class: "get_u_name" },
    },
    {
      pageContent: "Please tell me the name I registered with.",
      metadata: { class: "get_u_name" },
    },
    {
      pageContent: "What name is associated with my profile?",
      metadata: { class: "get_u_name" },
    },
    {
      pageContent: "Can you check my registered name?",
      metadata: { class: "get_u_name" },
    },
    {
      pageContent: "What's the name I provided during signup?",
      metadata: { class: "get_u_name" },
    },
    {
      pageContent: "Find out my account's name.",
      metadata: { class: "get_u_name" },
    },
    {
      pageContent: "Retrieve the name linked to my account.",
      metadata: { class: "get_u_name" },
    },
    {
      pageContent: "What name do I use for logging in?",
      metadata: { class: "get_u_name" },
    },
    {
      pageContent: "Tell me my registered name, please.",
      metadata: { class: "get_u_name" },
    },
    {
      pageContent: "What is the name associated with my user profile?",
      metadata: { class: "get_u_name" },
    },
    {
      pageContent: "Can you remind me of my name?",
      metadata: { class: "get_u_name" },
    },
    {
      pageContent: "What name did I use for my account?",
      metadata: { class: "get_u_name" },
    },
    {
      pageContent: "What's the name linked to my account?",
      metadata: { class: "get_u_name" },
    },
    {
      pageContent: "Can you provide my account's name?",
      metadata: { class: "get_u_name" },
    },
    {
      pageContent: "What's the name associated with my registration?",
      metadata: { class: "get_u_name" },
    },
    {
      pageContent: "Show me my recent transactions.",
      metadata: { class: "get_trans" },
    },
    {
      pageContent: "List all my transactions for this month.",
      metadata: { class: "get_trans" },
    },
    {
      pageContent: "What transactions did I make last week?",
      metadata: { class: "get_trans" },
    },
    {
      pageContent: "Retrieve my transaction history.",
      metadata: { class: "get_trans" },
    },
    {
      pageContent: "I want to see my transfers from last month.",
      metadata: { class: "get_trans" },
    },
    {
      pageContent: "Show all transactions over Rs 1000.",
      metadata: { class: "get_trans" },
    },
    {
      pageContent: "List my transactions from the last two weeks.",
      metadata: { class: "get_trans" },
    },
    {
      pageContent: "What were my transfers this week?",
      metadata: { class: "get_trans" },
    },
    {
      pageContent: "Get my transaction details for October.",
      metadata: { class: "get_trans" },
    },
    {
      pageContent: "Show my recent transaction activities.",
      metadata: { class: "get_trans" },
    },
    {
      pageContent: "List all my transfers for this year.",
      metadata: { class: "get_trans" },
    },
    {
      pageContent: "What transactions did I have in the last month?",
      metadata: { class: "get_trans" },
    },
    {
      pageContent: "Retrieve all my transfers since the beginning of the year.",
      metadata: { class: "get_trans" },
    },
    {
      pageContent: "Show me my transactions categorized by date.",
      metadata: { class: "get_trans" },
    },
    {
      pageContent: "List my transactions for the last 30 days.",
      metadata: { class: "get_trans" },
    },
    {
      pageContent: "I want to see all my transaction details.",
      metadata: { class: "get_trans" },
    },
    {
      pageContent: "Show me my transaction summary.",
      metadata: { class: "get_trans" },
    },
    {
      pageContent: "List my recent transactions in the last month.",
      metadata: { class: "get_trans" },
    },
    {
      pageContent: "What were my transactions for the current month?",
      metadata: { class: "get_trans" },
    },
    {
      pageContent: "Retrieve my financial transactions.",
      metadata: { class: "get_trans" },
    },
    {
      pageContent: "List my operations for the past week.",
      metadata: { class: "get_trans" },
    },
    {
      pageContent: "I just spent Rs 1500 on groceries.",
      metadata: { class: "create_exp" },
    },
    {
      pageContent: "Add an expense for dining out: Rs 2000.",
      metadata: { class: "create_exp" },
    },
    {
      pageContent: "Record my shopping expense of Rs 750 for clothes.",
      metadata: { class: "create_exp" },
    },
    {
      pageContent: "I paid Rs 3000 for my gym membership.",
      metadata: { class: "create_exp" },
    },
    {
      pageContent: "Just spent Rs 1200 on a new book.",
      metadata: { class: "create_exp" },
    },
    {
      pageContent: "Add Rs 500 for a coffee shop visit.",
      metadata: { class: "create_exp" },
    },
    {
      pageContent: "I spent Rs 1800 on a birthday gift.",
      metadata: { class: "create_exp" },
    },
    {
      pageContent: "Record Rs 600 for transportation costs.",
      metadata: { class: "create_exp" },
    },
    {
      pageContent: "I paid Rs 900 for a restaurant meal.",
      metadata: { class: "create_exp" },
    },
    {
      pageContent: "Add my expense of Rs 4000 for car maintenance.",
      metadata: { class: "create_exp" },
    },
    {
      pageContent: "I spent Rs 2500 on my monthly utility bill.",
      metadata: { class: "create_exp" },
    },
    {
      pageContent: "Add Rs 300 for snacks.",
      metadata: { class: "create_exp" },
    },
    {
      pageContent: "Record my expense of Rs 2000 for a movie night.",
      metadata: { class: "create_exp" },
    },
    {
      pageContent: "I just spent Rs 1000 on pet food.",
      metadata: { class: "create_exp" },
    },
    {
      pageContent: "Add Rs 1500 for online courses.",
      metadata: { class: "create_exp" },
    },
    {
      pageContent: "Record my expense of Rs 1200 for a family outing.",
      metadata: { class: "create_exp" },
    },
    {
      pageContent: "I paid Rs 800 for personal care products.",
      metadata: { class: "create_exp" },
    },
    {
      pageContent: "Add Rs 3000 for home improvement supplies.",
      metadata: { class: "create_exp" },
    },
    {
      pageContent: "I spent Rs 500 on sports equipment.",
      metadata: { class: "create_exp" },
    },
    {
      pageContent: "Record an expense of Rs 400 for a charity donation.",
      metadata: { class: "create_exp" },
    },
    {
      pageContent: "I paid Rs 600 for my monthly subscription service.",
      metadata: { class: "create_exp" },
    },
    {
      pageContent: "What is my registered email address?",
      metadata: { class: "get_u_email" },
    },
    {
      pageContent: "Can you tell me my email associated with the account?",
      metadata: { class: "get_u_email" },
    },
    {
      pageContent: "What's the email I used to sign up?",
      metadata: { class: "get_u_email" },
    },
    {
      pageContent: "Retrieve my account email, please.",
      metadata: { class: "get_u_email" },
    },
    {
      pageContent: "What email did I register with?",
      metadata: { class: "get_u_email" },
    },
    {
      pageContent: "Can you find my email address linked to the account?",
      metadata: { class: "get_u_email" },
    },
    {
      pageContent: "What is the email on file for my account?",
      metadata: { class: "get_u_email" },
    },
    {
      pageContent: "Please tell me the email I registered with.",
      metadata: { class: "get_u_email" },
    },
    {
      pageContent: "What email address is associated with my profile?",
      metadata: { class: "get_u_email" },
    },
    {
      pageContent: "Can you check my registered email address?",
      metadata: { class: "get_u_email" },
    },
    {
      pageContent: "What's the email I provided during signup?",
      metadata: { class: "get_u_email" },
    },
    {
      pageContent: "Find out my account's email address.",
      metadata: { class: "get_u_email" },
    },
    {
      pageContent: "Retrieve the email linked to my account.",
      metadata: { class: "get_u_email" },
    },
    {
      pageContent: "What email do I use for logging in?",
      metadata: { class: "get_u_email" },
    },
    {
      pageContent: "Tell me my registered email, please.",
      metadata: { class: "get_u_email" },
    },
    {
      pageContent: "What is the email associated with my user profile?",
      metadata: { class: "get_u_email" },
    },
    {
      pageContent: "Can you remind me of my email address?",
      metadata: { class: "get_u_email" },
    },
    {
      pageContent: "What email did I use for my account?",
      metadata: { class: "get_u_email" },
    },
    {
      pageContent: "What's the email linked to my account?",
      metadata: { class: "get_u_email" },
    },
    {
      pageContent: "Can you provide my account's email address?",
      metadata: { class: "get_u_email" },
    },
    {
      pageContent: "What's the email associated with my registration?",
      metadata: { class: "get_u_email" },
    },
  ];

  await vectorStore.addDocuments(documents, {
    ids: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
      "48",
      "49",
      "50",
      "51",
      "52",
      "53",
      "54",
      "55",
      "56",
      "57",
      "58",
      "59",
      "60",
      "61",
      "62",
      "63",
      "64",
      "65",
      "66",
      "67",
      "68",
      "69",
      "70",
      "71",
      "72",
      "73",
      "74",
      "75",
      "76",
      "77",
      "78",
      "79",
      "80",
      "81",
      "82",
      "83",
      "84",
      "85",
      "86",
      "87",
      "88",
      "89",
      "90",
      "91",
      "92",
      "93",
      "94",
      "95",
      "96",
      "97",
      "98",
      "99",
      "100",
      "101",
      "102",
      "103",
      "104",
      "105",
      "106",
      "107",
      "108",
      "109",
      "110",
      "111",
      "112",
      "113",
      "114",
      "115",
      "116",
      "117",
      "118",
      "119",
      "120",
      "121",
      "122",
      "123",
      "124",
      "125",
      "126",
      "127",
      "128",
      "129",
      "130",
      "131",
      "132",
      "133",
      "134",
      "135",
      "136",
      "137",
      "138",
      "139",
      "140",
      "141",
      "142",
      "143",
      "144",
      "145",
      "146",
      "147",
      "148",
      "149",
    ],
  });
}

exports.getClass = async (query) => {
  try {
    const embeddings = new OpenAIEmbeddings({
      apiKey:
        "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",
      batchSize: 512,
      model: "text-embedding-3-small",
    });

    // Initialize Pinecone Client
    const pinecone = new PineconeClient({
      apiKey: "389d3ec7-3672-4b5f-b7a6-459d38414d20",
    });
    // Initialize Pinecone Index
    const pineconeIndex = pinecone.Index("smartfinance-embeddings");
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
      maxConcurrency: 5,
    });

    const similaritySearchResults = await vectorStore.similaritySearch(
      query,
      1
    );

    let response = "";
    for (const doc of similaritySearchResults) {
      console.log(
        `* ${doc.pageContent} [${JSON.stringify(doc.metadata, null, 2)}]`
      );
      response = `${JSON.stringify(doc.metadata.class)}`;
      console.log(response);
    }
    return response;
  } catch (error) {
    console.error("Error in getClass:", error);
    throw error;
  }
};
//addDataToPinecone().catch(console.error);
