---
navbar: false
---

# Input

Input 示例。

### 内联用法

使用 `xxx`、`yyy` 和 `zzz` 来定义样式。

:::demo

```vue
<script setup lang="ts">
import { Input } from '{{ pkgName }}'
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

<!--@include: ./api.md-->
