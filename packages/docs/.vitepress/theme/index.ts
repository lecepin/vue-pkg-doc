import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import DemoPreview, { useComponents } from 'vitepress-code-demo-container'
import 'cn-fontsource-lxgw-wen-kai-gb-screen-r/font.css'
import 'vitepress-code-demo-container/dist/style.css'

import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    useComponents(ctx.app, DemoPreview)
  }
} satisfies Theme
