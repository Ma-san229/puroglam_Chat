import type { Express } from "express";
import { chatController } from "./controllers/chatController";
import logger from "./utils/logger";

export function registerRoutes(app: Express) {
  logger.info('Registering routes');

  app.post('/api/chat', async (req, res) => {
    try {
      const response = await chatController.handleChatMessage(req.body.message);
      res.json({ response });
    } catch (error) {
      logger.error('Error handling chat message', { error });
      res.status(500).json({ error: 'Failed to process message' });
    }
  });
}
