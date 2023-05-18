import Taro from '@tarojs/taro';

/** 是否为生产环境 */
export const IS_PROD = process.env.NODE_ENV !== 'development';

/** 运行平台 */
export const PLATFORM_ENV = Taro.getEnv();

/** 后端接口前缀 */
export const BACKEND_API_PREFIX = IS_PROD ? 'https://aiden.cpolar.cn/api' : 'http://localhost:8080/api';
// export const BACKEND_API_PREFIX = 'https://aiden.cpolar.cn/api';

/** 上下文storage key */
export const CONTEXT_STORAGE_KEY = 'context';
