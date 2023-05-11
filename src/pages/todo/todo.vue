<script setup lang="ts">
import { onBeforeUnmount, reactive, ref, shallowRef } from 'vue';
import { promiseTask } from '@compass-aiden/utils';
import { useContextStore } from '@/stores';
import { createTodo, deleteTodo, getTodoList, modifyTodo } from '@/http';
import Taro from '@tarojs/taro';
import CreateTodo from './create-todo.vue';
import { Todo } from './todo.type';

definePageConfig({
  navigationBarTitleText: '我的待办',
  enableShareAppMessage: true,
});

const { checkSession } = useContextStore();
const list = shallowRef<Todo[]>([]);
const editTodo = shallowRef<Todo | null>(null); // 正在编辑的todo
const loading = ref(false);
const createTodoPanel = ref(false);
const query = reactive({
  keyword: '',
  pageNum: 0,
  pageSize: 20,
  total: undefined as number | undefined,
});

async function queryTodoList(isRefresh = false) {
  if (loading.value) {
    return;
  }
  if (isRefresh) {
    query.pageNum = 0;
    query.total = undefined;
  }
  if (query.total !== undefined && list.value.length >= query.total) {
    return;
  }
  try {
    loading.value = true;
    Taro.showLoading({
      title: '正在获取列表',
    });
    const [err, result] = await promiseTask(
      getTodoList({
        keyword: query.keyword,
        pageNum: isRefresh ? query.pageNum : query.pageNum + 1,
        pageSize: query.pageSize,
      }),
    );
    loading.value = false;
    if (err) {
      return;
    }
    query.pageNum = result.pageNum;
    query.pageSize = result.pageSize;
    query.total = result.total;
    list.value = isRefresh ? result.list : list.value.concat(result.list);
  } finally {
    Taro.hideLoading();
  }
}

async function addTodo(todo: Partial<Todo>) {
  if (!todo.title) return;
  if (todo.id) {
    await modifyTodo(todo as Todo);
  } else {
    await createTodo(todo as Todo);
  }
  queryTodoList(true);
}

async function removeTodo(id: Todo['id']) {
  await deleteTodo(id);
  queryTodoList(true);
}

function displayTodo(todo: Todo) {
  editTodo.value = todo;
  createTodoPanel.value = true;
}

onBeforeUnmount(() => {
  list.value = [];
});

async function createNewTodo() {
  createTodoPanel.value = true;
}

function toggleTodoPanel(visi: boolean) {
  if (!visi) {
    editTodo.value = null;
  }
  createTodoPanel.value = visi;
}

function modifyTodoStatus(todo: Todo, state: boolean) {
  modifyTodo({
    ...todo,
    isFinished: state,
  });
}

(async function created() {
  await checkSession();
  queryTodoList(true);
})();
</script>

<template>
  <div class="gradient-bg cp-portal-todo">
    <nut-list v-if="list.length" :list-data="list" @scroll-bottom="queryTodoList">
      <template #default="{ item }">
        <nut-swipe>
          <nut-cell :class="{ 'cp-portal-todo__item_finished': item.isFinished }" class="cp-portal-todo__item">
            <nut-checkbox v-model="item.isFinished" @change="(state) => modifyTodoStatus(item, state)"></nut-checkbox>
            <div class="cp-portal-todo__item-content" @click="displayTodo(item)" @keydown="displayTodo(item)">
              <div class="cp-portal-todo__item-title cp-text-ellipsis">{{ item.title }}</div>
              <div class="cp-portal-todo__item-desc cp-text-ellipsis">{{ item.description }}</div>
            </div>
          </nut-cell>
          <template #right>
            <nut-button @click="removeTodo(item.id)" shape="square" style="height: 100%" type="danger">删除</nut-button>
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
  </div>
  <!-- 创建todo -->
  <CreateTodo :visible="createTodoPanel" @update:visible="toggleTodoPanel" @submit="addTodo" :todo="editTodo" />
</template>

<style lang="scss">
@import '@compass-aiden/styles/dist/static/bem.scss';

@include b(portal-todo) {
  padding: 8px 16px;
  height: 100%;
  @include e(item-content) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  @include e(sticky) {
    position: fixed;
    bottom: 64px;
    width: calc(100% - 32px);
    button {
      background: var(--app-primary-color);
      color: #fff;
      border: 0;
      border-radius: 12px;
    }
  }
  @include e(item) {
    margin: 8px 0;
    height: 120px;
    align-items: center;
    @include m(finished) {
      .cp-portal-todo__item-title,
      .cp-portal-todo__item-desc {
        opacity: 0.4;
        text-decoration: line-through;
      }
    }
  }
  @include e(item-title) {
    color: var(--cp-font-color, rgb(15, 15, 15));
  }
  @include e(item-desc) {
    font-size: 22px;
    color: #858585;
  }
}
</style>
