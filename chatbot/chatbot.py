# pip install docarray
import os

from dotenv import load_dotenv
from langchain.prompts import ChatPromptTemplate
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import DocArrayInMemorySearch
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_openai.chat_models import ChatOpenAI
from langchain_openai.embeddings import OpenAIEmbeddings
import warnings

def main():
    # Disable only the "ValidationError has been moved" warning
    warnings.filterwarnings(
        "ignore",
        message=r"`pydantic.error_wrappers:ValidationError` has been moved to `pydantic:ValidationError`",
        category=UserWarning,
    )
    load_dotenv()

    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

    model = ChatOpenAI(openai_api_key=OPENAI_API_KEY, model=os.getenv("MODEL"))


    embeddings = OpenAIEmbeddings()

    splits = []
    knowledge_base = os.environ["KNOWLEDGE_BASE"]

    files = os.listdir(knowledge_base)
    for file in files:
        loader = TextLoader(os.path.join(knowledge_base, file))
        ko = loader.load()
        splits.extend(ko)

    vectorstore2 = DocArrayInMemorySearch.from_documents(splits, embeddings)
    template = """
    You have access to metadata for CPIC pharmacogenomic Knowledge Objects (KOs) which are gathered in a Knowledge Assembly (KA). These KOs are organized into two sets (knwoledge sets) in the KA , one can help mapping a patient's Genotype to Phenotype and the other one can help with mapping Phenotype to Recommendations. KA links these KOs and provides some services thet make it possible to produce patient specific drug selection and dosing recommendations.  \
    Answer any question about these KOs and the KA based on the context available which is the metadata of KOs and KA. \
    You do not have access to the knowledge representations for these KOs but you can provide information about these KOs and KA using their metadata. For using the KS or KOs and accessing actual recommendations refer to use the KA. \
    If you don't know the answer, just say that you don't know. \

    Context: {context}

    Question: {question}
    """
    # Do not include code or logic of the function in the responses. Instead, use your python interpreter tool to execute code functions and only use the final calculated value by the function to answer the questions. \

    prompt = ChatPromptTemplate.from_template(template)
    parser = StrOutputParser()
    chain = (
        {"context": vectorstore2.as_retriever(), "question": RunnablePassthrough()}
        | prompt
        | model
        | parser
    )
    while True:
        try:
            text = input("Ask anything: --> ")
        except (KeyboardInterrupt, EOFError):
            print("\nExiting...")
            break
        response = chain.invoke(text)
        print(response)


if __name__ == "__main__":
    main()