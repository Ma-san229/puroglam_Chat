import React from 'react';
import { ChatInput } from '../components/ChatInput';
import { MessageList } from '../components/MessageList';
import { Card } from '@/components/ui/card';
import logger from '../utils/logger';

export function ChatView() {
  logger.debug('Rendering ChatView');

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="h-[80vh] flex flex-col bg-gradient-to-b from-blue-50 to-white">
        <div className="p-6 border-b bg-gradient-to-r from-blue-500 to-purple-500">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            👋 お勉強チャット
          </h1>
          <p className="text-blue-100 mt-2">なんでも質問してね！一緒に楽しく学びましょう！</p>
        </div>
        <div className="flex-1 overflow-hidden">
          <MessageList />
        </div>
        <div className="p-6 border-t bg-white/50">
          <ChatInput />
        </div>
      </Card>
    </div>
  );
}
