---
layout: home

hero:
  name: 'VUE-PKG'
  text: 'Vue 库&文档解决方案'
  tagline: '为 Vue 组件研发而生的静态站点解决工具'
  image:
    src: /logo.min.png
  actions:
    - theme: brand
      text: 开始
      link: /docs/main

features:
  - title: 🚀 更好的编译性能
    details: 内置 Vite，结合 esbuild、rollup 构建
  - title: 🔍 内置全文搜索
    details: 内置 MiniSearch 和 Algolia 搜索
  - title: 📃 灵活的文档能力
    details: 结合 Vitepress，让文档更易写。内置 demo 插件，让 demo code 轻易运行在 markdown 中
  - title: 🅾️ 零配置
    details: 无需任何配置，只需专注组件逻辑生产
  - title: 🎨 多样式支持
    details: 支持 less、scss、stylus
  - title: 🧪 测试能力
    details: 内置 Vitest 测试能力，单元测试、E2E测试等完美支持
---

<Home />

<script setup>
  import Home from './src/Home.vue'
</script>

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(-120deg, #41b883 30%, #ff213c);
 
  --vp-home-hero-image-background-image: linear-gradient(45deg, red , green 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}

@keyframes blurAnimation {
  0% {
    filter: blur(50px);
  }
  50% {
    filter: blur(75px);
  }
  100% {
    filter: blur(50px);
  }
}

.image-bg{
  animation: blurAnimation 4s infinite;
}
</style>
