import logger from '../utils/logger';
import { ChatMessage, createChatMessage } from '../models/ChatMessage';

export class ChatController {
  async sendMessage(message: string): Promise<ChatMessage> {
    logger.debug('Sending message to server', { message });
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      logger.debug('Received response from server', { response: data });
      
      return createChatMessage(data.response, 'assistant');
    } catch (error) {
      logger.error('Error sending message', { error });
      throw error;
    }
  }
}

export const chatController = new ChatController();
