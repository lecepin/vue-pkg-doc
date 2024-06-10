<script setup lang="ts">
import {} from 'vue'

export type Props = {
  text?: string
}
const props = withDefaults(defineProps<Props>(), {
  text: 'hello'
})

const emit = defineEmits<{
  (e: 'change', id: number): void
}>()
</script>

<template>
  <button class="button">{{ props.text }}</button>
</template>

<style scoped lang="stylus">
.button
  border: 1px solid #ccc
  padding: 10px 20px
</style>
