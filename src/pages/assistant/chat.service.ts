import { ref } from 'vue';
import { promiseTask } from '@compass-aiden/utils';
import { ChatMessage, ChatChoice, ChatType } from '@/interfaces';
import { createChat } from '@/http';
import Taro from '@tarojs/taro';

export default function useChatService() {
  const messageHistories = ref<ChatMessage[]>([]); // 消息历史
  const chatType = ref<ChatType>('ai');

  function insertMessage(message: ChatMessage | ChatMessage[]) {
    messageHistories.value.push(...(Array.isArray(message) ? message : [message]));
  }

  async function postMessage(content: string) {
    insertMessage({
      role: 'user',
      content,
    });
    Taro.showLoading({
      title: 'AI正在思考',
    });
    const [err, result] = await promiseTask(
      createChat({
        model: 'gpt-3.5-turbo',
        choices: messageHistories.value
          .filter((msg) => ['user', 'assistant', 'system'].includes(msg.role))
          .map((msg) => ({
            role: msg.role as ChatChoice['role'],
            content: msg.content, // formatMessage(msg.content),
            name: msg.name,
          })),
      }),
    );
    Taro.hideLoading();
    if (err || !result.role) {
      Taro.showToast({
        icon: 'none',
        title: err?.message || err || result?.message || 'X 沟通失败,可能由于您的会话余额不足或其他异常导致',
        duration: 3500,
      });
      messageHistories.value.pop();
    } else {
      messageHistories.value.push(result);
    }
  }

  return {
    chatType,
    messageHistories,
    insertMessage,
    postMessage,
  };
}
