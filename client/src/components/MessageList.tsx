import React from 'react';
import { useChat } from '../context/ChatContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Card } from '@/components/ui/card';
import logger from '../utils/logger';

export function MessageList() {
  const { messages, isLoading } = useChat();

  logger.debug('Rendering MessageList', { messageCount: messages.length });

  return (
    <ScrollArea className="h-full p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 text-lg shadow-lg ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                  : 'bg-white border-2 border-purple-200'
              }`}
            >
              {message.role === 'user' ? (
                <div className="text-white">{message.content}</div>
              ) : (
                <div className="prose prose-sm max-w-none dark:prose-invert marker:text-purple-500">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      code({ node, inline, className, children, ...props }: { node?: any; inline?: boolean; className?: string; children: React.ReactNode[] }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline ? (
                          <div className="relative group">
                            <pre className="bg-zinc-950 text-white rounded-lg p-4 mt-2">
                              <code className={className} {...props}>
                                {children}
                              </code>
                            </pre>
                          </div>
                        ) : (
                          <code className="bg-purple-100 text-purple-900 px-1 rounded" {...props}>
                            {children}
                          </code>
                        );
                      },
                      h1: ({ children }) => <h1 className="text-2xl font-bold text-purple-900 mb-4">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-xl font-bold text-purple-800 mb-3">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-lg font-bold text-purple-700 mb-2">{children}</h3>,
                      p: ({ children }) => <p className="text-gray-700 mb-4">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc list-inside mb-4">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal list-inside mb-4">{children}</ol>,
                      li: ({ children }) => <li className="text-gray-700 mb-2">{children}</li>,
                      strong: ({ children }) => <strong className="font-bold text-purple-900">{children}</strong>,
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-muted">
              Thinking...
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
