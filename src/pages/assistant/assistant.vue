<script setup lang="ts">
import Taro from '@tarojs/taro';
import { ref } from 'vue';

definePageConfig({
  navigationBarTitleText: 'AI助手',
  enableShareAppMessage: true,
});

const systemRole = ref([
  {
    type: 'ai',
    avatarUrl:
      'https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png',
    title: 'AI导师',
    description: '我是涉猎广泛的AI导师,如果没有其他问题相关的专业导师就来问我吧!',
  },
  {
    type: 'translation-zh',
    avatarUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?undefined',
    title: '中文翻译官',
    description: '我是专业的中文翻译官,能够将你提供的内容转为中文!',
  },
  {
    type: 'translation-en',
    avatarUrl: 'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
    title: 'English Translator',
    description:
      'I am a professional English translator and I am able to translate the content you provide into English!',
  },
]);

function toChat(type: string, avatarUrl: string) {
  Taro.navigateTo({
    url: `/pages/assistant/chat?chatType=${type}&avatarUrl=${avatarUrl}`,
  });
}
</script>

<template>
  <div class="cp-portal-ai">
    <nut-cell
      v-for="item in systemRole"
      :key="item.type"
      @click="toChat(item.type, item.avatarUrl)"
      class="cp-portal-ai__item"
      :title="item.title"
      :sub-title="item.description"
      is-link
    >
      <template #icon>
        <nut-avatar size="large">
          <img :src="item.avatarUrl" :alt="item.title" style="border-radius: 50%" />
        </nut-avatar>
      </template>
    </nut-cell>
    <div class="cp-portal-ai__tips">其他导师正在赶来的路上~</div>
  </div>
</template>

<style lang="scss">
@import '@compass-aiden/styles/dist/static/bem.scss';

@include b(portal-ai) {
  @include e(tips) {
    text-align: center;
    color: #858585;
    font-size: 24px;
  }
}
</style>
