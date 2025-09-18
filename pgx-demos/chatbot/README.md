## Environment setup
Make sure poetry is installed
Clone the repository using
```
git clone https://github.com/kgrid-lab/LLM_with_RAG_chatbot.git
```

setup a virtual environment using poetry
```
cd LLM_with_RAG_chatbot
poetry env use 3.11
poetry shell
poetry install
```

Create a .env file in the root of the project and store the following values in it
```
KNOWLEDGE_BASE="KO/"
MODEL="gpt-4o"
MODEL_SEED=1762259501
OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
```
- The KNOWLEDGE_BASE points to the location of knowledge object context files.
- MODEL defines the version of the GPT to be used. We recomment use of gpt-4o or newer versions.
- Get your own API key at [OpenAI's API keys section](https://platform.openai.com/api-keys) and set OPENAI_API_KEY with its value. 
## Run the app 
Once the environment is set up you can run this app to be useed from command line using
```
python chatbot/openai_chatbot_with_assistant_api.py 
```

To run this app locally to access web interface use 
```
python chatbot/chatbot.py
``` 