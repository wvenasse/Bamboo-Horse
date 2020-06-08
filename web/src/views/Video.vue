<template>
  <div class="page-person" v-if="model">
    <div class="topbar bg-pink-1 py-2 px-3 d-flex ai-center text-white">
      <div class="d-flex py-3 px-20 w-100">
        <div class="iconfont icon-back text-white" @click="back"></div>
        <strong class="flex-grow-1 text-white pl-2 text-ellipsis">
          <div class="pr-6">视频详情</div>
        </strong>
        <div class="text-white fs-xxs pl-3">
          <router-link to="/allvideo" tag="div">更多视频 &gt;&gt;</router-link>
        </div>
      </div>
    </div>

 <div class="addlike" @click="onBtnClicked">
      <!-- <div
        class="ys-float-btn"
        :style="{'width':itemWidth+'px','height':itemHeight+'px','left':left+'px','top':top+'px'}"
        ref="div"
      >
        <i v-show="!isLike" class="iconfont icon-favorite fa1"></i>
        <i v-show="isLike" class="iconfont icon-favorite fa2"></i>
      </div> -->
      <like >
        <i v-show="!isLike" class="iconfont icon-favorite fa1"></i>
        <i v-show="isLike" class="iconfont icon-favorite fa2"></i>
      </like>
    </div>


    <div class="shipin">
      <div class="input_video">
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></video-player>
      </div>
    </div>
    <m-card plain icon="discover" :title="model.name">
      <!-- <div class="border-bottom mb-3"></div> -->
      <div class="d-flex">
        <h3>类别：</h3>
        <div class="fs-lg pt-4 mt-2">[{{model.categories.map(v => v.name).join('/')}}]</div>
      </div>
      <div class="border-bottom "></div>
      <div class="d-flex">
        <h3>描述：</h3>
        <div class="fs-lg pt-4 mt-2">“{{model.description}}”</div>
      </div>
      <div class="border-bottom "></div>
    </m-card>

    <div class="extra ">

    </div>

    <div class="bottom">
      <bottombar />
    </div>
  </div>
</template>

<script>
import Bottombar from "../components/Bottombar.vue";
// import videojs from "video.js";
import Like from '../components/Like.vue';

