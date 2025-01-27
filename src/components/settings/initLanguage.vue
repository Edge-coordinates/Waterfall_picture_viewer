<template>
  <q-dialog v-model="lanConfirm" persistent>
    <q-card>
      <q-card-section class="items-center">
        <div class="text-h6">
            Please choose your preferred language: <br/>
            请选择您偏好的语言：
        </div>
        <q-option-group :options="setStore.languages" type="radio" v-model="tlanguage" class="text-lg" />
      </q-card-section>
      <q-card-actions align="right">
          <q-btn flat label="CONFIRM" color="primary" v-on:click="saveData"/>
        </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue';
let lanConfirm = ref(false);
let tlanguage = ref('en-US');
import { useSettingStore } from 'stores/viewerSet-store';
const setStore = useSettingStore();

import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();

if (!setStore.language.value) {
  lanConfirm.value = true;
} else {
  locale.value = setStore.language.value;
}

function saveData() {  
  locale.value = tlanguage.value;
  window.storeAPI.set('language', tlanguage.value);
  setStore.language.value = tlanguage.value;
  setStore.language.label = setStore.languages.find((item) => item.value === tlanguage.value).label;
  lanConfirm.value = false;
}

</script>
