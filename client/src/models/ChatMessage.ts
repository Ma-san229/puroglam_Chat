export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

export const createChatMessage = (content: string, role: 'user' | 'assistant'): ChatMessage => {
  return {
    id: crypto.randomUUID(),
    content,
    role,
    timestamp: Date.now(),
  };
};
