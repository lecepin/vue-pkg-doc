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
