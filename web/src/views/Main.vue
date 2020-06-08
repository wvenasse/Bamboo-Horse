<template>
  <div>
    <div id="app" class="container">
      <div class="content">
        <router-view></router-view>
      </div>
      <div class="footer">
        <bottombar :rurl="this.$route.path" />
      </div>
    </div>
  </div>
</template>

<script>
import Bottombar from "../components/Bottombar.vue";

export default {
  name: "Main",
  components: {
    Bottombar
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.footer {
  position: sticky;
  bottom: 0;
  z-index: 999;
}

.header {
  position: absolute;
}
</style>