import { geminiService } from '../services/geminiService';
import logger from '../utils/logger';

class ChatController {
  async handleChatMessage(message: string): Promise<string> {
    logger.debug('Processing chat message', { message });

    try {
      const response = await geminiService.generateResponse(message);
      logger.debug('Generated AI response', { response });
      return response;
    } catch (error) {
      logger.error('Error generating response', { error });
      throw error;
    }
  }
}

export const chatController = new ChatController();
