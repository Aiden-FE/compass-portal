import { ChatData } from '@/interfaces';
import { createRequest } from './core';

// eslint-disable-next-line import/prefer-default-export
export function createChat(data: ChatData) {
  return createRequest({
    method: 'POST',
    url: '/v1/ai/chat',
    data,
  });
}
