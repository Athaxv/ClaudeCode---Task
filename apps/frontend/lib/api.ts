const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

export async function generateUI(message: string) {
    const res = await fetch(`${BASE_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
    })

    if (!res.ok) {
        throw new Error("Failed to generate UI")
    }

    return res.json()
}

export async function getVersions() {
    const res = await fetch(`${BASE_URL}/versions`)
    return res.json()
}

export async function rollback(versionId: string) {
    const res = await fetch(`${BASE_URL}/rollback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ versionId })
    })

    return res.json()
}

export async function validateAst(ast: any) {
    const res = await fetch(`${BASE_URL}/generate/validate-ast`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ast })
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Validation failed")
    }

    return res.json()
}
