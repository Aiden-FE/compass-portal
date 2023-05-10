export const INDEX_PAGE = 'pages/index/index';
export const AI_ASSISTANT_PAGE = 'pages/assistant/assistant';
export const TODO_PREVIEW_PAGE = 'pages/todo/todo';
export const AI_ASSISTANT_CHAT_PAGE = 'pages/assistant/chat';

export default defineAppConfig({
  entryPagePath: INDEX_PAGE,
  pages: [INDEX_PAGE, AI_ASSISTANT_PAGE, TODO_PREVIEW_PAGE, AI_ASSISTANT_CHAT_PAGE],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: '#C4C4C4',
    selectedColor: '#928FFF',
    backgroundColor: '#FFF',
    list: [
      {
        pagePath: INDEX_PAGE,
        text: '首页',
        iconPath: 'assets/images/home.png',
        selectedIconPath: 'assets/images/home-active.png',
      },
      {
        pagePath: AI_ASSISTANT_PAGE,
        text: 'AI助手',
        iconPath: 'assets/images/aliwangwang-fill.png',
        selectedIconPath: 'assets/images/aliwangwang-fill-active.png',
      },
      {
        pagePath: TODO_PREVIEW_PAGE,
        text: '待办',
        iconPath: 'assets/images/solution.png',
        selectedIconPath: 'assets/images/solution-active.png',
      },
    ],
  },
});
