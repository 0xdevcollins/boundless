"use client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"

interface MarkdownProps {
    children: string
    className?: string
}

export function Markdown({ children, className }: MarkdownProps) {
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {children}
        </ReactMarkdown>
    )
}
