import { ref, onMounted, onBeforeUnmount } from 'vue';
import { showToast } from '@tarojs/taro';
import { Todo, Todos } from '../pages/todo/todo.type';
import useContextStore from './context';

export default function useTodoStore() {
  const { isLoggedIn } = useContextStore();
  const todoList = ref<Todos>([]);
  const refreshLoading = ref(false);
  if (isLoggedIn) {
    // 获取远程数据
  }

  function checkOffline() {
    if (!isLoggedIn) {
      showToast({
        icon: 'none',
        title: '当前正以离线方式使用,无法正常使用',
        duration: 5000,
      });
    }
  }

  async function refreshTodoList() {
    refreshLoading.value = true;
    if (!isLoggedIn) {
      checkOffline();
      refreshLoading.value = false;
      return [];
    }
    refreshLoading.value = false;
    // 获取远程数据并赋值
    todoList.value = [];
    return todoList.value;
  }
  function addTodo(todo: Todo) {
    todoList.value.push(todo);
    // 提交到远程数据
    checkOffline();
  }

  onMounted(() => {
    checkOffline();
  });

  onBeforeUnmount(() => {
    todoList.value = [];
  });

  return { todoList, refreshLoading, addTodo, refreshTodoList };
}
