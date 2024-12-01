import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useChat } from '../context/ChatContext';
import { chatController } from '../controllers/ChatController';
import { createChatMessage } from '../models/ChatMessage';
import logger from '../utils/logger';

export function ChatInput() {
  const [input, setInput] = useState('');
  const { addMessage, setIsLoading } = useChat();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    logger.debug('Handling message submission', { input });

    const userMessage = createChatMessage(input, 'user');
    addMessage(userMessage);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatController.sendMessage(input);
      addMessage(response);
    } catch (error) {
      logger.error('Error sending message', { error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="質問を入力してね！"
        className="flex-1 text-lg rounded-full px-6 border-2 border-blue-200 focus-visible:ring-blue-400"
      />
      <Button type="submit" className="rounded-full px-8 text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
        送信 ✨
      </Button>
    </form>
  );
}
