export const INDEX_PAGE = 'pages/index/index';
export const TODO_PREVIEW_PAGE = 'pages/todo/todo';

export default defineAppConfig({
  entryPagePath: TODO_PREVIEW_PAGE,
  pages: [TODO_PREVIEW_PAGE, INDEX_PAGE],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
});
