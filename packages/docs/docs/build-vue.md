# Vue 组件库

`npm run build` 进行构建。

默认构架 esm、cjs、.d.ts 产物，并保持原目录结构。`public`中的资源会根据引用关系，自动加入。

```
📁dist
├─ 📁lib
└─ 📁es

```

`package.json` 默认配置：

```json
{
  // ...
  "type": "module",
  "main": "dist/lib/index.js",
  "module": "dist/es/index.js",
  "types": "dist/es/index.d.ts",
  "files": ["dist"]
  // ...
}
```

### 发布

```
$ npm publish
```
