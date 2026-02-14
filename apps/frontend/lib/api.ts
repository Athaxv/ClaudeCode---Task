const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

function getSessionId(): string {
    if (typeof window === "undefined") {
        throw new Error("Session can only be accessed in browser")
    }

    let sessionId = localStorage.getItem("sessionId")

    if (!sessionId) {
        sessionId = window.crypto.randomUUID()
        localStorage.setItem("sessionId", sessionId)
    }

    return sessionId
}

export async function generateUI(message: string) {
    const sessionId = getSessionId()

    const res = await fetch(`${BASE_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, sessionId })
    })

    if (!res.ok) {
        throw new Error("Failed to generate UI")
    }

    return res.json()
}

export async function getVersions() {
    const sessionId = getSessionId()

    const res = await fetch(
        `${BASE_URL}/versions?sessionId=${sessionId}`
    )

    if (!res.ok) {
        throw new Error("Failed to fetch versions")
    }

    return res.json()
}

export async function rollback(versionId: string) {
    const sessionId = getSessionId()

    const res = await fetch(`${BASE_URL}/rollback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ versionId, sessionId })
    })

    if (!res.ok) {
        throw new Error("Rollback failed")
    }

    return res.json()
}

export async function validateAst(ast: any) {
    const sessionId = getSessionId()

    const res = await fetch(`${BASE_URL}/generate/validate-ast`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ast, sessionId })
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Validation failed")
    }

    return res.json()
}
