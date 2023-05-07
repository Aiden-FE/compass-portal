import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import Taro, { showToast } from '@tarojs/taro';
import { promiseTask } from '@compass-aiden/utils';
import { GlobalContext } from '@/interfaces';
import { wechatLogin } from '@/http';
import { CONTEXT_STORAGE_KEY } from '@/config';

export default defineStore('context', () => {
  const context = ref<GlobalContext | null>(null);
  const isLoggedIn = computed(() => !!context.value);

  async function checkSession(): Promise<boolean> {
    if (process.env.TARO_ENV === 'weapp') {
      const [err] = await promiseTask(Taro.checkSession());
      if (err || !context.value?.token) {
        const [loginErr, result] = await promiseTask(Taro.login());
        if (loginErr || !result) {
          showToast({
            icon: 'none',
            title: '当前会话异常,无法正常使用',
            duration: 3000,
          });
          throw new Error('当前会话异常,无法正常使用');
        }
        const data = await wechatLogin(result.code);
        if (data) {
          Taro.setStorageSync(CONTEXT_STORAGE_KEY, data || null);
        }
      }
    }
    return true;
  }

  context.value = Taro.getStorageSync(CONTEXT_STORAGE_KEY) || null;

  return {
    context,
    isLoggedIn,
    checkSession,
  };
});
