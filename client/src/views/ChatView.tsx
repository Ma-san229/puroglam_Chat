import React from 'react';
import { ChatInput } from '../components/ChatInput';
import { MessageList } from '../components/MessageList';
import { Card } from '@/components/ui/card';
import logger from '../utils/logger';

export function ChatView() {
  logger.debug('Rendering ChatView');

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="h-[80vh] flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">AI Chat</h1>
        </div>
        <div className="flex-1 overflow-hidden">
          <MessageList />
        </div>
        <div className="p-4 border-t">
          <ChatInput />
        </div>
      </Card>
    </div>
  );
}