export default {
  name: "Video",
  components: {
    Bottombar,
    Like
  },
  props: {
    id: { required: true },
    // text: {
    //   type: String,
    //   default: "收藏"
    // },
    // itemWidth: {
    //   type: Number,
    //   default: 60
    // },
    // itemHeight: {
    //   type: Number,
    //   default: 60
    // },
    // gapWidth: {
    //   type: Number,
    //   default: 10
    // },
    // coefficientHeight: {
    //   type: Number,
    //   default: 0.8
    // }
  },
  data() {
    return {
      model: {},
      vurl: null,
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], //可选择的播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: "",
            type: "video/mp4" // 类型
          }
        ],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, //当前时间和持续时间的分隔符
          durationDisplay: true, //显示持续时间
          remainingTimeDisplay: false, //是否显示剩余时间功能
          fullscreenToggle: true //全屏按钮
        }
      },
      // timer: null,
      // currentTop: 0,
      // clientWidth: 0,
      // clientHeight: 0,
      // left: 0,
      // top: 0,
      isLike: false,
      likeCats: {}
    };
  },
  watch: {
    id: 'fetch',
  },
  methods: {
     async onBtnClicked() {
      this.isLike = !this.isLike;
      console.log(this.likeCats);
      if (this.isLike === true) {
        this.likeCats.vlikes.push({ video: this.id });
        // this.$message({
        //   type: "success",
        //   message: "收藏成功"
        // });
      } else {
        for (let i in this.likeCats.vlikes) {
          if (this.likeCats.vlikes[i].video._id === this.id) {
            this.likeCats.vlikes.splice(i, 1);
            //  this.$message({
            //   type: "success",
            //   message: "取消收藏成功"
            // });
          }
        }
      }
      console.log(this.likeCats);
      await this.$http.put("adminusers/" + this.likeCats._id, this.likeCats);
    },
    back(){
        this.$router.go(-1);//返回上一层
    },
    async fetch() {
      const res = await this.$http.get("videos/" + this.id);
      this.model = res.data;
      this.playerOptions.sources[0].src = this.model.vision;
    },
    async fetchLikeCats() {
      var data1 = localStorage.getItem("user");
      var data2 = JSON.parse(data1);
      const res = await this.$http.get("likes/" + data2.username);
      this.likeCats = res.data;
      for (let a of this.likeCats.vlikes) {
        if (a.video._id === this.id) {
          this.isLike = true;
          return;
        }
      }
    },
    // handleScrollStart() {
    //   this.timer && clearTimeout(this.timer);
    //   this.timer = setTimeout(() => {
    //     this.handleScrollEnd();
    //   }, 300);
    //   this.currentTop =
    //     document.documentElement.scrollTop || document.body.scrollTop;
    //   if (this.left > this.clientWidth / 2) {
    //     this.left = this.clientWidth - this.itemWidth / 2;
    //   } else {
    //     this.left = -this.itemWidth / 2;
    //   }
    // },
    // handleScrollEnd() {
    //   let scrollTop =
    //     document.documentElement.scrollTop || document.body.scrollTop;
    //   if (scrollTop === this.currentTop) {
    //     if (this.left > this.clientWidth / 2) {
    //       this.left = this.clientWidth - this.itemWidth - this.gapWidth;
    //     } else {
    //       this.left = this.gapWidth;
    //     }
    //     clearTimeout(this.timer);
    //   }
    // }
  },
  // mounted() {
  //   window.addEventListener("scroll", this.handleScrollStart);
  //   this.$nextTick(() => {
  //     const div = this.$refs.div;
  //     div.addEventListener("touchstart", () => {
  //       div.style.transition = "none";
  //     });
  //     div.addEventListener("touchmove", e => {
  //       if (e.targetTouches.length === 1) {
  //         let touch = event.targetTouches[0];
  //         this.left = touch.clientX - this.itemWidth / 2;
  //         this.top = touch.clientY - this.itemHeight / 2;
  //       }
  //     });
  //     div.addEventListener("touchend", () => {
  //       div.style.transition = "all 0.3s";
  //       if (this.left > this.clientWidth / 2) {
  //         this.left = this.clientWidth - this.itemWidth - this.gapWidth;
  //       } else {
  //         this.left = this.gapWidth;
  //       }
  //     });
  //   });
  // },
  created() {
    this.fetch();
    this.fetchLikeCats();
    // this.clientWidth = document.documentElement.clientWidth;
    // this.clientHeight = document.documentElement.clientHeight;
    // this.left = this.clientWidth - this.itemWidth - this.gapWidth;
    // this.top = this.clientHeight * this.coefficientHeight;
  },
  // beforeDestroy() {
  //   window.removeEventListener("scroll", this.handleScrollStart);
  // }
};
</script>
<style lang="scss" >
@import "../assets/scss/_variables.scss";

.page-person {
  .icon-back {
    font-size: 22px;
  }
}
.bottom {
  position: absolute;
  bottom: 0;
  z-index: 999;
}
.top {
  height: 50vw;
  background: #fff no-repeat top center;
  background-size: 100% 100%;
}
.shipin {
  background: rgba(255, 251, 240, 0.25);
  border-radius: 5px;
  // background-clip: padding-box;
  // padding-top: 100px;
  // padding: 35px 35px 15px 35px;
  border: 3px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.input_video {
  width: 100%;
  height: auto;
  // margin: 0 auto;
  // border-radius: 10%;
}
.extra {
  height: 275px;
}

.fa1 {
    font-size: 60px;
    color: #000;
  }
  .fa2 {
    font-size: 60px;
    color: #ffb6c1;
  }

  // .ys-float-btn {
  //   background: rgb(255, 255, 255, 0);
  //   box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0);
  //   border-radius: 50%;
  //   color: #666666;
  //   z-index: 20;
  //   transition: all 0.3s;
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
  //   position: fixed;
  //   bottom: 20vw;
  // }
</style>

