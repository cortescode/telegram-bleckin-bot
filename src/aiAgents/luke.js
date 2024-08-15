// Luke is the name for the ai agent in charge of create
// a resume for telegram given a list of news
const { Ollama } = require("@langchain/community/llms/ollama");
const { ChatPromptTemplate } = require("@langchain/core/prompts");



class Luke {
    constructor() {
        this.llm = new Ollama({
            baseUrl: "http://localhost:11434",
            model: "llama3.1",
        });

        this.prompt = ChatPromptTemplate.fromTemplate(`
You are an AI agent named Luke, tasked with selecting the most relevant news articles.
Given a list of news articles, analyze their content and select the most important and relevant ones.
Consider factors such as:
1. The impact and significance of the news.
2. How recent and timely the information is.
3. The credibility and reliability of the information.
4. The potential interest to a wide audience.


Use markdown to highlight important facts.


Here are the news articles:
{newsArticles}

Please select the top 3 most relevant news articles and create a resume of each one selected, please don't explain your choices.
Your response should be in the following format:
[A hook to catch user attention based on the news selected]
1. # [Title of the first selected article]
   [Resume of the article]

2. # [Title of the second selected article]
   [Resume of the article]

3. # [Title of the third selected article]
   [Resume of the article]
`);

        this.chain = this.prompt.pipe(this.llm);
    }

    async selectMostRelevantNews(newsList) {
        const newsArticles = newsList.map(_new => _new.toString()).join("\n\n");
        
        const response = await this.chain.invoke({ newsArticles });
        return response;
    }
}



module.exports = {Luke}