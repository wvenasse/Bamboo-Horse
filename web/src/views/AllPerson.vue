<template>
  <div class="allarticles">
    <div class="topbar bg-pink-1 py-2 px-3 d-flex ai-center text-white">
      <div class="d-flex py-3 px-20 w-100">
        <div class="iconfont icon-back text-white" @click="back"></div>
        <strong class="flex-grow-1 text-white pl-2 text-ellipsis">
          <div class="pr-6">所有人物</div>
        </strong>
      </div>
    </div>

    <div>
      <div class="card pl-1 pr-1 bg-white mb-3">
        <div class="pt-3">
          <div class="swiper-slide" v-for="(category, i) in personsCats" :key="i">
            <div class="d-flex flex-warp" style="margin: 0 -0.5rem;">
              <router-link
                tag="div"
                :to="'/persons/'+person._id"
                class="p-2 text-center"
                style="width:20%;"
                v-for="(person,i) in category.personList"
                :key="i"
              >
                <img :src="person.avatar" class="w-100" />
                <div>{{person.name}}</div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

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
      personsCats: []
    };
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    async fetchPersonsCats() {
      const res = await this.$http.get("allpersons/list");
      this.personsCats = res.data;
    }
  },
  created() {
    this.fetchPersonsCats();
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

