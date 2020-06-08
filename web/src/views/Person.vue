<template>
  <div class="page-person" v-if="model">
    <div class="topbar bg-pink-1 py-2 px-3 d-flex ai-center text-white">
      <div class="d-flex py-3 px-20 w-100">
        <div class="iconfont icon-back text-white" @click="back"></div>
        <strong class="flex-grow-1 text-white pl-2 text-ellipsis">
          <div class="pr-6">
            {{model.name}}
            人物简介
          </div>
        </strong>
        <div class="text-white fs-xxs pl-3">
          <router-link :to="'/allperson'" tag="div">更多英雄 &gt;&gt;</router-link>
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

    <div class="top" :style="{'background-image':'url('+model.banner+')'}">
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <div class="fs-sm">{{model.title}}</div>
        <h2 class="my-2">{{model.name}}</h2>
        <div class="fs-sm">{{model.categories.map(v => v.name).join('/')}}</div>
        <div class="d-flex jc-between pt-2">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>original</span>
            <span class="badge bg-pink-1">{{model.scores.difficult}}</span>
            <span>vocal</span>
            <span class="badge bg-pink-1">{{model.scores.skills}}</span>
            <span>dance</span>
            <span class="badge bg-pink-1">{{model.scores.attack}}</span>
            <span>rap</span>
            <span class="badge bg-pink-1">{{model.scores.survive}}</span>
          </div>
          <router-link to="/" tag="span" class="text-white fs-sm">图册：2 &gt;&gt;</router-link>
        </div>
      </div>
    </div>

    <div class="peoplecontent">
      <div class="px-3 bg-white">
        <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
          <div class="nav-item active">
            <div class="nav-link">人物初识</div>
          </div>
          <!-- <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div> -->
        </div>
      </div>
      <swiper>
        <swiper-slide>
          <div>
            <div class="p-3 bg-white border-bottom">
              <div class="d-flex">
                <router-link tag="button" to="/" class="btn btn-lg flex-1">
                  <i class="iconfont icon-menu1"></i>
                  人物介绍视频
                </router-link>
                <router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
                  <i class="iconfont icon-menu1"></i>
                  人物介绍视频
                </router-link>
              </div>

              <!-- skills -->
              <div class="skills bg-white mt-4">
                <div class="d-flex jc-around">
                  <img
                    class="icon"
                    @click="currentSkillIndex = i"
                    :class="{active: currentSkillIndex===i}"
                    :src="item.icon"
                    v-for="(item,i) in model.skills"
                    :key="item.name"
                    style="border-radius: 50%;"
                  />
                </div>
                <div v-if="currentSkill">
                  <div class="d-flex pt-4 pb-3">
                    <h3 class="m-0">{{currentSkill.name}}</h3>
                    <span
                      class="text-grey-1 ml-4"
                    >（时长：{{currentSkill.delay}}/销量：{{currentSkill.cost}}）</span>
                  </div>
                  <p>{{currentSkill.description}}</p>
                  <div class="border-bottom"></div>
                  <p class="text-grey-1">小提示：{{currentSkill.tips}}</p>
                </div>
              </div>
            </div>

            <m-card plain icon="discover" title="作品推荐" class="person-items">
              <div class="fs-xl">综艺节目</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items2" :key="item.name">
                  <img :src="item.icon" class="icon" />
                  <div class="fs-xs">{{item.name}}</div>
                </div>
              </div>
              <div class="border-bottom mt-3"></div>
              <div class="fs-xl mt-3">杂志写真</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items1" :key="item.name">
                  <img :src="item.icon" class="icon" />
                  <div class="fs-xs">{{item.name}}</div>
                </div>
              </div>
            </m-card>
            <m-card plain icon="discover" title="经历">
              <p class="m-0">{{model.usageTips}}</p>
            </m-card>
            <m-card plain icon="discover" title="获奖">
              <p class="m-0">{{model.battleTips}}</p>
            </m-card>
            <m-card plain icon="discover" title="评价">
              <p class="m-0">{{model.teamTips}}</p>
            </m-card>
            <m-card plain icon="discover" title="好友关系">
              <div class="fs-xl">最佳搭档</div>
              <div v-for="item in model.partners" :key="item.name" class="d-flex pt-4">
                <img :src="item.person.avatar" height="50" />
                <p class="flex-1 m-0 ml-3">{{item.description}}</p>
              </div>
              <div class="border-bottom mt-3"></div>
            </m-card>
          </div>
        </swiper-slide>
        <!-- <swiper-slide></swiper-slide> -->
      </swiper>
    </div>

    <div class="bottom">
      <bottombar />
    </div>
  </div>
</template>

<script>
import Bottombar from "../components/Bottombar.vue";
import Like from '../components/Like.vue';

export default {
  name: "Person",
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
      currentSkillIndex: 0,
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
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex];
    }
  },
  watch: {
    id: "fetch"
    // id(){
    //   this.fetch()
    // }
  },
  methods: {
    async onBtnClicked() {
      this.isLike = !this.isLike;
      console.log(this.likeCats);
      if (this.isLike === true) {
        this.likeCats.plikes.push({ person: this.id });
        // this.$message({
        //   type: "success",
        //   message: "收藏成功"
        // });
      } else {
        for (let i in this.likeCats.plikes) {
          if (this.likeCats.plikes[i].person._id === this.id) {
            this.likeCats.plikes.splice(i, 1);
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
    back() {
      this.$router.go(-1); //返回上一层
    },
    async fetch() {
      const res = await this.$http.get("persons/" + this.id);
      this.model = res.data;
    },
    async fetchLikeCats() {
      var data1 = localStorage.getItem("user");
      var data2 = JSON.parse(data1);
      const res = await this.$http.get("likes/" + data2.username);
      this.likeCats = res.data;
      for (let a of this.likeCats.plikes) {
        if (a.person._id === this.id) {
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
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
  // .bottombar {
  //   position: sticky;
  //   bottom: 0;
  //   z-index: 999;
  // }
  .bottom {
    height: 100;
    position: sticky;
    bottom: 0;
    z-index: 999;
  }
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: 100% 100%;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      .badge {
        margin: 0 0.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
  .skills {
    img.icon {
      width: 70px;
      height: 70px;
      border: 3px solid map-get($colors, "white");
      &.active {
        border-color: map-get($colors, "pink-3");
      }
      border-radius: 50%;
    }
  }
  .person-items {
    img.icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
}
.peoplecontent {
  height: 100%;
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

