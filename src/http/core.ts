import Taro, { showToast } from '@tarojs/taro';
import { useContextStore } from '@/stores';
import { BACKEND_API_PREFIX, CONTEXT_STORAGE_KEY } from '@/config';
import { HttpResponse } from '@/interfaces';

export function wrapCompassURL(path: string) {
  return `${BACKEND_API_PREFIX}${path.startsWith('/') ? path : `/${path}`}`;
}

export function createRequest<Result = any, Params extends string | TaroGeneral.IAnyObject | ArrayBuffer = any>(
  option: Taro.request.Option<HttpResponse<Result>, Params>,
): Promise<Result | null> {
  return Taro.request({
    ...option,
    header: {
      authorization: `bearer ${Taro.getStorageSync(CONTEXT_STORAGE_KEY)?.token}`,
    },
    url: wrapCompassURL(option.url),
  })
    .then((result) => {
      if (result.statusCode < 200 || result.statusCode > 299) {
        if (result.statusCode === 401) {
          Taro.setStorageSync(CONTEXT_STORAGE_KEY, null);
          const { checkSession } = useContextStore();
          checkSession().then(() => {
            Taro.reLaunch({
              url: '/pages/todo/todo', // 刷新进入首页
            });
          });
          return null;
        }
        throw new Error(result.data?.message || result.errMsg || '请求异常');
      }
      if (result.data?.statusCode === 100200) {
        return result.data.data as Result;
      }
      const err = new Error(result.data?.message || '业务异常');
      // @ts-ignore
      err.code = 'business_exception';
      throw err;
    })
    .catch(async (err) => {
      // @ts-ignore
      if (err.code) {
        throw err;
      }
      await showToast({
        icon: 'error',
        title: err?.message || err?.toString() || err,
        duration: 3000,
      });
      throw err;
    });
}
