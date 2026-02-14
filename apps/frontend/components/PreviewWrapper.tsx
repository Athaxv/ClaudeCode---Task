"use client"

export function PreviewWrapper({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen w-full bg-muted/40 flex justify-center">
            <div className="w-full max-w-6xl bg-background shadow-sm border rounded-lg m-6 p-6">
                {children}
            </div>
        </div>
    )
}
