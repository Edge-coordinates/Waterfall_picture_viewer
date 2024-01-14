<template>
  <div>
    <div class="images" v-viewer="{ movable: false }">
      <img v-for="src in images" :src="src" :key="src">
    </div>
    <button type="button" @click="show">Show</button>
  </div>
</template>
<script>
import 'viewerjs/dist/viewer.css'
import { directive as viewer } from "v-viewer"
export default {
  directives: {
    viewer: viewer({
      debug: true,
    }),
  },
  data() {
    return {
      images: [
        "https://picsum.photos/200/200",
        "https://picsum.photos/300/200",
        "https://picsum.photos/250/200"
      ]
    };
  },
  methods: {
    show() {
      const viewer = this.$el.querySelector('.images').$viewer
      viewer.show()
    }
  }
}
</script>
