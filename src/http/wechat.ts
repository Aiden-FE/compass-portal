import { createRequest } from './core';

// eslint-disable-next-line import/prefer-default-export
export function wechatLogin(code: string) {
  return createRequest({
    url: '/v1/oauth/login/wechat',
    method: 'POST',
    data: { code },
  });
}
