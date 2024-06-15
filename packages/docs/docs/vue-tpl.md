# Vue 组件库标准版

```sh
📁
├─ 📄index.html
├─ 📄env.d.ts
├─ 📄lib.vite.config.ts    # 库构建环境配置。通常不需要动，已经默认美好了。
├─ 📄README.md
├─ 📄package.json
├─ 📄index.md              # 文档首页。
├─ 📄tsconfig.json
├─ 📁docs
│  ├─ 📄api.md             # 文档 API。
│  └─ 📄component.md       # 文档
├─ 📁public                # 资源目录，读取路径 `/xxx.jpg`
├─ 📁.vscode
├─ 📁.vitepress
│  ├─ 📄config.mts         # 文档高级配置。适合灵活定制用户使用。
│  └─ 📁theme
└─ 📁src
   ├─ 📄Demo.ts            # npm run dev 场景使用。可忽略。
   ├─ 📄Demo.vue           # npm run dev 场景使用。可忽略。
   ├─ 📄index.ts           # 库入口
   └─ 📁components
      └─ 📄Input.vue       # 示例组件代码
```

打开文档：

```
$ npm run docs:dev
```

![](/1.webp)

![](/2.webp)
