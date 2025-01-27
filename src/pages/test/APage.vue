<template>

  <UploadComponent class="w-11/12 mr-auto ml-auto my-8"/>

</template>

<script setup lang="ts">
import UploadComponent from 'components/UploadComponent.vue';
import { ref } from 'vue'

let value = ref([
  {
    maxSize: '',
    value: ''
  }
])
</script>
