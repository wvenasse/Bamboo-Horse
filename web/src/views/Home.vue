<template>
  <div>
    <!-- topbar -->
    <div class="topbar header d-flex">
      <top-bar />
    </div>
    <div class="border-bottom"></div>
    <div class="border-bottom"></div>
    <div class="border-bottom"></div>

<div  class="home">


    <!-- 轮播图 -->
    <div class="sroll" >
      <el-carousel  :interval="4000" type="card" height="200px">
        <el-carousel-item class="mt-2" v-for="(ad,index) in adsCats.items" :key="index">
          <img class="pic" :src="ad.image" @click="gotopicurl(ad.url)">
        </el-carousel-item>
      </el-carousel>
    </div>
    
    <!-- <swiper ref="mySwiper" :options="swiperOptions" class="">
      <swiper-slide>
        <img src="../images/p1.jpg" style="width:100%;height:60%;" />
      </swiper-slide>
      <swiper-slide>
        <img src="../images/p2.jpg" style="width:100%;height:60%;" />
      </swiper-slide>
      <swiper-slide>
        <img src="../images/p3.jpg" style="width:100%;height:60%;" />
      </swiper-slide>
      <swiper-slide>
        <img src="../images/p4.jpg" style="width:100%;height:60%;" />
      </swiper-slide>
      <swiper-slide>
        <img src="../images/p5.jpg" style="width:100%;height:60%;" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper> -->

    <!-- 导航菜单 -->
    <div class="nav-icons bg-white text-center mt-3 pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <router-link
          tag="div"
          :to="'/allperson'"
          class="nav-item mb-3">
          <i class="sprite sprite-person"></i>
          <div class="py-2">明星</div>
        </router-link>
        <router-link
          tag="div"
          :to="'/allarticle'"
          class="nav-item mb-3">
          <i class="sprite sprite-story"></i>
          <div class="py-2">资讯</div>
        </router-link>
        <router-link
          tag="div"
          :to="'/hots'"
          class="nav-item mb-3">
          <i class="sprite sprite-hot"></i>
          <div class="py-2">热门</div>
        </router-link>
        <router-link
          tag="div"
          :to="'/allvideo'"
          class="nav-item mb-3">
          <i class="sprite sprite-discover"></i>
          <div class="py-2">视频</div>
        </router-link>
        <router-link
          tag="div"
          :to="'/owner'"
          class="nav-item mb-3">
          <i class="sprite sprite-video"></i>
          <div class="py-2">个人</div>
        </router-link>
      </div>
      <div class="d-flex flex-wrap" v-show="isShow">
        <div class="nav-item mb-3">
          <i class="sprite sprite-person"></i>
          <div class="py-2">资讯</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-story"></i>
          <div class="py-2">文章</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-hot"></i>
          <div class="py-2">热门</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-discover"></i>
          <div class="py-2">发现</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-video"></i>
          <div class="py-2">视频</div>
        </div>
      </div>
      <div class="d-flex flex-wrap" v-show="isShow">
        <div class="nav-item mb-3">
          <i class="sprite sprite-person"></i>
          <div class="py-2">资讯</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-story"></i>
          <div class="py-2">文章</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-hot"></i>
          <div class="py-2">热门</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-discover"></i>
          <div class="py-2">发现</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-video"></i>
          <div class="py-2">视频</div>
        </div>
      </div>
      <div v-if="isShow" class="bg-light py-2 fs-sm" @click='changeisShow'>
        <i class="sprite sprite-arrow mr-1"></i>
        <span >收起</span>
      </div>
      <div v-else class="bg-light py-2 fs-sm" @click='changeisShow'>
        <i class="sprite sprite-arrow mr-1 zhankai"></i>
        <span >展开</span>
      </div>
    </div>
    <!-- 卡片组件 -->
    <m-list-card icon="article-line" title="娱乐资讯" moremenu="/allarticle" :categories="newsCats">
      <template #items="{category}">
        <router-link 
        tag="div" 
        :to= "'/articles/'+item._id"
        class="py-2 fs-lg d-flex" 
        v-for="(item,i) in category.newsList" 
        :key="i">
          <span class="text-info text-pink-2">[{{item.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{item.title}}</span>
          <span class="text-grey-1 fs-sm">{{item.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>
    <m-list-card icon="person" title="明星人物" moremenu="/allperson"  :categories="personsCats">
      <template #items="{category}">
        <div class="d-flex  flex-warp" style="margin: 0 -0.5rem;">
          <router-link 
          tag="div"
          :to= "'/persons/'+person._id"
          class="p-2 text-center" 
          style="width:20%;" 
          v-for="(person,i) in category.personList" :key="i">
            <img :src="person.avatar" class="w-100">
            <div>{{person.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    <!-- <m-list-card icon="video" title="精彩视频" moremenu="/allvideo"  :categories="videosCats">
      <template #items="{category}">
        <div class="d-flex  flex-warp" style="margin: 0 -0.5rem;">
          <router-link 
          tag="div"
          :to= "'/videos/'+video._id"
          class="p-2 text-center" 
          v-for="(video,i) in category.videoList" :key="i">
            <video :src="video.vision" class="w-100"></video>
            <div>{{video.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card> -->
    <div class="mt-3"></div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs';
import TopBar from '../components/TopBar.vue';

export default {
  name: "home",
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD');
    }
  },
  components:{
      TopBar,
  },
  data() {
    return {
      newsCats: [],
      personsCats: [],
      videosCats: [],
      isShow:false,
      pics: [
        require("../images/p1.jpg"),
        require("../images/p2.jpg"),
        require("../images/p3.jpg"),
      ],
      username:'',
      adsCats:{}
    };
  },
  methods: {
    gotopicurl(url){
      this.$router.push(url);
    },
    changeisShow(){
      this.isShow = !this.isShow;//取反
    },
    async fetchNewsCats(){
      const res = await this.$http.get('news/list');
      this.newsCats = res.data;
    },
    async fetchPersonsCats(){
      const res = await this.$http.get('persons/list');
      this.personsCats = res.data;
    },
    async fetchVideosCats(){
      const res = await this.$http.get('videos/list');
      this.videosCats = res.data;
    },
    async fetchAds(){
      const res = await this.$http.get('ads/list');
      this.adsCats = res.data;
    },
  },
  created(){
    this.fetchNewsCats();
    this.fetchPersonsCats();
    this.fetchVideosCats();
    this.fetchAds();
  },
  computed: {
  },
  mounted() {
  }
};
</script>
<style lang="scss">
@import "../assets/iconfont/iconfont.css";
@import "../assets/scss/_variables.scss";
.el-carousel__item h3 {
    color: #ffc0cb;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #ffc0cb;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #ffb6c1;
  }

.pic {
    height: 53vw;
    width: 50vw;;
    background-size: 100% 100%;
}
.sroll {
  background: rgba(255, 255, 255, 0.5)
}
// .pagination-home {
//   .swiper-pagination-bullet {
//     opacity: 1;
//     border-radius: 0.1538rem;
//     background: map-get($colors, "white");
//     &.swiper-pagination-bullet-active {
//       background: map-get($colors, "info");
//     }
//   }
// }

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(5n) {
      border-right: none;
    }
  }
}

.zhankai {
  transform: rotate(180deg);
}

.home {
  width: 100%;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}

</style>

