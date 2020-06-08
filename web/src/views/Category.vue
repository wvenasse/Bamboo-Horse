<template>
  <div id="app" class="container">
    <!-- topbar -->
    <div class="topbar header d-flex">
      <top-bar />
    </div>
    <div class="border-bottom"></div>
    <div class="border-bottom"></div>
    <div class="border-bottom"></div>

    <div class="bg">
      <div class="content">
        <div class="card bg-white c1">
          <router-link tag="div" :to="'/allarticle'" class="p-2 text-center">娱乐资讯</router-link>
        </div>
        <div class="card bg-white c2">
          <router-link tag="div" :to="'/allperson'" class="p-2 text-center">明星人物</router-link>
        </div>
        <div class="card bg-white c3">
          <router-link tag="div" :to="'/allvideo'" class="p-2 text-center">精彩视频</router-link>
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
import TopBar from "../components/TopBar.vue";
import Bottombar from "../components/Bottombar.vue";

export default {
  name: "Category",
  data() {
    return {
      currentDate: new Date()
    };
  },
  components: {
    Bottombar,
    TopBar
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
.card{
  color: #ffb6c1;
  font-size: 20px;
  font-family: "Courier New", Courier, monospace;
  font-weight:900;
}

.c1 {
  // margin-top: 100px;
  // margin-left: 5px;
  border-radius: 30px;
  width: 150px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50px;
  border: 3px solid #ffb6c1;
  animation: move1 8s linear 0s infinite alternate;
}
.c2 {
  // margin-top: 200px;
  // margin-left: 100px;
  border-radius: 30px;
  width: 150px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50px;
  border: 3px solid #ffb6c1;
  animation: move2 10s linear 0s infinite alternate;
}
.c3 {
  // margin-top: 300px;
  // margin-left: 220px;
  border-radius: 30px;
  width: 150px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50px;
  border: 3px solid #ffb6c1;
  animation: move3 8s linear 0s infinite alternate;
}

@keyframes move1 {
  0% {
    top: 100px;
    left: 0px;
    
  }
  50% {
    top: 350px;
    left: 220px;
    
  }
  100% {
    top: 600px;
    left: 110px;
    
  }
}
@keyframes move2 {
  0% {
    // top: 150px;
    // left: 50px;
    top: 400px;
    left: 180px;
  }
  25% {
    // top: 400px;
    // left: 180px;
    top: 650px;
    left: 60px;
  }
  50%{
    top: 400px;
    left: 10px;
  }
  75%{
    top: 150px;
    left: 50px;
  }
  100% {
    // top: 650px;
    // left: 60px;
    top: 400px;
    left: 180px;
  }
}

@keyframes move3 {
  100% {
    top: 200px;
    left: 100px;
    
  }
  50% {
    top: 450px;
    left: 130px;
    
  }
  0% {
    top: 700px;
    left: 10px;
    
  }
}
</style>