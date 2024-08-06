const { Ollama } = require("@langchain/community/llms/ollama");
const { ChatPromptTemplate } = require("@langchain/core/prompts");


async function testOllama() {

    let llm = new Ollama({
        baseUrl: "http://localhost:11434",
        model: "llama3.1",
    });

    let prompt = ChatPromptTemplate.fromTemplate("Translate the following text to French: {text}")

    let chain = prompt.pipe(llm);

    let response = await chain.invoke({text: "This is a simple text"});

    console.log(response)
}


testOllama()