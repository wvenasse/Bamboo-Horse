<template>
  <div class="alllikes">
    <div class="topbar bg-pink-1 py-2 px-3 d-flex ai-center text-white">
      <div class="d-flex py-3 px-20 w-100">
        <div class="iconfont icon-back text-white" @click="back"></div>
        <strong class="flex-grow-1 text-white pl-2 text-ellipsis">
          <div class="pr-6">收藏的视频</div>
        </strong>
      </div>
    </div>

    <ul
      class="infinite-list likecard pl-1 pr-1 bg-white mb-3"
      v-infinite-scroll="load"
      style="overflow:auto"
    >
      <li  v-for="(item, i) in Cats.vlikes" :key="i" class="d-flex">
        <router-link tag="div" :to="'/videos/'+item.video._id" class="py-2 fs-lg d-flex likear">
          <span class="px-2">{{i+1}}|</span>
          <span class="text-dark-1 text-ellipsis pr-2 art">{{item.video.name}}</span>
        </router-link>
        <el-button
          @click="deleteLikes(item.video.name)"
          class="likedelete"
          type="danger"
          icon="el-icon-delete"
          circle
        ></el-button>
        <div class="dashed2"></div>
      </li>
    </ul>

    <div class="footer">
      <bottombar :rurl="this.$route.path" />
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
// import TopBar from "../components/TopBar.vue";
import Bottombar from "../components/Bottombar.vue";

export default {
  name: "home",
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  components: {
    // TopBar,
    Bottombar
  },
  data() {
    return {
      videosCats: [],
      Cats:[]
    };
  },
  methods: {
    async deleteLikes(name) {
      console.log(name);
      for (let i in this.Cats.vlikes) {
        if (this.Cats.vlikes[i].video.name === name) {
          this.Cats.vlikes.splice(i, 1);
        }
      }

      await this.$http.put(
        "adminusers/" + this.Cats._id,
        this.Cats
      );
    },
    back() {
      this.$router.go(-1); //返回上一层
    },
    async fetchVideosCats() {
      var data1 = localStorage.getItem("user");
      var data2 = JSON.parse(data1);
      const res = await this.$http.get("likes/" + data2.username);
      this.Cats = res.data;
    }
  },
  created() {
    this.fetchVideosCats();
  },
  computed: {},
  mounted() {}
};
</script>
<style lang="scss" >
@import "../assets/iconfont/iconfont.css";
@import "../assets/scss/_variables.scss";
.footer {
  position: sticky;
  bottom: 0;
  z-index: 999;
  // margin-top: 700px;
}

.card {
  border-bottom: 1px solid $border-color;
  background: rgba(255, 255, 255, 0.5);
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>

