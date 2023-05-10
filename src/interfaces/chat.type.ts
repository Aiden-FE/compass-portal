export interface ChatChoice {
  role: 'user' | 'assistant' | 'system';
  content: string;
  name?: string;
}

export interface ChatData {
  model: string;
  choices: ChatChoice[];
}

export interface ChatMessage extends Omit<ChatChoice, 'role'> {
  role: 'user' | 'assistant' | 'system' | 'preset_assistant';
  avatarURL?: string;
}
