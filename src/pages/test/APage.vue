<template>
  <q-btn @click="querydb">QueryDB</q-btn>
  <q-btn @click="cc">iniDB</q-btn>
</template>

<script setup lang="ts">
function cc() {
  window.storeAPI.ini()
}
async function querydb() {
  // console.log(await window.storeAPI.get('itemNum'))
  // console.log(await window.storeAPI.set('itemxxxxum', 'hahahahahh'))
  console.log('ddddd')
  console.log(await window.storeAPI.delete('itemxxxxum'))
  // console.log(await window.storeAPI.get('itemxxxxum'))
  if (await window.storeAPI.get('itemxxxxum')) console.log('sss')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // window.storeAPI.get('itemNum').then((res: any) => {
  //   console.log(res)
  // })
}

</script>
