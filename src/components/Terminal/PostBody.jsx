import React from 'react';

const rawContent = `
# My React Markdown Post

This is a paragraph with inline code: \`const greeting = "Hello World";\`

And here's a multiline code block:

\`\`\`javascript
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // Outputs: 5
\`\`\`

You can mix in other Markdown elements such as lists:

- Item 1
- Item 2
  - Subitem A
  - Subitem B

And even links: [OpenAI](https://www.openai.com/)

Enjoy the magic of Markdown and React!
`;

const PostBody = ({ content }) => {
  const Pre = ({ children }) => (
    <pre className="blog-pre">
      {/* Include CodeCopyBtn component if needed */}
      {/* <CodeCopyBtn>{children}</CodeCopyBtn> */}
      {children}
    </pre>
  );

  return (
    <ReactMarkdown
      className="post-markdown"
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      components={{
        pre: Pre,
        code({ node, inline, className = "blog-code", children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={a11yDark}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

// Use the PostBody component with the example raw content


export default PostBody;
