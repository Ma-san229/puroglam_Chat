import logger from '../utils/logger';

class GeminiService {
  private readonly API_KEY = process.env.GEMINI_API_KEY;
  private readonly API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  async generateResponse(message: string): Promise<string> {
    logger.debug('Calling Gemini API', { message });

    try {
      const response = await fetch(`${this.API_URL}?key=${this.API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: message
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from Gemini API');
      }

      const data = await response.json();
      logger.debug('Received Gemini API response', { data });

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      logger.error('Error calling Gemini API', { error });
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
