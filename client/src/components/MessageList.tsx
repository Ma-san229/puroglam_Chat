import React from 'react';
import { useChat } from '../context/ChatContext';
import { ScrollArea } from '@/components/ui/scroll-area';
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
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              {message.content}
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
