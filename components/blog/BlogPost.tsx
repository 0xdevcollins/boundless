"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
	inline?: boolean;
	children?: React.ReactNode;
}

interface BlogPostProps {
	content: string;
}

export function BlogPost({ content }: BlogPostProps) {
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			components={{
				code({ inline, className, children, ...props }: CodeProps) {
					const match = /language-(\w+)/.exec(className || "");
					return !inline && match ? (
						<SyntaxHighlighter
							// @ts-expect-error - The style prop type is complex and the type assertion is needed
							style={vscDarkPlus}
							language={match[1]}
							PreTag="div"
							{...props}
						>
							{String(children).replace(/\n$/, "")}
						</SyntaxHighlighter>
					) : (
						<code className={className} {...props}>
							{children}
						</code>
					);
				},
				img: (props) => (
					<div className="relative w-full h-[400px]">
						<Image
							src={props.src || ""}
							alt={props.alt || ""}
							fill
							className="object-cover rounded-lg"
						/>
					</div>
				),
				a: (props) => (
					<a
						{...props}
						className="text-primary hover:underline"
						target="_blank"
						rel="noopener noreferrer"
					/>
				),
			}}
		>
			{content}
		</ReactMarkdown>
	);
}
