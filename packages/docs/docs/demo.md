# 写组件 Demo

已对 markdown 进行扩展，可直接在 markdown 中写可运行的代码 Demo。

Demo 代码中可以直接对库名进行导入，内部会自行处理别名。

并进行样式隔离，避免文档站与组件样式污染。

### 内联使用（推荐）

````md
:::demo

```vue
<script setup lang="ts">
// 不用发布 pkg1 就可以直接引用
import { Input } from 'pkg1'
import { ref } from 'vue'

const refInput = ref(null)
</script>

<template>
  <div class="demo">
    <Input placeholder="请输入…" ref="refInput"> </Input>
    <button @click="refInput.focus()">聚焦</button>
  </div>
</template>

<style scoped>
.demo {
  display: flex;
  gap: 10px;
}
</style>
```

:::
````

效果：

:::demo

```vue
<script setup lang="ts">
// 不用发布 pkg1 直接引用
import { Input } from 'pkg1'
import { ref } from 'vue'

const refInput = ref(null)
</script>

<template>
  <div class="demo">
    <Input placeholder="请输入…" ref="refInput"> </Input>
    <button @click="refInput.focus()">聚焦</button>
  </div>
</template>

<style scoped>
.demo {
  display: flex;
  gap: 10px;
}
</style>
```

:::

### 外联使用（不推荐）

可以直接引用写好的 `.vue` 等文件。

由于增加了用户的使用链路，还需要创建文件，所以更推荐内联的这种简单方法。

```md
:::demo src=../src/Demo.vue
:::
```

效果：

:::demo src=../src/Demo.vue
:::
