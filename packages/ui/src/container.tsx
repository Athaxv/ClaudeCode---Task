"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    layout?: "flex" | "grid" | "block"
    direction?: "row" | "col"
    gap?: "2" | "4" | "6" | "8"
    padding?: "2" | "4" | "6" | "8"
    align?: "start" | "center" | "end" | "stretch"
    justify?: "start" | "center" | "end" | "between"
}

export function Container({
    className,
    children,
    layout = "block",
    direction = "col",
    gap,
    padding,
    align,
    justify,
    ...props
}: ContainerProps) {
    const layoutStyles = {
        block: "block",
        flex: "flex",
        grid: "grid"
    }

    const directionStyles = {
        row: "flex-row",
        col: "flex-col"
    }

    const gapStyles = {
        "2": "gap-2",
        "4": "gap-4",
        "6": "gap-6",
        "8": "gap-8"
    }

    const paddingStyles = {
        "2": "p-2",
        "4": "p-4",
        "6": "p-6",
        "8": "p-8"
    }

    const alignStyles = {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch"
    }

    const justifyStyles = {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between"
    }

    return (
        <div
            className={cn(
                layoutStyles[layout],
                layout === "flex" && directionStyles[direction],
                gap && gapStyles[gap],
                padding && paddingStyles[padding],
                align && alignStyles[align],
                justify && justifyStyles[justify],
                className // Keep className for internal overrides if absolutely needed, but Agent won't send it
            )}
            {...props}
        >
            {children}
        </div>
    )
}
