import { defineConfig } from 'vitepress'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import vueJsx from '@vitejs/plugin-vue-jsx'

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
            text: '目录结构',
            link: '/docs/dir'
          }
        ]
      },
      {
        text: 'CLI',
        link: '/docs/8'
      },
      {
        text: '文档使用',
        collapsed: false,
        items: [
          {
            text: '代码运行',
            link: '/docs/2'
          },
          {
            text: '使用 Vue',
            link: '/docs/3'
          },
          {
            text: '主页定制',
            link: '/docs/5'
          },
          {
            text: 'API 生成',
            link: '/docs/6'
          },
          {
            text: '自定义配置',
            link: '/docs/4'
          }
        ]
      },
      {
        text: '构建',
        collapsed: false,
        items: [
          {
            text: '一键构建',
            link: '/docs/2'
          },
          {
            text: '构建能力',
            link: '/docs/2'
          },
          {
            text: '构建场景',
            link: '/docs/2'
          },
          {
            text: '构建灵活配置',
            link: '/docs/3'
          }
        ]
      },
      {
        text: '测试',
        link: '/docs/7'
      },
      {
        text: '部署',
        link: '/docs/7'
      },
      {
        text: '常见问题',
        link: '/docs/7'
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
    config(md) {}
  },
  vite: {
    plugins: [vueJsx()],
    resolve: {
      // alias: {
      //   [pkg.name]: resolve(__dirname, "../src/index.ts"),
      // },
    },
    optimizeDeps: {
      include: [],
      exclude: []
    },
    esbuild: {}
  }
})
