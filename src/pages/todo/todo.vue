<script setup lang="ts">
import { ref } from 'vue';
import { showToast } from '@tarojs/taro';
import { useContextStore, useTodoStore } from '../../stores';
import CreateTodo from './create-todo.vue';

definePageConfig({
  navigationBarTitleText: '我的待办',
});

const { isLoggedIn } = useContextStore();
const { todoList, refreshLoading, refreshTodoList } = useTodoStore();
const createTodoPanel = ref(false);

function createNewTodo() {
  if (!isLoggedIn) {
    showToast({
      icon: 'none',
      title: '当前正以离线方式使用,数据无法跨端同步',
      duration: 3000,
    });
  }
  createTodoPanel.value = true;
}
</script>

<template>
  <nut-pull-refresh class="cp-portal-todo" v-model="refreshLoading" @refresh="refreshTodoList">
    <nut-list :list-data="todoList">
      <template #default="{ item }">
        <nut-swipe>
          <nut-cell :class="{ 'cp-portal-todo__item_finished': item.isFinished }" class="cp-portal-todo__item">
            <nut-checkbox v-model="item.isFinished"></nut-checkbox>
            <div>
              <div class="cp-portal-todo__item-title cp-text-ellipsis">{{ item.title }}</div>
              <div class="cp-portal-todo__item-desc cp-text-ellipsis">{{ item.description }}</div>
            </div>
          </nut-cell>
          <template #right>
            <nut-button shape="square" style="height: 100%" type="danger">删除</nut-button>
          </template>
        </nut-swipe>
      </template>
    </nut-list>

    <div class="cp-portal-todo__sticky">
      <nut-button block @click="createNewTodo">
        <template #icon> + </template>
        新增待办
      </nut-button>
    </div>
  </nut-pull-refresh>
  <!-- 创建todo -->
  <CreateTodo v-model:visible="createTodoPanel" />
</template>

<style lang="scss">
@import '@compass-aiden/styles/dist/static/bem.scss';

@include b(portal-todo) {
  background: url('https://aidenoss.cpolar.cn/compass-open/wallpaper/riccardo-cervia-ICSRhjP1UBU-unsplash%20%281%29.jpg');
  padding: 8px 16px;
  @include e(sticky) {
    position: fixed;
    bottom: 64px;
    width: calc(100% - 32px);
  }
  @include e(item) {
    margin: 8px 0;
    @include m(finished) {
      .cp-portal-todo__item-title,
      .cp-portal-todo__item-desc {
        opacity: 0.4;
        text-decoration: line-through;
      }
    }
  }
  @include e(item-title) {
  }
  @include e(item-desc) {
    font-size: 22px;
    color: #858585;
  }
}
</style>
