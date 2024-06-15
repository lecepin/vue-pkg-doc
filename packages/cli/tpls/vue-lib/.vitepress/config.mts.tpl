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
  title: '{{{ pkgName }}}',
  description: '...',
  lang: 'zh',
  themeConfig: {
    nav: [{ text: '组件文档', link: '/docs/component.md' }],
    logo: '/logo.png',
    sidebar: {},

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
    }
  },
  vite: {
    plugins: [vueJsx(), viteDemoPreviewPlugin()],
    resolve: {
      alias: {
        [pkg.name]: resolve(__dirname, '../src/index.ts')
      }
    },
    optimizeDeps: {
      include: [],
      exclude: []
    },
    esbuild: {}
  }
})
