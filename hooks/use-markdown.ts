import { useState, useEffect } from 'react';
import { marked } from 'marked';
import React from 'react';

interface UseMarkdownOptions {
  breaks?: boolean;
  gfm?: boolean;
  pedantic?: boolean;
  loadingDelay?: number;
}

interface UseMarkdownReturn {
  content: string;
  loading: boolean;
  error: string | null;
  styledContent: React.ReactElement;
}

export function useMarkdown(
  markdownText: string,
  options: UseMarkdownOptions = {}
): UseMarkdownReturn {
  const {
    breaks = true,
    gfm = true,
    pedantic = true,
    loadingDelay = 100,
  } = options;

  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const parseMarkdown = async () => {
      try {
        setLoading(true);
        setError(null);

        // Configure marked with custom options
        marked.use({
          breaks,
          gfm,
          pedantic,
        });

        // Parse markdown synchronously
        const parsedContent = marked.parse(markdownText) as string;

        // Simulate loading delay for better UX
        if (loadingDelay > 0) {
          await new Promise(resolve => setTimeout(resolve, loadingDelay));
        }

        setContent(parsedContent);
        setLoading(false);
      } catch {
        setError('Failed to parse markdown content');
        setContent(markdownText); // Fallback to raw content
        setLoading(false);
      }
    };

    if (markdownText) {
      parseMarkdown();
    } else {
      setContent('');
      setLoading(false);
    }
  }, [markdownText, breaks, gfm, pedantic, loadingDelay]);

  const styledContent = React.createElement(
    React.Fragment,
    null,
    React.createElement('style', {
      jsx: true,
      global: true,
      dangerouslySetInnerHTML: {
        __html: `
          .markdown-content {
            color: #B5B5B5;
            line-height: 1.7;
          }
          
          /* Headings */
          .markdown-content h1 {
            color: #ffffff;
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            margin-top: 2rem;
            line-height: 1.2;
          }
          
          .markdown-content h2 {
            color: #ffffff;
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 1rem;
            margin-top: 1.5rem;
            line-height: 1.3;
          }
          
          .markdown-content h3 {
            color: #ffffff;
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            margin-top: 1.25rem;
            line-height: 1.4;
          }
          
          .markdown-content h4 {
            color: #ffffff;
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            margin-top: 1rem;
            line-height: 1.4;
          }
          
          .markdown-content h5 {
            color: #ffffff;
            font-size: 1.125rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            margin-top: 0.75rem;
            line-height: 1.4;
          }
          
          .markdown-content h6 {
            color: #ffffff;
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            margin-top: 0.75rem;
            line-height: 1.4;
          }
          
          /* Paragraphs */
          .markdown-content p {
            color: #FFFFFF;
            margin-bottom: 1rem;
            line-height: 1.7;
          }
          
          /* Strong and Bold */
          .markdown-content strong,
          .markdown-content b {
            color: #ffffff;
            font-weight: 600;
          }
          
          /* Emphasis and Italic */
          .markdown-content em,
          .markdown-content i {
            color: #D1D5DB;
            font-style: italic;
          }
          
          /* Links */
          .markdown-content a {
            color: #A7F950;
            text-decoration: none;
            border-bottom: 1px solid transparent;
            transition: all 0.2s ease;
          }
          
          .markdown-content a:hover {
            color: #7ED321;
            border-bottom-color: #A7F950;
          }
          
          /* Lists */
          .markdown-content ul {
            color: #B5B5B5;
            margin-bottom: 1rem;
            padding-left: 1.5rem;
          }
          
          .markdown-content ol {
            color: #B5B5B5;
            margin-bottom: 1rem;
            padding-left: 1.5rem;
          }
          
          .markdown-content li {
            margin-bottom: 0.5rem;
            line-height: 1.6;
          }
          
          .markdown-content ul li {
            list-style-type: disc;
          }
          
          .markdown-content ol li {
            list-style-type: decimal;
          }
          
          /* Nested Lists */
          .markdown-content ul ul,
          .markdown-content ol ol,
          .markdown-content ul ol,
          .markdown-content ol ul {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
          }
          
          /* Blockquotes */
          .markdown-content blockquote {
            border-left: 4px solid #A7F950;
            padding-left: 1rem;
            margin: 1.5rem 0;
            font-style: italic;
            color: #B5B5B5;
            background: rgba(167, 249, 80, 0.05);
            padding: 1rem;
            border-radius: 0.5rem;
          }
          
          .markdown-content blockquote p {
            margin-bottom: 0;
          }
          
          /* Code */
          .markdown-content code {
            background: #2B2B2B;
            color: #A7F950;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.875rem;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          }
          
          .markdown-content pre {
            background: #1B1B1B;
            border: 1px solid #2B2B2B;
            border-radius: 0.5rem;
            padding: 1rem;
            margin: 1.5rem 0;
            overflow-x: auto;
          }
          
          .markdown-content pre code {
            background: transparent;
            color: #E5E7EB;
            padding: 0;
            border-radius: 0;
            font-size: 0.875rem;
          }
          
          /* Tables */
          .markdown-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            background: #1B1B1B;
            border-radius: 0.5rem;
            overflow: hidden;
          }
          
          .markdown-content th {
            background: #2B2B2B;
            color: #ffffff;
            padding: 0.75rem;
            text-align: left;
            font-weight: 600;
            border-bottom: 1px solid #2B2B2B;
          }
          
          .markdown-content td {
            color: #B5B5B5;
            padding: 0.75rem;
            border-bottom: 1px solid #2B2B2B;
          }
          
          .markdown-content tr:last-child td {
            border-bottom: none;
          }
          
          /* Horizontal Rules */
          .markdown-content hr {
            border: none;
            height: 1px;
            background: #2B2B2B;
            margin: 2rem 0;
          }
          
          /* Images */
          .markdown-content img {
            max-width: 100%;
            height: auto;
            border-radius: 0.5rem;
            margin: 1.5rem 0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
          }
          
          /* Keyboard Keys */
          .markdown-content kbd {
            background: #2B2B2B;
            color: #ffffff;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.875rem;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            border: 1px solid #404040;
          }
          
          /* Mark/Highlight */
          .markdown-content mark {
            background: rgba(167, 249, 80, 0.3);
            color: #ffffff;
            padding: 0.125rem 0.25rem;
            border-radius: 0.25rem;
          }
          
          /* Small Text */
          .markdown-content small {
            color: #9CA3AF;
            font-size: 0.875rem;
          }
          
          /* Subscript and Superscript */
          .markdown-content sub,
          .markdown-content sup {
            font-size: 0.75rem;
            color: #9CA3AF;
          }
          
          /* Definition Lists */
          .markdown-content dl {
            margin: 1rem 0;
          }
          
          .markdown-content dt {
            color: #ffffff;
            font-weight: 600;
            margin-top: 1rem;
          }
          
          .markdown-content dd {
            color: #B5B5B5;
            margin-left: 1rem;
            margin-bottom: 0.5rem;
          }
          
          /* Task Lists */
          .markdown-content input[type="checkbox"] {
            margin-right: 0.5rem;
            accent-color: #A7F950;
          }
          
          /* Responsive Design */
          @media (max-width: 768px) {
            .markdown-content h1 {
              font-size: 2rem;
            }
            
            .markdown-content h2 {
              font-size: 1.75rem;
            }
            
            .markdown-content h3 {
              font-size: 1.5rem;
            }
            
            .markdown-content pre {
              padding: 0.75rem;
              font-size: 0.8rem;
            }
            
            .markdown-content table {
              font-size: 0.875rem;
            }
          }
        `,
      },
    }),
    React.createElement('div', {
      className: 'markdown-content',
      dangerouslySetInnerHTML: { __html: content },
    })
  );

  return { content, loading, error, styledContent };
}
