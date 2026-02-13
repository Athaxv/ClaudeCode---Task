"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    items: { label: string; href: string; icon?: React.ReactNode }[]
}

export function Sidebar({ className, items, ...props }: SidebarProps) {
    return (
        <div className={cn("pb-12 w-64 border-r min-h-screen", className)} {...props}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Menu
                    </h2>
                    <div className="space-y-1">
                        {items.map((item) => (
                            <button
                                key={item.href}
                                className="w-full justify-start text-left px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors flex items-center gap-2"
                            >
                                {item.icon}
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string
}

export function Navbar({ className, title, children, ...props }: NavbarProps) {
    return (
        <div className={cn("border-b", className)} {...props}>
            <div className="flex h-16 items-center px-4">
                <div className="font-bold text-lg">{title}</div>
                <div className="ml-auto flex items-center space-x-4">
                    {children}
                </div>
            </div>
        </div>
    )
}
