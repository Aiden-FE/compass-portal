import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Tour } from '@nutui/nutui-taro';
import './app.scss';
import { useContextStore } from '@/stores';

const App = createApp({
  async onShow() {
    const { checkSession } = useContextStore();
    await checkSession();
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.use(createPinia()).use(Tour);

export default App;
