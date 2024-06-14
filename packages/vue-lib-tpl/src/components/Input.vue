<template>
  <div :class="rawAttrs.class">
    <div class="input-wrap">
      <span v-if="$slots.prefix" class="prefix">
        <slot name="prefix" />
      </span>

      <input
        ref="input"
        :class="['input', { 'input-disabled': disabled }]"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="handleInput"
        @keydown="handleKeydown"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
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

import { nextTick, shallowRef, useAttrs } from 'vue'

defineOptions({
  name: 'ElInput',
  inheritAttrs: false
})

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  disabled: false,
  placeholder: ''
})
const emit = defineEmits<Emits>()
const rawAttrs = useAttrs()
const input = shallowRef<HTMLInputElement>()

const handleInput = async (event: Event) => {
  let { value } = event.target as HTMLInputElement

  emit('update:modelValue', value)
  emit('input', value)

  await nextTick()
  input.value!.value = value
}

const focus = async () => {
  await nextTick()
  input.value?.focus()
}

const handleKeydown = (evt: KeyboardEvent) => {
  emit('keydown', evt)
}

defineExpose({
  ref: input.value,
  focus
})
</script>

<style scoped>
.input-wrap {
  display: flex;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.65);
}
.input {
  position: relative;
  display: inline-block;
  padding: 4px 7px;
  width: 100%;
  height: 28px;
  line-height: 1.5;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  transition: all 0.3s;
}
.input-disabled {
  cursor: not-allowed;
  background-color: #f5f5f5;
}
.prefix {
  display: flex;
  align-items: center;
  padding: 0 11px;
  text-align: center;
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
  transition: all 0.3s;
  border-right: 0;
}
</style>
