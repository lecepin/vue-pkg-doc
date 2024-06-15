import { defineConfig } from 'vitepress'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {
  viteDemoPreviewPlugin,
  demoPreviewPlugin
} from 'vitepress-code-demo-plugin'

const pkg = JSON.parse(
  readFileSync(resolve(__dirname, '../package.json'), 'utf-8')
)

export default defineConfig({
  base: '/',
  title: 'VUE.PKG',
  description: '...',
  lang: 'zh',
  themeConfig: {
    nav: [],
    logo: '/logo.png',
    sidebar: [
      {
        text: 'VUE-PKG',
        link: '/docs/main'
      },
      {
        text: '快速开始',
        collapsed: false,
        items: [
          {
            text: '环境准备',
            link: '/docs/dev'
          },
          {
            text: '初始化',
            link: '/docs/init'
          }
        ]
      },
      {
        text: '目录结构',
        collapsed: false,
        items: [
          {
            text: 'Vue 组件库标准版',
            link: '/docs/vue-tpl'
          },
          {
            text: 'Vue 组件库极简文档版',
            link: '/docs/vue-min-doc-tpl'
          }
        ]
      },
      {
        text: '文档',
        collapsed: false,
        items: [
          {
            text: '写组件 Demo',
            link: '/docs/demo'
          },
          {
            text: 'API 模板',
            link: '/docs/api'
          },
          {
            text: 'Markdown 增强',
            link: '/docs/markdown'
          },
          {
            text: 'Markdown 中使用 Vue',
            link: '/docs/markdown-vue'
          },
          { text: '国际化', link: '/docs/i18n' }
        ]
      },
      {
        text: '构建',
        collapsed: false,
        items: [
          {
            text: 'Vue 组件库',
            link: '/docs/build-vue'
          }
        ]
      },
      {
        text: '测试',
        link: '/docs/test'
      },
      {
        text: '部署',
        link: '/docs/deploy'
      },
      {
        text: '常见问题',
        link: '/docs/qa'
      }
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/lecepin'
      }
    ],
    search: {
      provider: 'local'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航',
      level: 'deep'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  },
  markdown: {
    config(md) {
      // @ts-ignore
      md.use(demoPreviewPlugin)
    },
    math: true
  },
  vite: {
    plugins: [vueJsx(), viteDemoPreviewPlugin()],
    resolve: {
      alias: {
        pkg1: resolve(__dirname, '../src/index.ts')
      }
    },
    optimizeDeps: {
      include: [],
      exclude: []
    },
    esbuild: {}
  }
})
