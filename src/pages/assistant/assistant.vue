<script setup lang="ts">
import Taro from '@tarojs/taro';

definePageConfig({
  navigationBarTitleText: 'AI助手',
  enableShareAppMessage: true,
});

function toChat(type: 'ai' | 'writing') {
  Taro.navigateTo({
    url: `/pages/assistant/chat?type=${type}`,
  });
}
</script>

<template>
  <div class="cp-portal-ai">
    <nut-cell
      @click="toChat('ai')"
      class="cp-portal-ai__item"
      title="AI导师"
      sub-title="我是涉猎广泛的AI导师,如果没有其他问题相关的专业导师就来问我吧!"
      is-link
    >
      <template #icon>
        <nut-avatar size="large">
          <img
            src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png"
            alt="头像"
          />
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
