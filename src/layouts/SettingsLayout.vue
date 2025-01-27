<!-- eslint-disable quotes -->
<template>
  <q-dialog v-model="setStore.isOpen">
    <q-card class="!max-w-none w-5/6 h-4/5">
      <q-toolbar>
        <q-avatar>
          <q-icon name="mdi-cogs" color="blue" size="2em" />
        </q-avatar>

        <q-toolbar-title><span class="text-weight-bold">设置</span> Setting</q-toolbar-title>

        <q-btn flat round dense icon="mdi-close" v-close-popup />
      </q-toolbar>

      <div>
        <q-splitter v-model="splitterModel">

          <template v-slot:before>
            <q-tabs v-model="tab" vertical class="text-blue">
              <q-tab name="mails" label="基础设置" />
              <q-tab name="alarms" label="查看器设置" />
              <q-tab name="movies" label="高级" />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up">
              <q-tab-panel name="mails">
                <!-- ANCHOR 基础设置 -->
                <div class="text-h4 q-mb-md">基础设置</div>
                <!-- language choose -->
                <LanguageChoose :save-data="saveData"></LanguageChoose>
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

              <q-tab-panel name="alarms">
                <div class="text-h4 q-mb-md">查看器设置</div>
                <!-- Viewer Selection -->
                <viewer-selection :save-data="saveData"></viewer-selection>
                <h3 class="text-xl font-semibold">瀑布流设置</h3>
                <n-dynamic-input v-model:value="WBValue" preset="pair" key-placeholder="环境变量名"
                  value-placeholder="环境变量值" />
                <q-btn class="float-right" round dense flat icon="mdi-content-save"
                  @click="saveData('WBreakpoint')"><q-tooltip class="bg-purple text-body2" :offset="[10, 10]">
                    保存设置
                  </q-tooltip></q-btn>
                <div>
                  <br />
                  键值对设置 瀑布流断点：e.g. <b>1200 4</b> 代表宽度大于 1200 之后每行显示四张图片~<br />
                  但是众所周知，软件是不会显示具体宽度的，所以你们量子调整一下就好。
                </div>
                <!-- <pre>{{ JSON.stringify(WBValue, null, 2) }}</pre> -->
              </q-tab-panel>

              <q-tab-panel name="movies">
                <div class="text-h4 q-mb-md">高级</div>
                <p>
                  高级就是，什么都没有。。。。
                </p>
                <p>最动人是秋林映着落日。那酡红如醉，衬托着天边加深的暮色。晚风带着清澈的凉意，随着暮色浸染，那是一种十分艳丽的凄楚之美，让你想流几行感怀身世之泪，却又被那逐渐淡去的醉红所慑住，而情愿把奔放的情感凝结。</p>
                <p>
                  这上面的夜的天空，奇怪而高，我生平没有见过这样奇怪而高的天空。他仿佛要离开人间而去，使人们仰面不再看见。然而现在却非常之蓝，闪闪地眨着几十个星星的眼，冷眼。他的口角上现出微笑，似乎自以为大有深意，而将繁霜洒在我的园里的野花草上。
                </p>
                <q-input bottom-slots v-model="text" label="Label" counter maxlength="12" :dense="dense">
                  <template v-slot:before>
                    <q-avatar>
                      <img src="https://cdn.quasar.dev/img/avatar5.jpg">
                    </q-avatar>
                  </template>

                  <template v-slot:append>
                    <q-icon v-if="text !== ''" name="mdi-close" @click="text = ''" class="cursor-pointer" />
                    <!-- <q-icon name="mdi-schedule" /> -->
                  </template>

                  <template v-slot:hint>
                    Field hint
                  </template>

                  <template v-slot:after>
                    <q-btn disable round dense flat icon="mdi-send" />
                  </template>
                </q-input>

                <q-input bottom-slots v-model="text" label="Label">
                  <template v-slot:after>
                    <q-btn disable round dense flat icon="mdi-send" />
                  </template>
                </q-input>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </div>
      <q-card-actions align="right">
        <q-btn flat label="临时使用" @click="updateStore" color="primary" v-close-popup />
        <!-- <q-btn flat label="保存" disable @click="saveData" color="primary" v-close-popup /> -->
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

let text, dense
import { ref, reactive, onMounted } from 'vue'
import { NDynamicInput } from 'naive-ui'

import { useSettingStore } from 'stores/viewerSet-store';
const setStore = useSettingStore()

import ViewerSelection from 'components/settings/ViewerSelection.vue';
import LanguageChoose from 'src/components/settings/LanguageChoose.vue';

const simpleSetData = reactive({
  perPageNum: null,
  imageFormat: setStore.imageFormat.join(', '),
  vNavbar: Boolean(setStore.vNavbar),
})

const tab = ref('mails')
const splitterModel = ref(20) // 这啥啊？
const WBValue: any = ref(WB2WBV(setStore.waterfallBreakpoint))

function WB2WBV(fValue: any) {
  let resultArray: any = Object.entries(fValue)
  resultArray = resultArray.map(([key, { rowPerView }]) => ({ key: parseInt(key), value: rowPerView }));
  return resultArray
}

function WBV2WB(fValue: any) {
  // let resultArray: any = Object.entries(fValue)
  let resultArray = fValue.reduce((acc, { key, value }) => {
    acc[key] = { rowPerView: value };
    return acc;
  }, {});
  return resultArray
}

function checked(a, b) {
  if (a) return a
  else return b
}

function updateStore() {
  if (simpleSetData.perPageNum) setStore.perPageNum = <any>simpleSetData.perPageNum
  setStore.imageFormat = <any>simpleSetData.imageFormat.replace(/\s/g, '').split(',');
  setStore.vNavbar = Number(simpleSetData.vNavbar)
  setStore.waterfallBreakpoint = WBV2WB(WBValue.value)
  console.log(simpleSetData)
  console.log(setStore.vNavbar)
  // console.log(WBV2WB(WBValue.value))
}

// ANCHOR Save Data
import { useQuasar } from 'quasar'
const $q = useQuasar()
function saveData(id) {
  console.log('saved!', id)
  switch (id) {
    case 'perPageNum':
      setStore.perPageNum = checked(<any>simpleSetData.perPageNum, setStore.perPageNum)
      window.storeAPI.set('itemNum', setStore.perPageNum)
      break;
    case 'WBreakpoint':
      setStore.waterfallBreakpoint = WBV2WB(WBValue.value)
      window.storeAPI.set('WBreakpoint', JSON.parse(JSON.stringify(setStore.waterfallBreakpoint)))
      break
    case 'cycleUpdate':
      window.storeAPI.set('cycleUpdate', setStore.cycleUpdate)
      break
    case 'viewerName':
      window.storeAPI.set('viewerName', setStore.viewerName)
      break
    case 'language':
      window.storeAPI.set('language', setStore.language.value)
      break
  }
  $q.notify({ color: 'teal', message: t('saveSuccess'), icon: 'tag_faces', position: 'top-right'})
}

onMounted(() => {
  // document.getElementById('inputFormat')!.style.fontWeight = 'bolder' // 输入框加粗 无效
})

// const props = defineProps({
// })
</script>

<!-- <style>
input {
  font-weight: bold;
}
</style> -->
