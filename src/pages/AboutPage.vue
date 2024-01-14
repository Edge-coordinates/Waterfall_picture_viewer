<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<template>
  <div class="navbar bg-blue">
    <router-link to="/" class="btn btn-ghost text-xl"><q-icon name="chevron_left" size="2rem"></q-icon>返回</router-link>
  </div>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col md:flex-row">
      <img src="/edge-avatar.jpg" class="max-w-sm rounded-lg shadow-2xl" />
      <div>
        <h1 class="text-5xl font-bold">About Author</h1>
        <p class="text-subtitle2 text-xl">边缘坐标是也！</p>
        <button @click="openLink('https://github.com/Edge-coordinates')" class="btn btn-primary">GitHub</button>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
// import { shell } from 'electron'
// import * as fs from 'fs'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function openLink(link: string) {
  window.myToolAPI.openLink(link)
}
</script>
