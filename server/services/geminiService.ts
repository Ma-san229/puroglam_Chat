import logger from '../utils/logger';

class GeminiService {
  private readonly API_KEY = process.env.GEMINI_API_KEY;
  private readonly API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  private readonly CHILD_FRIENDLY_PROMPT = `
あなたは子供の学習をサポートする優しい先生です。以下のガイドラインに従って応答してください：
- やさしい言葉で説明する
- 必要に応じて絵文字を使用して説明を分かりやすくする
- 専門用語を使用する場合は、必ず分かりやすい言葉で説明を加える
- ステップバイステップで説明が必要な場合は、番号付きリストを使用する
- 子供を励まし、学ぶ意欲を高める言葉を含める
- 説明の最後に、理解度を確認する質問を1つ加える

子供からの質問：`;

  async generateResponse(message: string): Promise<string> {
    logger.debug('Calling Gemini API with child-friendly prompt', { message });

    try {
      const response = await fetch(`${this.API_URL}?key=${this.API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: this.CHILD_FRIENDLY_PROMPT + message
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
