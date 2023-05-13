<template>
  <div id="photosphere" class="photosphere"></div>
</template>
  <script>
import { Viewer } from 'photo-sphere-viewer'
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'

export default {
  components: {},
  data() {
    return {
      panoramadata: null,
      img: require("../assets/img/qj.jpg"),
      // photosphere: 'photosphere'
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.panoramadata = new Viewer({
        container: document.getElementById("photosphere"),
        panorama: this.img,
        size: {
          width: "100%",
          height: "100%",
        },
      });
    },
  },
};
</script>

<style scoped>
.photosphere {
  width: 100%;
  height: 100%;
}
</style>