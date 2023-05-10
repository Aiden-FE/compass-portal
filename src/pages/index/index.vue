<script setup lang="ts">
import Taro from '@tarojs/taro';

definePageConfig({
  navigationBarTitleText: '首页',
  enableShareAppMessage: true,
});

function toggleRoute(path: string, pageType = 'tab') {
  if (pageType === 'tab') {
    Taro.switchTab({
      url: path,
    });
  }
}
</script>

<template>
  <div class="cp-portal-home">
    <nut-cell-group class="cp-portal-home__tools" title="工具列表">
      <nut-cell
        @click="toggleRoute('/pages/assistant/assistant')"
        class="cp-portal-home__tools-item"
        title="AI助手"
      ></nut-cell>
      <nut-cell
        @click="toggleRoute('/pages/todo/todo')"
        class="cp-portal-home__tools-item"
        title="待办事项"
        is-link
      ></nut-cell>
      <!--      <nut-cell class="cp-portal-home__tools-item" title="备忘录(敬请期待)" to="/"></nut-cell>-->
    </nut-cell-group>
  </div>
</template>

<style lang="scss">
@import '@compass-aiden/styles/dist/static/bem.scss';

@include b(portal-home) {
  height: 100%;
  padding: 16px;
  background-color: #f5f5f5;
  --nut-cell-group-title-font-size: 30px;
  --nut-cell-group-title-color: #1e2e39;
  --nut-cell-background: #f5f5f5;
  .nut-cell-group__title {
    font-weight: bold;
  }
  @include e(tools-item) {
    color: #fff;
    background-image: linear-gradient(90deg, var(--app-primary-color) 0%, rgba(0, 0, 0, 0.01) 100%);
  }
  @include e(tools) {
    border-radius: 8px;
    background-color: #f5f5f5;
    box-shadow: 0.7px 0.7px 2px 0px #ffffff, inset -0.5px -0.5px 0px 0px #ffffff, -4px -4px 9px 0px #f5f5f5,
      4px 4px 9px 0px var(--app-primary-color);
  }
}
</style>
