<template>
  <h3 class="text-xl font-semibold">查看器选择</h3>
  <div class="q-pa-md">
    <q-list>
      <!--
          Rendering a <label> tag (notice tag="label")
          so QRadios will respond to clicks on QItems to
          change Toggle state.
        -->

      <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio v-model="viewerName" val="photoswipe" color="teal" />
        </q-item-section>
        <q-item-section>
          <q-item-label>photoswipe</q-item-label>
          <q-item-label caption>Default, Full Functions!</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio v-model="viewerName" val="biggerpicture" color="orange" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Biggerpicture</q-item-label>
          <q-item-label caption>Better Performance </q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section avatar top>
          <q-radio v-model="viewerName" val="viewerjs" color="cyan" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Viewerjs</q-item-label>
          <q-item-label caption
            >{{ $t('unOpen') }}</q-item-label
          >
        </q-item-section> 
      </q-item>
    </q-list>

    <div class="q-px-sm q-mt-sm">
      Your selection is: <strong>{{ viewerName }}</strong>
      <q-btn
        class="float-right"
        round
        dense
        flat
        icon="mdi-content-save"
        @click="saveData('viewerName')"
        ><q-tooltip class="bg-purple text-body2" :offset="[10, 10]">
          保存设置
        </q-tooltip></q-btn
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSettingStore } from 'stores/viewerSet-store';
const setStore = useSettingStore();

import { storeToRefs } from 'pinia';
const { viewerName } = storeToRefs(setStore);


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
