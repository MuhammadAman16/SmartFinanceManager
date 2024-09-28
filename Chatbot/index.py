import psycopg2
import spacy

# Load spaCy model for NLU
nlp=spacy.load("en_core_web_sm")

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

# Intent classification (simple for now)
def get_intent(user_input):
    doc = nlp(user_input.lower())
    
    if "username" in user_input or "email" in user_input:
        return "get_user_info"
    elif "expenses" in user_input:
        return "get_expenses"
    else:
        return "unknown"

# SQL query execution based on intent
def handle_intent(intent, user_id):
    connection = connect_to_db()
    if not connection:
        return "Unable to connect to the database."

    cursor = connection.cursor()

    if intent == "get_user_info":
        query = 'SELECT username, email FROM public."Users" WHERE id = %s'
        cursor.execute(query, (user_id,))
        result = cursor.fetchone()
        response = f"Your username is {result[0]} and your email is {result[1]}."
    
    elif intent == "get_expenses":
        query = 'SELECT * FROM public."Expenses" WHERE user_id = %s'
        cursor.execute(query, (user_id,))
        expenses = cursor.fetchall()
        response = "Here are your expenses:\n" + "\n".join([str(exp) for exp in expenses])
    
    else:
        response = "I didn't understand that."

    cursor.close()
    connection.close()
    return response

# Main chatbot function
def chatbot(user_input, user_id):
    intent = get_intent(user_input)
    return handle_intent(intent, user_id)

# Example usage
user_input = input("Ask me something: ")
user_id = 1  # Replace with actual user ID
response = chatbot(user_input, user_id)
print(response)
