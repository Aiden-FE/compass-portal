import Components from 'unplugin-vue-components/webpack';
import NutUIResolver from '@nutui/nutui-taro/dist/resolver';
import path from 'node:path';

/**
 * @typedef { import("@tarojs/plugin-mini-ci").CIOptions } CIOptions
 * @type {CIOptions}
 */
const CIPluginOpt = {
  weapp: {
    appid: '微信小程序appid',
    privateKeyPath: 'private.wxdf94fe5d7928e120.key',
  },
}

const config = {
  projectName: 'compass-taro',
  date: '2023-4-15',
  designWidth (input) {
    if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
      return 375
    }
    return 750
  },
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: ['@tarojs/plugin-html', ['@tarojs/plugin-mini-ci', CIPluginOpt]],
  defineConstants: {
  },
  alias: {
    '@/stores': path.resolve(__dirname, '..', 'src/stores'),
    '@/interfaces': path.resolve(__dirname, '..', 'src/interfaces'),
    '@/http': path.resolve(__dirname, '..', 'src/http'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/config': path.resolve(__dirname, '..', 'src/config'),
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'vue3',
  compiler: {
    type: 'webpack5',
    prebundle: { enable: false }
  },
  cache: {
    enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  sass:{
    data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`
  },
  mini: {
    miniCssExtractPluginOption: {
      ignoreOrder: true,
    },
    webpackChain(chain) {
      chain.plugin('unplugin-vue-components').use(Components({
        resolvers: [NutUIResolver({taro: true})]
      }))
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          // selectorBlackList: ['nut-']
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    webpackChain(chain) {
      chain.plugin('unplugin-vue-components').use(Components({
        resolvers: [NutUIResolver({taro: true})]
      }))
    },
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['nutui-taro', 'icons-vue-taro'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
