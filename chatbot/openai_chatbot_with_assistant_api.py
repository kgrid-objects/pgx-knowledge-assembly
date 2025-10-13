import json
import os
from collections import deque

import openai
from dotenv import load_dotenv
from langchain.prompts import ChatPromptTemplate
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import DocArrayInMemorySearch
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_openai.chat_models import ChatOpenAI
from langchain_openai.embeddings import OpenAIEmbeddings

# Load environment variables
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
model_name = os.getenv("MODEL")
knowledge_base = os.getenv("KNOWLEDGE_BASE")
model_seed = int(os.getenv("MODEL_SEED"))

# Setup OpenAI API client
openai.api_key = OPENAI_API_KEY

# Initialize the language model
model = ChatOpenAI(
    openai_api_key=OPENAI_API_KEY, model=model_name
)  # add tempurture and seed: , temperature=0, seed=model_seed

# Initialize embeddings and vector store
embeddings = OpenAIEmbeddings()
splits = []
file_paths = (file.path for file in os.scandir(knowledge_base) if file.is_file())
for file_path in file_paths:
    loader = TextLoader(file_path, encoding="utf-8")
    ko = loader.load()

    with open(file_path, "r", encoding="utf-8") as file:
        code_file = json.load(file)
    
    splits.extend(ko)
vectorstore2 = DocArrayInMemorySearch.from_documents(splits, embeddings)

# Create the Chain
template = """
You have access to metadata for CPIC pharmacogenomic Knowledge Objects (KOs) which are gathered in a Knowledge Assembly (KA). These KOs are organized into three sets (knwoledge sets) in the KA , one can help mapping a patient's Genotype to Phenotype and the other two can help with mapping Phenotype to Recommendations. KA links these KOs and provides some services thet make it possible to produce patient specific drug selection and dosing recommendations.  
Answer any question about these KOs and the KA based on the context available which is the metadata of KOs and KA. For questions about KA, knwoledge sets and list of KOs used in the KA and how these KOs are linked in the KA you can use the KS metadata 'knowledge assembly metadata.json'.
You do not have access to the knowledge representations for these KOs but you can provide information about these KOs and KA using their metadata. For using the KS or KOs and accessing actual recommendations refer to use the KA. 
If you don't know the answer, just say that you don't know. 
Context: {context}

Question: {question}
"""
prompt = ChatPromptTemplate.from_template(template)
parser = StrOutputParser()
chain = (
    {
        "context": vectorstore2.as_retriever(search_kwargs={"k": 20}),
        "question": RunnablePassthrough(),
    }
    | prompt
    | model
    | parser
)


# Prepare History
def get_full_context(history, current_query):
    history_text = "\n".join([f"User: {q}\nBot: {a}" for q, a in history])
    full_context = f"{history_text}\nUser: {current_query}\nBot:"
    return full_context


def process(text, conversation_history):
    full_context = get_full_context(conversation_history, text)
    response = chain.invoke(full_context)

    return response


def main():
    # Store the conversation history
    conversation_history = deque(maxlen=10)

    while True:
        try:
            text = input("Ask anything: --> ")
        except (KeyboardInterrupt, EOFError):
            print("\nExiting...")
            break
        response = process(text, conversation_history)
        print(response)
        conversation_history.append(
            (text, response)
        )  


if __name__ == "__main__":
    main()

