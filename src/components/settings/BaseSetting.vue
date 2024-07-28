<template>
<q-tab-panel name="mails">
  <!-- ANCHOR 基础设置 -->
  <div class="text-h4 q-mb-md">基础设置</div>
  <q-input v-model="simpleSetData.perPageNum" :label="'每页展示图片数目 当前:' + setStore.perPageNum + '/页'">
    <template v-slot:after>
      <q-btn round dense flat icon="mdi-content-save" @click="saveData('perPageNum')"><q-tooltip
          class="bg-purple text-body2" :offset="[10, 10]">
          保存设置
        </q-tooltip></q-btn>
    </template>
  </q-input>
  <q-input spellcheck="false" v-model="simpleSetData.imageFormat" label="支持的格式" style="font-weight:bold;">
    <template v-slot:after>
      <q-btn disable round dense flat icon="mdi-content-save" @click="saveData('imageFormat')"><q-tooltip
          class="bg-purple text-body2" :offset="[10, 10]">
          保存设置
        </q-tooltip></q-btn>
    </template>
  </q-input>
  <q-toggle :label="`自动重排开启状态${setStore.cycleUpdate}`" v-model="setStore.cycleUpdate" />
  <q-icon round dense flat color="primary" name="mdi-help"><q-tooltip class="bg-purple text-body2"
      :offset="[10, 10]">
      自动重排：如果您经常遇到瀑布流排版不正确导致需要手动点击以重新排版的情况，可以开启此选项。
    </q-tooltip></q-icon>
  <q-btn class="float-right" round dense flat icon="mdi-content-save"
    @click="saveData('cycleUpdate')"><q-tooltip class="bg-purple text-body2" :offset="[10, 10]">
      保存设置
    </q-tooltip></q-btn>
  <!-- <div>是否开启图片查看器画廊：<q-toggle disable v-model="simpleSetData.vNavbar" /></div> -->
  <div>
    <br />
    <q-list separator>
      <q-item v-ripple>
        <q-item-section>保存意味着存储，会影响之后使用软件</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>临时使用没有任何副作用，仅会影响本次的体验！</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</q-tab-panel>
</template>

<script setup>
defineProps({
  saveData: any,
})
</script>
