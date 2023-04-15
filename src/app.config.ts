export const INDEX_PAGE = 'pages/index/index';
export const TODO_PREVIEW_PAGE = 'pages/todo/todo-preview';

export default defineAppConfig({
  pages: [INDEX_PAGE, TODO_PREVIEW_PAGE],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
});
