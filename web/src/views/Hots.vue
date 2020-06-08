<template>
  <div id="app" class="container">
    <!-- topbar -->
    <div class="topbar header d-flex">
      <top-bar />
    </div>
    <div class="border-bottom"></div>
    <div class="border-bottom"></div>
    <div class="border-bottom"></div>

    <div class="hots">
      <div class="card p-3 bg-white mt-3">
        <div class="card-header d-flex ai-center border-bottom pb-3">
          <i class="iconfont icon-hot text-black"></i>
          <div class="fs-xl flex-1 px-2">
            <strong class="text-black">热门内容</strong>
          </div>
          <router-link tag="i" to="/hots" class="p-1 text-center">
            <i class="iconfont icon-menu text-black"></i>
            <i class="iconfont icon-menu text-black"></i>
          </router-link>
        </div>
        <div class="card-body pt-3">
          <div class="nav jc-between">
            <div
              class="nav-item"
              :class="{active: active === i}"
              v-for="(hot, i) in hotsCats"
              :key="i"
              @click="$refs.list.$swiper.slideTo(i)"
            >
              <div class="nav-link text-black">{{hot.name}}</div>
            </div>
          </div>
          <div class="pt-3">
            <swiper
              class="swiper"
              ref="list"
              :options="{autoHeight: true}"
              @slide-change="() => active = $refs.list.$swiper.realIndex"
              
            >
              <swiper-slide class="swiper-slide hotswiper" v-for="(hot, i) in hotsCats" :key="i">
                <div v-if="i===0" class="d-flex flex-warp hotswiper1" style="margin: 0 -0.5rem; width:100%">
                  <router-link
                    tag="div"
                    :to="'/articles/'+item._id"
                    class="py-2 fs-lg d-flex"
                    style="width:100%; margin-left:5px"
                    v-for="(item,i) in hot.hotList"
                    :key="i"
                  >
                    <span class="text-info text-pink-2">[{{item.categories[0].name}}]</span>
                    <span class="px-2">|</span>
                    <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{item.title}}</span>
                    <span class="text-grey-1 fs-sm">{{item.createdAt | date}}</span>
                  </router-link>
                </div>

                <div v-else-if="i===1" class="d-flex  flex-warp hotswiper2" style="margin: 1 ">
                  <router-link
                    tag="div"
                    :to="'/persons/'+person._id"
                    class="px-2 text-center "
                    style="width:50%;"
                    v-for="(person,i) in hot.hotList"
                    :key="i"
                  >
                    <img style="width:100%;" :src="person.avatar" class="w-100" />
                    <div class="text-black">{{person.name}}</div>
                  </router-link>
                </div>

                <div v-else-if="i===2" class="d-flex flex-warp px-2" style="margin: 0 -0.5rem;">
                  <router-link
                    tag="div"
                    :to="'/videos/'+video._id"
                    class="p-2 text-center"
                    v-for="(video,i) in hot.hotList"
                    :key="i"
                  >
                    <video :src="video.vision" class="w-100"></video>
                    <div class="text-black">{{video.name}}</div>
                  </router-link>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>

    <!-- bottombar -->
    <div class="footer">
      <bottombar :rurl="this.$route.path" />
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import TopBar from "../components/TopBar.vue";
import Bottombar from "../components/Bottombar.vue";

export default {
  name: "Category",
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  data() {
    return {
      currentDate: new Date(),
      hotsCats: [],
      active: 0
    };
  },
  components: {
    Bottombar,
    TopBar
  },
  methods: {
    async fetchHotsCats() {
      const res = await this.$http.get("hots/list");
      this.hotsCats = res.data;
    }
  },
  created() {
    this.fetchHotsCats();
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
.footer {
  position: sticky;
  bottom: 0;
  z-index: 999;
  
  // margin-top: 700px;
}

.bg {
  background-image: url(../images/p7.jpg);
  height: 220vw;
  background-size: 100% 100%;
}

.content {
  // padding-left: 8rem;
  height: 100%;
  width: 100%;
}

.hots {
  height: 100%;
}

.hotswiper2{
  height: 100%;
}

.card {
  color: #ffb6c1;
  font-size: 20px;
  font-family: "Courier New", Courier, monospace;
  font-weight: 900;
}
</style>