<template>
  <div class="login">
    <div class="bg">
      <div class="title">竹马</div>
      <el-form
        ref="loginForm"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-container regi"
        @submit.native.prevent="register"
      >
        <div class="iconfont icon-back text-white gotol" @click="back"></div>
        <h2 class="title1">注册</h2>
        <el-form-item prop="account">
          <el-input v-model="model.username" placeholder="账号" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item prop="account">
          <el-input v-model="model.name" placeholder="用户名" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="model.password" placeholder="密码" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="pass" placeholder="再次输入密码" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <button class="buttom" native-type="submit">注册</button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import Cookies from "js-cookie";
export default {
  data() {
    return {
      model: {},
      pass: ""
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async register() {
      if (this.model.password === this.pass) {
        await this.$http.post("adminusers/", this.model);
        this.$router.push("/login");
        this.$message({
          type: "success",
          message: "注册成功"
        });
      }
      else {
        this.$router.push("/register");
        this.$message({
          type: "erro",
          message: "两次密码输入不一致"
        });
      }
    }
  }
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
  font-family: "Courier New", Courier, monospace;
}

.regi {
  background: rgba(255, 251, 240, 0.25);
  border-radius: 5px;
  background-clip: padding-box;
  margin-left: 1rem;
  width: 90%;
  height: 50%;
  padding-top: 100px;
  padding: 35px 35px 15px 35px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  .title1 {
    margin: -18px auto 40px auto;
    text-align: center;
    color: whitesmoke;
  }

  .buttom {
    color: #fff;
    background-color: #ffc0cb;
    border-color: #ffc0cb;
    // shadow: white ;
    width: 47.5%;
    height: 40px;
    border-radius: 4px;
    font-size: 20px;
    font-family: "Courier New", Courier, monospace;
    margin-left: 4rem;
  }

  .buttom:active {
    color: #ffc0cb;
    background-color: #fff;
    border-color: #fff;
  }
}
.gotol {
  font-size: 30px;
}
</style>