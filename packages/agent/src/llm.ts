import "dotenv/config"
import Groq from "groq-sdk";

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

export async function callLLM(system: string, user: string) {
    const response = await client.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages: [
            { role: "system", content: system },
            { role: "user", content: user }
        ],
        temperature: 0
    })

    return response.choices[0]?.message?.content ?? ""
}


