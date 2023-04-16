<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue';
import { showToast } from '@tarojs/taro';
import { Todo } from './todo.type';
import { useTodoStore } from '../../stores';

interface Props {
  visible: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits<{
  (e: 'update:visible', visible: boolean): void;
}>();
const { addTodo } = useTodoStore();
const newTodo = reactive<Todo>({
  title: '',
  isFinished: false,
});

const { visible } = toRefs(props);

function visibleChanged(visi: boolean) {
  emits('update:visible', visi);
}

function submit() {
  if (newTodo.title?.trim()) {
    addTodo(newTodo);
  }
  visibleChanged(false);
}
</script>

<template>
  <nut-popup
    class="cp-portal-todo__create"
    position="bottom"
    :style="{ padding: '16px' }"
    :visible="visible"
    @update:visible="visibleChanged"
    safe-area-inset-bottom
  >
    <nut-cell center style="height: 44px">
      <nut-checkbox disabled></nut-checkbox>
      <nut-input v-model="newTodo.title" @confirm="submit" placeholder="请输入待办标题" :border="false" />
    </nut-cell>
  </nut-popup>
</template>

<style lang="scss">
@import '@compass-aiden/styles/dist/static/bem.scss';

@include b(portal-todo) {
  @include e(create-item) {
    color: var(--cp-font-color);
  }
}
</style>
