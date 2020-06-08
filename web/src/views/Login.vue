<template>
  <div class="login">
    <div class="bg">
      <div class="title">竹马</div>

      <!-- <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
      </div>-->

      <!-- <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-container"
      >-->
      <el-form
        ref="loginForm"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-container"
        @submit.native.prevent="login"
      >
        <h2 class="title1">登录</h2>
        <el-form-item prop="account">
          <el-input v-model="model.username" placeholder="账号" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="model.password" placeholder="密码" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <button class="buttom" native-type="submit">登录</button>
        </el-form-item>
      </el-form>
      <div class="text-white gotor">
            <router-link 
            tag="div" 
            :to= "'/register'" >
              没有账号？请先注册
            </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// import Cookies from "js-cookie";
export default {
  data() {
    return {
      model: {},
    };
  },
  methods: {
    // userInfo(model){
    //   localStorage.setItem('model',JSON.stringify(this.model));
    // },
    async login() {
      const res = await this.$http.post("login", this.model);
      // sessionStorage.token = res.data.token;
      localStorage.token = res.data.token;
      localStorage.setItem('user',JSON.stringify(this.model));
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登陆成功"
      });
    },
  },
};
</script>

<style lang="scss">
.bg {
  background-image: url(../images/p6.jpg);
  height: 220vw;
  background-size: 100% 100%;
}

.title {
  width: 100%;
  height: 25%;
  color: white;
  font-size: 100px;
  text-align: center;
  padding-top: 100px;
  font-family: "Courier New", Courier, monospace; //'Times New Roman', Times, serif
}

.login-container {
  background: rgba(255, 251, 240, 0.25);
  border-radius: 5px;
  background-clip: padding-box;
  margin-left: 1rem;
  width: 90%;
  height: 40%;
  padding-top: 100px;
  padding: 35px 35px 15px 35px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  .title1 {
    margin: 0px auto 40px auto;
    text-align: center;
    color: whitesmoke;
  }
  // .el-button--primary {
  //   color: #fff;
  //   background-color: #ffc0cb;
  //   border-color: #ffc0cb;
  // }

  // .el-button--primary:active {
  //   color: #ffc0cb;
  //   background-color: #fff;
  //   border-color: #fff;
  // }
  .buttom {
    color: #fff;
    background-color: #ffc0cb;
    border-color: #ffc0cb;

    width: 47.5%;
    height: 40px;
    border-radius: 4px;
    font-size: 20px;
    font-family: "Courier New", Courier, monospace;
    margin-left: 4rem;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(255, 182, 193, 0.6);
  }

  .buttom:active {
    color: #ffc0cb;
    background-color: #fff;
    border-color: #fff;
  }
}

.gotor {
  margin-top: -40px;
  margin-left: 190px;
}
</style>