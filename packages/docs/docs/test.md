# 测试

内置 Vitest。

![](/vitest.svg)

## 编写测试

例如，我们将编写一个简单的测试来验证将两个数字相加的函数的输出。

```js
// sum.js
export function sum(a, b) {
  return a + b
}
```

```js
// sum.test.js
import { expect, test } from 'vitest'
import { sum } from './sum'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
```

::: tip
一般情况下，执行测试的文件名中必须包含 ".test." 或 ".spec." 。
:::

接下来，为了执行测试，请将以下部分添加到你的 `package.json` 文件中：

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

最后，运行 `npm run test`、`yarn test` 或 `pnpm test`，具体取决于你的包管理器，Vitest 将打印此消息：

```txt
✓ sum.test.js (1)
  ✓ adds 1 + 2 to equal 3

Test Files  1 passed (1)
    Tests  1 passed (1)
  Start at  02:15:44
  Duration  311ms
```

了解更多关于 Vitest 的使用，请参考 [API 索引](https://cn.vitest.dev/api/) 部分。

## 配置 Vitest

Vitest 的主要优势之一是它与 Vite 的统一配置。如果存在，`vitest` 将读取你的根目录 `vite.config.ts` 以匹配插件并设置为你的 Vite 应用。例如，你的 Vite 有 [resolve.alias](https://cn.vitejs.dev/config/#resolve-alias) 和 [plugins](https://cn.vitejs.dev/guide/using-plugins.html) 的配置将会在 Vitest 中开箱即用。如果你想在测试期间想要不同的配置，你可以:

- 创建 `vitest.config.ts`，优先级将会最高。
- 将 `--config` 选项传递给 CLI，例如 `vitest --config ./path/to/vitest.config.ts`。
- 在 `defineConfig` 上使用 `process.env.VITEST` 或 `mode` 属性（如果没有被覆盖，将设置为 `test`）有条件地在 `vite.config.ts` 中应用不同的配置。

Vitest 支持与 Vite 相同的配置文件扩展名：`.js`、`.mjs`、`.cjs`、`.ts`、`.cts`、`.mts`。 Vitest 不支持 `.json` 扩展名。

如果你不使用 Vite 作为构建工具，你可以使用配置文件中的 `test` 属性来配置 Vitest：

```ts twoslash
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // ...
  }
})
```

::: tip
即使你自己不使用 Vite，Vitest 的转换管道也严重依赖它。因此，你还可以配置[Vite 文档](https://cn.vitejs.dev/config/)中描述的任何属性。
:::

如果你已经在使用 Vite，请在 Vite 配置中添加 `test` 属性。你还需要使用 [三斜杠指令](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#-reference-types-) 在你的配置文件的顶部引用。

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    // ...
  }
})
```

::: warning
如果你决定为 Vite 和 Vitest 使用两个单独的配置文件，请确保在 Vitest 配置文件中定义相同的 Vite 选项，因为它将覆盖你的 Vite 文件，而不是扩展它。你还可以使用 `vite` 或`vitest/config` 条目中的 `mergeConfig` 方法将 Vite 配置与 Vitest 配置合并：

:::code-group

```ts [vitest.config.mjs]
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.mjs'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // ...
    }
  })
)
```

```ts [vite.config.mjs]
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [Vue()]
})
```

但我们建议 Vite 和 Vitest 使用相同的文件，而不是创建两个单独的文件。
:::

## 支持工作空间

使用 Vitest Workspaces 在同一项目中运行不同的项目配置。你可以在`vitest.workspace`文件中定义工作区的文件和文件夹列表。该文件支持 `js` / `ts` / `json` 扩展名。此功能非常适合配合 monorepo 使用。

```ts twoslash
import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  // 你可以用一个 glob 模式列表来定义你的工作空间
  // Vitest 希望一系列配置文件
  // 或者包含一个配置文件的目录
  'packages/*',
  'tests/*/vitest.config.{e2e,unit}.ts',
  // 你甚至可以在同一个 "vitest" 进程中以不同的配置
  // 运行相同的测试
  {
    test: {
      name: 'happy-dom',
      root: './shared_tests',
      environment: 'happy-dom',
      setupFiles: ['./setup.happy-dom.ts']
    }
  },
  {
    test: {
      name: 'node',
      root: './shared_tests',
      environment: 'node',
      setupFiles: ['./setup.node.ts']
    }
  }
])
```

## 命令行

在安装了 Vitest 的项目中，你可以在 npm 脚本中使用 `vitest` 脚本，或者直接使用 `npx vitest` 运行它。 以下是脚手架 Vitest 项目中的默认 npm 脚本：

<!-- prettier-ignore -->
```json
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
```

要在不监视文件更改的情况下运行一次测试，请使用 `vitest run`。
你还可以指定其他 CLI 选项，例如 `--port` 或 `--https`。 有关 CLI 选项的完整列表，可以在你的项目中运行 `npx vitest --help`。
