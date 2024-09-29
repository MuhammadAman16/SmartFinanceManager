import psycopg2
import spacy
import torch
from transformers import DistilBertTokenizerFast, DistilBertForSequenceClassification
from spellchecker import SpellChecker


def spell_check_input(text):
    spell = SpellChecker()
    corrected_words = [spell.correction(word) for word in text.split()]
    return ' '.join(corrected_words)
# Load spaCy model for NLU

# Load the fine-tuned model and tokenizer
model_path = "E:/Muhammad Aman/FYP_2024/FYP_app/SmartFinanceManager/Chatbot/distilbert-finetuned"  # Update with the actual path to your fine-tuned model
tokenizer = DistilBertTokenizerFast.from_pretrained(model_path)
model = DistilBertForSequenceClassification.from_pretrained(model_path)

# Access the label-to-ID mapping
# label2id = model.config.label2id
# id2label = model.config.id2label

# # Print the mappings
# print("Label to ID mapping:", label2id)
# print("ID to Label mapping:", id2label)

def classify_intent(user_input):
    inputs = tokenizer(user_input, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
    logits = outputs.logits
    predicted_class_id = torch.argmax(logits, dim=-1).item()
    print(predicted_class_id)
    # Map predicted class ID back to the label
    label_mapping = {0: "get_user_email", 1: "get_expenses",2:"update_email",3:"get_transactions",4:"get_user_name",5:"get_budget",6:"get_income"}  # Update based on your dataset
    intent = label_mapping.get(predicted_class_id, "unknown")
    
    return intent


def connect_to_db():
    try:
        # Replace these with your actual Supabase details
        connection = psycopg2.connect(
            host="aws-0-ap-southeast-1.pooler.supabase.com",  # e.g., db.xyz.supabase.co
            database="postgres",
            user="postgres.azaibirlnuifsujzpizt",
            password="aA@03062196090",
            port="6543"  # Default PostgreSQL port
        )
        print("Connected to the database successfully")
        return connection
    except Exception as error:
        print(f"Error while connecting to database: {error}")
        return None


    

# SQL query execution based on intent
def handle_intent(intent, user_id):
    connection = connect_to_db()
    if not connection:
        return "Unable to connect to the database."

    cursor = connection.cursor()

    if intent == "get_user_email":
        query = 'SELECT email FROM public."Users" WHERE id = %s'
        cursor.execute(query, (user_id,))
        result = cursor.fetchone()
        response = f"Your user name is {result[0]} and your email is {result[1]}."
    elif intent == "get_user_name":
        query = 'SELECT "fullName" FROM public."Users" WHERE id = %s'
        cursor.execute(query, (user_id,))
        result = cursor.fetchone()
        response = f"Your user name is {result[0]}."
    # elif intent == "get_expenses":
    #     query = 'SELECT * FROM public."Expanse" WHERE user_id = %s'
    #     cursor.execute(query, (user_id,))
    #     expenses = cursor.fetchall()
    #     response = "Here are your expenses:\n" + "\n".join([str(exp) for exp in expenses])
    
    elif intent == "get_budget":
        query = 'SELECT name,period,amount,account FROM public."Budgets" WHERE "userId" = %s'
        cursor.execute(query, (user_id,))
        budgets = cursor.fetchall()
        response = "Here is your budget:\n" + "\n".join([str(budget) for budget in budgets])
    else:
        response = "I didn't understand that."

    cursor.close()
    connection.close()
    return response

# Main chatbot function
def chatbot(user_input, user_id):
    intent = classify_intent(user_input)
    print(intent)
    return handle_intent(intent, user_id)

# Example usage
user_input = input("Ask me something: ")
user_id = 1  # Replace with actual user ID
corrected_input = spell_check_input(user_input)
print(corrected_input)
response = chatbot(corrected_input, user_id)
print(response)
