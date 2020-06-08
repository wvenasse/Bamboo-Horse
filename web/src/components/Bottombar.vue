<template>
  <div class="bottombar bg-pink-2 pt-3 pb-2">
    <div class="nav nav-inverse pb-1 jc-around">
      <div class="nav-item" :class="fetch1(rurl)">
        <router-link class="nav-link" to="/" tag="div">首页</router-link>
      </div>
      <div class="nav-item" :class="fetch4(rurl)">
        <router-link class="nav-link" to="/videoes" tag="div">视频</router-link>
      </div>
       <div class="nav-item" :class="fetch5(rurl)">
        <router-link class="nav-link" to="/hots" tag="div">热门</router-link>
      </div>
      <div class="nav-item" :class="fetch2(rurl)">
        <router-link class="nav-link" to="/category" tag="div">分类</router-link>
      </div>
      <div class="nav-item" :class="fetch3(rurl)">
        <router-link class="nav-link" to="/owner" tag="div">个人</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Bottombar",
  data() {
    return {
      isAction1: "",
      isAction2: "",
      isAction3: ""
    };
  },
  props: {
    rurl: {
      type: String,
      required: true
    }
  },
  methods: {
    fetch1(rurl) {
      if (rurl === "/") return "active";
    },
    fetch2(rurl) {
      if (rurl === "/category") return "active";
    },
    fetch3(rurl) {
      if (rurl === "/owner") return "active";
    },
    fetch4(rurl) {
      if (rurl === "/videoes") return "active";
    },
    fetch5(rurl) {
      if (rurl === "/hots") return "active";
    },
  }
};
</script>

<style lang="scss" >
.bottombar {
  position: sticky;
  bottom: 0;
  z-index: 999;
}
</style>