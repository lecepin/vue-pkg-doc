<script setup lang="ts">
import { Button, Card } from 'my-vue-lib'
</script>

<template>
  <div class="demo">
    <Button></Button>
    <Button text="Primary"></Button>

    <Card>card</Card>
  </div>
</template>

<style scoped>
.demo {
  padding: 1em;
  display: flex;
  gap: 10px;
}
</style>
