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
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="flex-1"
      />
      <Button type="submit">Send</Button>
    </form>
  );
}
