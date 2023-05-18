<script setup lang="ts">
import { reactive } from 'vue';
import { My, Checklist } from '@nutui/icons-vue-taro';
import Taro from '@tarojs/taro';
import { ChatType } from '@/interfaces';
import useChatService from './chat.service';

definePageConfig({
  navigationBarTitleText: 'AI聊天室',
  enableShareAppMessage: true,
});

const { postMessage, insertMessage, messageHistories, chatType } = useChatService();
const state = reactive({
  inputText: '',
  avatarUrl: '',
  chatType: 'ai' as ChatType,
});

const instance = Taro.getCurrentInstance();

function initMessages(type?: ChatType) {
  switch (type) {
    case 'translation-zh':
      insertMessage([
        {
          role: 'preset_assistant',
          content: '我是中文翻译官,您可以把想要翻译的内容直接发送给我',
        },
        {
          role: 'user',
          content:
            '请把我接下来发送的所有对话内容直接翻译成中文,内容可以是任何语种,不要询问我是否翻译,不要提醒我发送的是什么语种,直接将结果回复给我',
          hidden: true,
        },
      ]);
      break;
    case 'translation-en':
      insertMessage([
        {
          role: 'preset_assistant',
          content: 'I am an English translator, you can directly send me the content you want to translate',
        },
        {
          role: 'user',
          content:
            '请把我接下来发送的所有对话内容直接翻译成英文,内容可以是任何语种,不要询问我是否翻译,不需要提醒我发送的是什么语种,直接将结果回复给我',
          hidden: true,
        },
      ]);
      break;
    case 'ai':
    default:
      insertMessage({
        role: 'preset_assistant',
        content: '我是智能助手,有什么可以帮助您的吗?',
      });
      break;
  }
}

function resetInput() {
  state.inputText = '';
}

async function submit() {
  const text = state.inputText.trim();
  if (!text) return;
  await postMessage(text);
  resetInput();
}

(function created() {
  state.chatType = instance.router?.params?.chatType as ChatType;
  state.avatarUrl = instance.router?.params?.avatarUrl || '';
  chatType.value = state.chatType;
  initMessages(state.chatType);
})();
</script>

<template>
  <div class="cp-portal-ai-chat">
    <div class="cp-portal-ai-chat__header"></div>
    <div class="cp-portal-ai-chat__content">
      <div
        v-for="(item, index) in messageHistories"
        :key="index"
        class="cp-portal-ai-chat__msg-container"
        v-show="!item.hidden"
        :class="{
          'cp-portal-ai-chat_user': item.role === 'user',
          'cp-portal-ai-chat_assistant': ['assistant', 'preset_assistant'].includes(item.role),
        }"
      >
        <nut-avatar v-if="['assistant', 'preset_assistant'].includes(item.role)" size="normal">
          <img alt="头像" :src="state.avatarUrl" style="border-radius: 50%" />
        </nut-avatar>
        <div class="cp-portal-ai-chat__msg" v-html="item.content"></div>
        <nut-avatar v-if="item.role === 'user'" size="normal"><My /></nut-avatar>
      </div>
    </div>
    <div class="cp-portal-ai-chat__footer">
      <div class="cp-portal-ai-chat__footer-prefix"></div>
      <div class="cp-portal-ai-chat__footer-main">
        <nut-textarea
          class="cp-portal-ai-chat__footer-input"
          v-model="state.inputText"
          placeholder="请输入消息内容"
          :autosize="{ maxHeight: 200, minHeight: 30 }"
        />
      </div>
      <div class="cp-portal-ai-chat__footer-suffix">
        <nut-button v-if="state.inputText.length" @click="submit" size="small" type="success">
          <template #icon>
            <Checklist />
          </template>
        </nut-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@compass-aiden/styles/dist/static/bem.scss';

@include b(portal-ai-chat) {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f5f5f5;
  @include e(msg-container) {
    display: flex;
    align-items: flex-start;
    margin-top: 30px;
  }
  @include e(msg) {
    padding: 15px 30px;
    max-width: 70%;
    text-align: left;
    border-radius: 16px;
    margin: 0 0 0 15px;
    border: 0;
    white-space: break-spaces;
    background-color: #ffffff;
  }
  @include m(user) {
    justify-content: flex-end;
    .cp-portal-ai-chat__msg {
      margin: 0 15px 0 0;
      color: #ffffff;
      background-color: #22c55e;
    }
  }
  @include e(footer-input) {
    flex: 1;
    padding: 0 23px;
    min-height: 60px;
    border-radius: 40px;
    background: rgba(243, 244, 246, 1);
  }
  @include e(footer-main) {
    flex: 1;
  }
  @include e(content) {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
  }
  @include e(footer) {
    display: flex;
    align-items: center;
    padding: 20px;
    //height: calc(92px + env(safe-area-inset-bottom));
    background-color: #ffffff;
  }
}
</style>
