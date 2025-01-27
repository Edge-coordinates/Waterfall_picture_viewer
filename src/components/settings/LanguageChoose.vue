<template>
  <h3 class="text-xl font-semibold">语言选择</h3>
  <q-select v-model="language" :options="options" label="Standard">
    <template v-slot:after>
      <q-btn
        round
        dense
        flat
        icon="mdi-content-save"
        @click="saveData('language')"
        ><q-tooltip class="bg-purple text-body2" :offset="[10, 10]">
          保存设置
        </q-tooltip></q-btn
      >
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useSettingStore } from 'stores/viewerSet-store';
const setStore = useSettingStore();

import { storeToRefs } from 'pinia';
const { language, languages } = storeToRefs(setStore);

// const model = ref(language.value);
const options = languages.value;
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();

watch(language, (newVal, preVal) => {
  console.log('newVal:', newVal);
  locale.value = newVal.value;
});

const props = defineProps({
  saveData: {
    type: Function,
    default() {
      return () => {};
    },
  },
});

function saveData(key: string) {
  props.saveData(key);
}
</script>
