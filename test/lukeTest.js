const {describe, it} = require("./testing")
const assert = require("assert")
const { Luke } = require("../src/aiAgents/luke")
const { New } = require("../src/newsManager/newsReader")


let test_news = [
    new New(
        "Global Climate Summit Reaches Landmark Agreement",
        "World leaders agree on ambitious targets to reduce carbon emissions",
        "In a historic move, representatives from 195 countries have signed a binding agreement at the Global Climate Summit to limit global temperature rise to 1.5°C above pre-industrial levels. The pact includes commitments to phase out fossil fuels, increase renewable energy adoption, and provide financial support to developing nations for green initiatives. Experts hail this as a crucial step in combating climate change, though challenges in implementation remain."
    ),
    new New(
        "Breakthrough in Quantum Computing Achieved",
        "Scientists demonstrate quantum supremacy with 1000-qubit processor",
        "A team of researchers from a leading tech company has successfully built and operated a 1000-qubit quantum processor, marking a significant milestone in quantum computing. This achievement demonstrates quantum supremacy by solving complex problems impossible for classical supercomputers. The breakthrough promises to revolutionize fields such as cryptography, drug discovery, and financial modeling, though practical applications may still be years away."
    ),
    new New(
        "Global Economy Shows Signs of Recovery Post-Pandemic",
        "IMF reports stronger-than-expected growth in major economies",
        "The International Monetary Fund (IMF) has released a report indicating stronger-than-expected economic recovery in major global economies following the COVID-19 pandemic. The report cites successful vaccination campaigns, adaptive business practices, and government stimulus measures as key factors. However, the IMF warns of uneven recovery across different regions and emphasizes the need for continued support to developing nations."
    ),
    new New(
        "Artificial Intelligence Writes Award-Winning Novel",
        "AI-generated book wins prestigious literary prize, sparking debate",
        "In a controversial first, an artificial intelligence-generated novel has won a major literary award, beating out human authors. The AI, developed by a tech startup, was trained on thousands of classic and contemporary novels. While some hail this as a remarkable achievement in machine learning, others express concern about the future of human creativity and the authenticity of AI-generated art. The incident has ignited debates about the nature of creativity and the role of AI in the arts."
    ),
    new New(
        "Mars Colony Project Announces First Civilian Mission",
        "Private space company plans to send 20 civilians to Mars by 2030",
        "A leading private space exploration company has announced plans to establish the first human colony on Mars, with a mission to send 20 civilian volunteers by 2030. The ambitious project aims to create a self-sustaining settlement and pave the way for future Mars colonization. The announcement has generated excitement in the scientific community and attracted thousands of applicants, though experts caution about the numerous challenges and risks involved in such an unprecedented endeavor."
    ),
    new New(
        "Revolutionary Cancer Treatment Shows Promise in Clinical Trials",
        "New immunotherapy approach demonstrates 90% success rate in late-stage patients",
        "A groundbreaking cancer treatment using a novel immunotherapy approach has shown remarkable results in phase III clinical trials. The treatment, which reprograms a patient's own immune cells to target cancer, demonstrated a 90% success rate in patients with late-stage, previously untreatable cancers. Oncologists are calling it a potential game-changer in cancer therapy, though they caution that more research is needed to understand long-term effects and applicability to different types of cancer."
    ),
    new New(
        "Global Refugee Crisis Worsens Amid Climate Change and Conflicts",
        "UN reports record number of displaced persons, calls for international action",
        "The United Nations High Commissioner for Refugees (UNHCR) has reported a record number of displaced persons worldwide, citing ongoing conflicts and the increasing impact of climate change as primary factors. The report highlights the urgent need for international cooperation to address the root causes of displacement and provide humanitarian aid. The UNHCR is calling for increased funding and policy changes to support refugee resettlement and integration efforts globally."
    ),
    new New(
        "Tech Giant Launches Revolutionary Brain-Computer Interface",
        "New device allows direct communication between human brains and computers",
        "A major technology company has unveiled a groundbreaking brain-computer interface that allows direct communication between the human brain and external devices. The non-invasive device, which uses advanced neural imaging and machine learning, has shown promising results in early trials with paralyzed patients, enabling them to control computers and robotic limbs with their thoughts. While the technology offers hope for those with severe disabilities, it also raises ethical concerns about privacy and the potential for misuse."
    ),
    new New(
        "World's First Net-Zero City Completed",
        "Innovative urban project achieves complete carbon neutrality",
        "The world's first fully net-zero city has been officially completed and opened to residents. Located in the United Arab Emirates, the city utilizes cutting-edge sustainable technologies including 100% renewable energy, advanced waste recycling systems, and innovative urban planning to achieve complete carbon neutrality. The project is being hailed as a model for future urban development in the face of climate change, though critics point out the high costs involved in its construction and maintenance."
    ),
    new New(
        "Major Cryptocurrency Adopted as Legal Tender by G20 Nation",
        "Large economy becomes first G20 country to recognize Bitcoin as official currency",
        "In a move that has sent shockwaves through the global financial system, a G20 nation has officially adopted a major cryptocurrency as legal tender alongside its national currency. The decision, aimed at promoting financial innovation and reducing dependency on traditional banking systems, has been met with mixed reactions. Proponents celebrate it as a step towards a more decentralized global economy, while critics warn of potential economic instability and regulatory challenges."
    )
]

describe("Test luke bot to obtain and create news resumes", () => {
    it("Luke object starts successfully", () => {
        const luke = new Luke()
        assert.ok(luke)
    })

    it("Luke object selects the most relevant news given", async () => {
        const luke = new Luke()

        let relevantNews = await luke.selectMostRelevantNews(test_news)

        assert.ok(relevantNews)
        assert.equal(typeof relevantNews, "string")
    })
})