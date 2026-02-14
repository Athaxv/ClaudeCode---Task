export async function safeLLMCall<T>(
    fn: () => Promise<T>,
    maxRetries = 2
): Promise<T> {
    let lastError: any

    for (let i = 0; i <= maxRetries; i++) {
        try {
            return await fn()
        } catch (err) {
            lastError = err
        }
    }

    throw new Error(
        "LLM failed after retries: " + lastError?.message
    )
}
