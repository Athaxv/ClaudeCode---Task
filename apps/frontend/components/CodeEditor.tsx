"use client"

import Editor from "@monaco-editor/react"
import { useEffect, useState } from "react"
import { validateAst } from "@/lib/api"

type Props = {
    ast: any
    onValidAst: (ast: any) => void
}

export default function CodeEditor({ ast, onValidAst }: Props) {
    const [code, setCode] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [validating, setValidating] = useState(false)

    useEffect(() => {
        if (ast) {
            setCode(JSON.stringify(ast, null, 2))
        }
    }, [ast])

    async function handleValidate() {
        setError(null)
        setValidating(true)

        try {
            const parsed = JSON.parse(code)
            const result = await validateAst(parsed)
            onValidAst(result.ast)
        } catch (err: any) {
            setError(err.message || "Invalid JSON format")
        } finally {
            setValidating(false)
        }
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex-1">
                <Editor
                    height="100%"
                    defaultLanguage="json"
                    value={code}
                    onChange={(value) => { setCode(value || ""); setError(null); }}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        fontSize: 13,
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        wordWrap: "on",
                        padding: { top: 12 },
                    }}
                />
            </div>

            {error && (
                <div className="px-3 py-2 bg-red-500/10 border-t border-red-500/30 text-red-400 text-xs">
                    {error}
                </div>
            )}

            <div className="border-t border-[#262626] p-2 flex justify-end">
                <button
                    onClick={handleValidate}
                    disabled={validating}
                    className="px-4 py-1.5 bg-[#D97757] hover:bg-[#C4684A] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-medium rounded transition-colors"
                >
                    {validating ? "Validating..." : "Apply Changes"}
                </button>
            </div>
        </div>
    )
}
