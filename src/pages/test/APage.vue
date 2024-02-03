<template>
  <n-dynamic-input v-model:value="value" preset="pair" key-placeholder="环境变量名" value-placeholder="环境变量值" />
  <pre>{{ JSON.stringify(value, null, 2) }}</pre>
</template>

<script setup lang="ts">
import { NDynamicInput } from 'naive-ui'
import { ref } from 'vue'

let value = ref([
  {
    maxSize: '',
    value: ''
  }
])
</script>
