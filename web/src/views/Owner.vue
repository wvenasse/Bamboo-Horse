<template>
  <div id="app" class="container">
    <!-- topbar -->
    <div class="headerown">
      <div class="topbar header d-flex">
        <top-bar />
      </div>
      <div class="topbar1">
        <div class="boxheart"></div>
        <div class="heart"></div>
        <div class="owncard">
          <div class="card bg-white w-100 h-100">
            <div class="card-header d-flex ai-center">
              <div class="fs-xl flex-1 px-2 d-flex">
                <div class="ownicon">
                  <el-avatar v-if="this.adminusersCats.icon" class="oicon" :src="this.adminusersCats.icon"></el-avatar>
                  <el-avatar v-else class="oicon" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                </div>
                <strong class="oname">{{this.adminusersCats.name}}</strong>
                <div class="odescription">“{{this.adminusersCats.description}}”</div>
                
              </div>
            </div>
            <router-link tag="div" :to="'/setting'" class="alike">
              <div class="iconfont icon-back text-pink-1 set"></div>
            </router-link>
            <div class="card-body">
              <div class="like">
                <img src="../images/favorite.png" alt />
                <div class="mlike">我的收藏</div>
                <div class="solid1"></div>
                <div class="likes ml-5 mt-3 pl-2">
                  <router-link tag="div" :to="'/likearticle'" class="alike">
                    资讯
                    <div class="iconfont icon-back text-white ownlike"></div>
                  </router-link>

                  <div class="dashed1"></div>

                  <router-link tag="div" :to="'/likeperson'" class="plike">
                    人物
                    <div class="iconfont icon-back text-white ownlike"></div>
                  </router-link>

                  <div class="dashed1"></div>

                  <router-link tag="div" :to="'/likevideo'" class="vlike">
                    视频
                    <div class="iconfont icon-back text-white ownlike"></div>
                  </router-link>

                  <div class="dashed1"></div>
                </div>
              </div>

              <div class="out" @click="Clean">
                <router-link tag="div" :to="'/login'" class="oout">退出账号</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bgown"></div>
    <!-- bottombar -->
    <div class="footer">
      <bottombar :rurl="this.$route.path" />
    </div>
  </div>
</template>

<script>
import TopBar from "../components/TopBar.vue";
import Bottombar from "../components/Bottombar.vue";

export default {
  name: "Category",
  data() {
    return {
      currentDate: new Date(),
      adminusersCats: {},
    };
  },
  methods: {
    Clean() {
      localStorage.clear();
    },
    async fetchAdminUsersCats() {
      var data1 = localStorage.getItem("user");
      var data2 = JSON.parse(data1);
      const res = await this.$http.get("adminusers/" + data2.username);
      this.adminusersCats = res.data;
    }
  },
  components: {
    Bottombar,
    TopBar
  },
  mounted() {
  },
  created() {
    this.fetchAdminUsersCats();
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";
.card {
  .card-header {
    border-bottom: 1px solid $border-color;
  }
  border-bottom: 1px solid $border-color;
  background: white;
  border-radius: 10px;
  width: 100%;
  height: 440px;
}

.headerown {
  position: sticky;
  top: 0px;
  z-index: 999;
}
.topbar {
  position: sticky;
  top: 0px;
  z-index: 999;
}
.topbar1 {
  position: sticky;
  top: 61px;
  z-index: 999;
}
.footer {
  position: sticky;
  bottom: 0px;
  z-index: 999;
}

.bgown {
  background-image: url(../images/p7.jpg);
  height: 200vw;
  background-size: 100% 100%;
}
.boxheart {
  width: 100%;
  height: 100px;
  background: #ffc0cb;
  margin-top: -1px;
  position: absolute;
  z-index: 999;
}

.heart {
  width: 100%;
  height: 50px;
  background: #ffc0cb;
  border-radius: 0 0 50px 50px;
  position: absolute;
  margin-top: 98px;
  z-index: 999;
}



.owncard {
  // margin-top: 108px;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  height: 300px;
  position: absolute;
  margin-top: 30px;
  z-index: 999;
}

.ownicon {
  width: 100px;
  height: 100px;
}
.oicon {
  width: 90%;
  height: 90%;
  border: 3px solid $border-color;
  margin-top: 5px;
}
.oname {
  margin-top: 2rem;
  margin-left: 2rem;
}
.odescription {
  position: absolute;
  margin-top: 4rem;
  margin-left: 6rem;
}
.like {
  background: rgba(255, 192, 203, 0.9);
  color: white;
  width: 90%;
  height: 200px;
  margin-top: 70px;
  margin-left: 18px;
  border: 2px solid #ffc0cb;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 700;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(255,182,193,.6)
}

.out {
  background: rgba(255, 192, 203, 0.9);
  color: white;
  margin: 30px auto;
  width: 50%;
  height: 50px;
  border: 2px solid #ffc0cb;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 700;
}

.oout {
  margin: 15px auto;
  text-align: center;
}
.mlike {
  margin-top: -35px;
  margin-left: 55px;
}

.ownlike {
  font-size: 22px;
  transform: rotate(180deg);
  width: 20px;
  margin-top: -20px;
  margin-left: 190px;
}
.set {
  width: 40px;
  font-size: 40px;
  margin-top: -55px;
  margin-left: 280px;
  transform: rotate(180deg);
}

.solid1 {
  border-bottom: 1px solid white;
  width: 90%;
  margin-top: 10px;
  margin-left: 15px;
}
.dashed1 {
  border-bottom: 1px dashed white;
  width: 80%;
  margin-top: 10px;
  margin-left: 0px;
  margin-bottom: 15px;
}
</style>