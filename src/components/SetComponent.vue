<!-- eslint-disable quotes -->
<template>
  <q-dialog v-model="setStore.isOpen">
    <q-card class="!max-w-none w-4/5 h-4/5">
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
                <p>暂时没有！</p>
                <p>
                  早晨起来，泡一碗浓茶，向院子一坐，你也能看得到很高很高的碧绿的天色，听得到青天下驯鸽的飞声。从槐树叶底，朝东细数着一丝一丝漏下来的日光，或在破壁腰中，静对着像喇叭似的牵牛花（朝荣）的蓝朵，自然而然地也能够感觉到十分的秋意。
                </p>
                <p>
                  入秋以后，蜻蜓变弱了，肉体死后，只剩灵魂，摇摇晃晃飞来飞去。透过秋日的阳光，能看到蜻蜓的身体是透明的。
                </p>
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
                    <q-btn round dense flat icon="mdi-send" />
                  </template>
                </q-input>

                <q-input bottom-slots v-model="text" label="Label">
                  <template v-slot:after>
                    <q-btn round dense flat icon="mdi-send" />
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
let text, dense
import { ref, reactive, onMounted } from 'vue'

import { useSettingStore } from 'stores/viewerSet-store';
const setStore = useSettingStore()

const simpleSetData = reactive({
  perPageNum: null,
  imageFormat: setStore.imageFormat.join(', '),
  vNavbar: Boolean(setStore.vNavbar),
})

const tab = ref('mails')
const splitterModel = ref(20) // 这啥啊？

function checked(a, b) {
  if (a) return a
  else return b
}

function updateStore() {
  if (simpleSetData.perPageNum) setStore.perPageNum = <any>simpleSetData.perPageNum
  setStore.imageFormat = <any>simpleSetData.imageFormat.replace(/\s/g, '').split(',');
  setStore.vNavbar = Number(simpleSetData.vNavbar)
  console.log(simpleSetData)
  console.log(setStore.vNavbar)
}

function saveData(id) {
  console.log('saved!', id)
  switch (id) {
    case 'perPageNum':
      setStore.perPageNum = checked(<any>simpleSetData.perPageNum, setStore.perPageNum)
      window.storeAPI.set('itemNum', setStore.perPageNum)
      break;
  }
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
