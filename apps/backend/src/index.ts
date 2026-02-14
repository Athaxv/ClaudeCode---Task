import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import generateRoute from "./routes/generate.js"
import rollbackRoute from "./routes/rollback.js"
import versionsRoute from "./routes/versions.js"

dotenv.config()

const app = express()

app.use(cors({
    origin: [
        "https://claude-code-frontend.vercel.app",
        "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}))
app.use(express.json())

// Health check for Render
app.get("/", (_req, res) => {
    res.json({ status: "ok" })
})

app.use("/generate", generateRoute)
app.use("/rollback", rollbackRoute)
app.use("/versions", versionsRoute)

const PORT = process.env.PORT ?? 4000

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`)
})
