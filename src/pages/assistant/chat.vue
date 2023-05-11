<script setup lang="ts">
import { reactive } from 'vue';
import { My } from '@nutui/icons-vue-taro';
import useChatService from './chat.service';

definePageConfig({
  navigationBarTitleText: 'AI聊天室',
  enableShareAppMessage: true,
});

const { postMessage, insertMessage, messageHistories } = useChatService();
const state = reactive({
  inputText: '',
});

insertMessage({
  role: 'preset_assistant',
  content: '我是智能助手,有什么可以帮助您的吗?',
});

function resetInput() {
  state.inputText = '';
}

async function submit() {
  const text = state.inputText.trim();
  if (!text) return;
  await postMessage(text);
  resetInput();
}
</script>

<template>
  <div class="cp-portal-ai-chat">
    <div class="cp-portal-ai-chat__header"></div>
    <div class="cp-portal-ai-chat__content">
      <div
        v-for="(item, index) in messageHistories"
        :key="index"
        class="cp-portal-ai-chat__msg-container"
        :class="{
          'cp-portal-ai-chat_user': item.role === 'user',
          'cp-portal-ai-chat_assistant': ['assistant', 'preset_assistant'].includes(item.role),
        }"
      >
        <nut-avatar v-if="['assistant', 'preset_assistant'].includes(item.role)" size="normal">
          <img
            alt="头像"
            src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png"
          />
        </nut-avatar>
        <div class="cp-portal-ai-chat__msg" v-html="item.content"></div>
        <nut-avatar v-if="item.role === 'user'" size="normal"><My /></nut-avatar>
      </div>
    </div>
    <div class="cp-portal-ai-chat__footer">
      <div class="cp-portal-ai-chat__footer-prefix"></div>
      <div class="cp-portal-ai-chat__footer-main">
        <nut-input
          @confirm="submit"
          @keydown.enter="submit"
          class="cp-portal-ai-chat__footer-input"
          v-model="state.inputText"
          placeholder="请输入消息内容"
        />
      </div>
      <div class="cp-portal-ai-chat__footer-suffix"></div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@compass-aiden/styles/dist/static/bem.scss';

@include b(portal-ai-chat) {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
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
    padding: 15px 23px;
    border-radius: 40px;
    background: rgba(243, 244, 246, 1);
  }
  @include e(footer-main) {
    flex: 1;
  }
  @include e(content) {
    flex: 1;
  }
  @include e(footer) {
    display: flex;
    padding: 20px 14px 0;
    height: calc(92px + env(safe-area-inset-bottom));
    background-color: #ffffff;
  }
}
</style>
