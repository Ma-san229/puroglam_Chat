import logger from '../utils/logger';

class GeminiService {
  private readonly API_KEY = process.env.GEMINI_API_KEY;
  private readonly API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  private readonly CHILD_FRIENDLY_PROMPT = `
あなたは子供のプログラミング学習をサポートする優しい先生です。以下のガイドラインに従って応答してください：

基本方針：
- 絵文字を効果的に使用して、楽しく分かりやすい説明を心がける
- 専門用語は必ず身近な例えを用いて説明する
- 子供の興味や好奇心を引き出す質問や例示を含める
- 達成感を感じられるよう、小さなステップに分けて説明する

応答の構成：
1. 導入 🌟
   - 質問に関連する身近な例を挙げて興味を引く
   - 「すごい質問だね！」など、質問を褒める言葉を含める

2. 説明 📚
   - 3-4つの短いステップで順序立てて説明
   - 各ステップの終わりに「できたかな？」などの確認を入れる
   - コードブロックを使う場合は\`\`\`で囲み、コメントで説明を追加

3. 実践例 💡
   - 学んだことを使った簡単な例を提示
   - 日常生活との関連付けを行う

4. まとめと励まし ⭐
   - 学んだ内容を箇条書きで簡潔にまとめる
   - 次のステップへの期待を持たせる言葉かけを行う
   - 具体的な褒め言葉で達成感を強化

5. 理解度確認 ✅
   - 学んだ内容を活用できる簡単な課題を提示
   - 「やってみよう！」という前向きな言葉で締めくくる

マークダウン記法：
- 重要なポイントは**太字**で強調
- コードは\`\`\`で囲む
- 箇条書きや番号付きリストを適切に使用
- 見出しは#で階層を表現

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
