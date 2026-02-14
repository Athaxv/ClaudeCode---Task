"use client"

import { Button as ShadButton } from "@/components/ui/button"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card"
import { Input as ShadInput } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"

type Node = {
    id: string
    type: string
    props: any
    children?: Node[]
}

const gapMap: Record<number, string> = {
    0: "gap-0",
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
}

const paddingMap: Record<number, string> = {
    0: "p-0",
    1: "p-1",
    2: "p-2",
    3: "p-3",
    4: "p-4",
    6: "p-6",
    8: "p-8",
}

export function Renderer({ node }: { node: Node }) {
    if (!node) return null

    const { type, props, children } = node

    switch (type) {
        case "Container": {
            const direction =
                props.direction === "row" ? "flex-row" : "flex-col"

            const gapClass = gapMap[props.gap ?? 0] || ""
            const paddingClass = paddingMap[props.padding ?? 0] || ""

            return (
                <div className={`flex ${direction} ${gapClass} ${paddingClass}`}>
                    {children?.map((child) => (
                        <Renderer key={child.id} node={child} />
                    ))}
                </div>
            )
        }


        case "Navbar":
            return (
                <div className="w-full border-b bg-background px-6 py-4 flex items-center">
                    <h2 className="text-lg font-semibold">{props.title}</h2>
                </div>
            )

        case "Sidebar":
            return (
                <div className="w-48 border-r bg-muted p-4 flex flex-col gap-2">
                    {props.items?.map((item: string, i: number) => (
                        <div
                            key={i}
                            className="text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground px-2 py-1 rounded"
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )

        case "Card":
            return (
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>{props.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {children?.map((child) => (
                            <Renderer key={child.id} node={child} />
                        ))}
                    </CardContent>
                </Card>
            )

        case "Button":
            return (
                <ShadButton>
                    {props.label}
                </ShadButton>
            )

        case "Input":
            return (
                <ShadInput placeholder={props.placeholder} />
            )

        case "Modal":
            return (
                <Dialog open={props.isOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{props.title}</DialogTitle>
                        </DialogHeader>
                        {children?.map((child) => (
                            <Renderer key={child.id} node={child} />
                        ))}
                    </DialogContent>
                </Dialog>
            )

        default:
            return null
    }
}
