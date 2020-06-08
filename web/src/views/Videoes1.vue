<template>
  <div id="app" class="container">
    <!-- topbar -->
    <div class="topbar header d-flex">
      <top-bar />
    </div>
    <div class="border-bottom"></div>
    <div class="border-bottom"></div>
    <div class="border-bottom"></div>

    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../images/p1.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../images/p2.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../images/p3.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../images/p4.jpg" alt />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>

    <div class="videoes">
      <m-list-card
        class="mlc"
        icon="video"
        title="精彩视频"
        moremenu="/allvideo"
        :categories="videosCats"
      >
        <template #items="{category}">
          <div class="d-flex flex-warp mlcd" style="margin: 0 -0.5rem;">
            <router-link
              tag="div"
              :to="'/videos/'+video._id"
              class="p-2 text-center"
              v-for="(video,i) in category.videoList"
              :key="i"
            >
              <video :src="video.vision" class="w-100"></video>
              <div>{{video.name}}</div>
            </router-link>
          </div>
        </template>
      </m-list-card>
    </div>
    <!-- bottombar -->
    <div class="footer">
      <bottombar :rurl="this.$route.path" />
    </div>
  </div>
</template>

<script>
import "../assets/scss/_variables.scss";
import TopBar from "../components/TopBar.vue";
import Bottombar from "../components/Bottombar.vue";

export default {
  name: "Category",
  data() {
    return {
      currentDate: new Date(),
      videosCats: [],
      swiperOption: {
        notNextTick: true,
        autoplay: true,
        speed: 1000,
        setWrapperSize: true,
        autoHeight: true,
        pagination: ".swiper-pagination",
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        debugger: true,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        pagination: {
          el: ".pagination-home",
          clickable: true
        }
      }
    };
  },
  components: {
    Bottombar,
    TopBar
  },
  methods: {
    async fetchVideosCats() {
      const res = await this.$http.get("videos/list");
      this.videosCats = res.data;
    }
  },
  created() {
    this.fetchVideosCats();
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}

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

.videoes {
  height: 100%;
}

.mlc {
  height: 100%;
}

.mlcd {
  height: 100%;
}

.cardv {
  color: #ffb6c1;
  font-size: 20px;
  font-family: "Courier New", Courier, monospace;
  font-weight: 900;
}

.vvv {
  height: 100%;
}
</style>