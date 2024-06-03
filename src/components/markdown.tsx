import React from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import cn from "classnames";

interface MarkdownRendererProps {
    className?: string;
}

const MarkdownRenderer = ({ children, className }: React.PropsWithChildren<MarkdownRendererProps>) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            className={cn(className)}
            >
            {children as string}
        </ReactMarkdown>
    );
};

export default MarkdownRenderer;
