<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col md:flex-row">
      <img src="/edge-avatar.jpg" class="max-w-sm rounded-lg shadow-2xl" />
      <div>
        <h1 class="text-5xl font-bold">Box Office News!</h1>
        <p class="text-subtitle2 text-xl">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
          exercitationem quasi.
          In deleniti eaque aut repudiandae et a id nisi.</p>
        <button href="https://github.com/Edge-coordinates" @click="openLink" class="btn btn-primary">GitHub</button>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
// import { shell } from 'electron'
import * as fs from 'fs'
function openLink(e: any) {
  // var href = e.getAttribute('href')
  // shell.openExternal(href)
  // console.log(href)
  console.log(fs)
  fs.readFile('E:\Edge\Learning\Learning_Vue\quasar-project-02\node_modules\tslib\LICENSE.txt', 'utf-8', (err, data) => {
    console.log(data)
  })
}
</script>
