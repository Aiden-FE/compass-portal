<script lang="ts" setup>
import { reactive, ref, defineProps, defineEmits, watch } from 'vue';
import { Checklist, Edit } from '@nutui/icons-vue-taro';
import { Todo } from './todo.type';

interface Props {
  visible: boolean;
  todo?: Todo;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<Props>();
const emits = defineEmits<{
  (e: 'update:visible', visible: boolean): void;
  (e: 'submit', todo: Partial<Todo>): void;
}>();
const newTodo = reactive<Partial<Todo>>({
  title: '',
  description: '',
  isFinished: false,
});
const mode = ref<'edit' | 'view'>('edit');
const rules = {
  title: [
    {
      required: true,
      message: '必须提供待办标题',
    },
  ],
};

function reset() {
  newTodo.title = '';
  newTodo.description = '';
  newTodo.isFinished = false;
  newTodo.id = undefined;
  mode.value = 'edit';
}

function visibleChanged(visi: boolean) {
  if (!visi) {
    reset();
  }
  emits('update:visible', visi);
}

function submit() {
  if (!newTodo.title) {
    visibleChanged(false);
    return;
  }
  emits('submit', { ...newTodo });
  visibleChanged(false);
}

function editTodo() {
  mode.value = 'edit';
}

(function created() {
  watch(
    () => props.visible,
    (visible) => {
      if (visible && props.todo) {
        mode.value = 'view';
        newTodo.title = props.todo.title;
        newTodo.description = props.todo.description;
        newTodo.isFinished = props.todo.isFinished;
        newTodo.id = props.todo.id;
      }
    },
  );
})();
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
    <nut-form :model-valu="newTodo" :rules="rules">
      <nut-form-item prop="title" label="待办标题" required label-width="80px" label-align="right">
        <nut-input
          :readonly="mode === 'view'"
          v-model="newTodo.title"
          placeholder="请输入待办标题"
          max-length="24"
          :border="false"
        />
      </nut-form-item>
      <nut-form-item prop="description" label="待办描述" label-width="80px" label-align="right">
        <nut-textarea
          :readonly="mode === 'view'"
          v-model="newTodo.description"
          placeholder="请输入待办事项的详细描述"
          :limit-show="mode === 'edit'"
          max-length="255"
        />
      </nut-form-item>
    </nut-form>
    <div class="cp-portal-todo__create-footer">
      <div class="cp-portal-todo__create-footer-extra"></div>
      <div class="cp-portal-todo__create-footer-action">
        <nut-button @click="editTodo" v-if="mode === 'view'">
          <template #icon>
            <Edit />
          </template>
        </nut-button>
        <nut-button v-if="mode === 'edit'" @click="submit">
          <template #icon>
            <Checklist />
          </template>
        </nut-button>
      </div>
    </div>
  </nut-popup>
</template>

<style lang="scss">
@import '@compass-aiden/styles/dist/static/bem.scss';

@include b(portal-todo) {
  @include e(create-footer-extra) {
    flex: 1;
  }
  @include e(create-footer) {
    display: flex;
    align-items: center;
  }
  @include e(create-item) {
    color: var(--cp-font-color);
  }
}
</style>
