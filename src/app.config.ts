export const INDEX_PAGE = 'pages/index/index';
export const TODO_PREVIEW_PAGE = 'pages/todo/todo';

export default defineAppConfig({
  pages: [INDEX_PAGE, TODO_PREVIEW_PAGE],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: '#C4C4C4',
    selectedColor: '#0f95b0',
    backgroundColor: '#FFF',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/images/home.png',
        selectedIconPath: 'assets/images/home-active.png',
      },
      {
        pagePath: 'pages/todo/todo',
        text: '待办',
        iconPath: 'assets/images/solution.png',
        selectedIconPath: 'assets/images/solution-active.png',
      },
    ],
  },
});
