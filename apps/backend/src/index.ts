import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import generateRoute from "./routes/generate.js"
import rollbackRoute from "./routes/rollback.js"
import versionsRoute from "./routes/versions.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/generate", generateRoute)
app.use("/rollback", rollbackRoute)
app.use("/versions", versionsRoute)

const PORT = 4000

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`)
})
