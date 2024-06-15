# API 模板

早期是希望自动识别的方式来生成 API 的，让用户写文档更简单。

但在实施的过程中发现两个问题：

1. Vue 这种非 JS 的文件，有多种声明类型，如 Props、Emit、Slot、Expose。相比 React 这种纯 JS 的，识别起来要繁琐得多。
2. 用了很多生成解析工具，像 Styleguidist、ts-morph、TypeDoc 等工具，依然解决不了要用户手动去写的问题，毕竟不是纯 JS。

对比其它 Vue 库的实现，这里还是提供模板的方式来实现吧。

````md
### 属性

| Name                  | Description    | Type      | Default |
| --------------------- | -------------- | --------- | ------- |
| model-value / v-model | 绑定值         | `string`  | `''`    |
| disabled              | 是否禁用       | `boolean` | `false` |
| placeholder           | 输入框占位文本 | `string`  | `''`    |

### 事件

| Name    | Description           | Type                             |
| ------- | --------------------- | -------------------------------- |
| input   | 在 Input 值改变时触发 | `(value: string) => void`        |
| keydown | 在 Input 按键时触发   | `(event: KeyboardEvent) => void` |

### 插槽

| Name   | Description    | Type |
| ------ | -------------- | ---- |
| prefix | 输入框头部内容 | -    |

### 方法

| Method | Description       | Type                                           |
| ------ | ----------------- | ---------------------------------------------- |
| ref    | HTML元素 input    | `Ref<HTMLInputElement \| HTMLTextAreaElement>` |
| focus  | 使 input 获取焦点 | `() => void`                                   |

## Type 声明

```ts
export type Props = {
  modelValue?: string
  disabled?: boolean
  placeholder?: string
}
export type Emits = {
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
  (e: 'keydown', evt: KeyboardEvent | Event): void
}
```
````

## API

### 属性

| Name                  | Description    | Type      | Default |
| --------------------- | -------------- | --------- | ------- |
| model-value / v-model | 绑定值         | `string`  | `''`    |
| disabled              | 是否禁用       | `boolean` | `false` |
| placeholder           | 输入框占位文本 | `string`  | `''`    |

### 事件

| Name    | Description           | Type                             |
| ------- | --------------------- | -------------------------------- |
| input   | 在 Input 值改变时触发 | `(value: string) => void`        |
| keydown | 在 Input 按键时触发   | `(event: KeyboardEvent) => void` |

### 插槽

| Name   | Description    | Type |
| ------ | -------------- | ---- |
| prefix | 输入框头部内容 | -    |

### 方法

| Method | Description       | Type                                           |
| ------ | ----------------- | ---------------------------------------------- |
| ref    | HTML元素 input    | `Ref<HTMLInputElement \| HTMLTextAreaElement>` |
| focus  | 使 input 获取焦点 | `() => void`                                   |

## Type 声明

```ts
export type Props = {
  modelValue?: string
  disabled?: boolean
  placeholder?: string
}
export type Emits = {
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
  (e: 'keydown', evt: KeyboardEvent | Event): void
}
```
