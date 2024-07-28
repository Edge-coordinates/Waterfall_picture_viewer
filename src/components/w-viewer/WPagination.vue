<template>
<q-page-sticky position="bottom-left" :offset="[18, 18]">
  <!-- 样式调整！！！！ -->
  <div class="q-pa-lg rounded-full bg-blue-300 bg-opacity-70">
    <q-pagination v-model="page" color="black" :max="pageNum" :max-pages="8" boundary-numbers></q-pagination>
    <div class="row inline">
      <n-input-number v-model:value="inputPageValue" clearable /> <q-btn @click="handleChangePage" color="black"
        label="Go" /> <q-btn @click="handleLoadMore()" color="black" icon="mdi-autorenew" />
    </div>
  </div>
</q-page-sticky>
</template>
