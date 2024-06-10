---
layout: home

hero:
  name: '{{ pkgName }}'
  text: 'Vue 库&文档解决方案'
  image:
    src: /logo.min.png
  actions:
    - theme: brand
      text: 快速开始
      link: /docs/component

features:
  - title: 更易用
    details: 开箱即用，案例丰富
  - title: 更高效
    details: 傻瓜写法，超高性能
  - title: 更专业
    details: 完备，灵活，优雅
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(-120deg, #41b883 30%, #ff213c);
 
  --vp-home-hero-image-background-image: linear-gradient(45deg, red , green 50%);
  --vp-home-hero-image-filter: blur(44px);

  --vp-c-brand-1: var(--vp-c-green-1);
  --vp-c-brand-2: var(--vp-c-green-2);
  --vp-c-brand-3: var(--vp-c-green-3);
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
</style>
