<template>
  <div id="app" class="container">
    <div class="headerown">
      <div class="topbar header d-flex">
        <top-bar />
      </div>
      <div class="topbar1">
        <div class="boxheart"></div>
        <div class="heart"></div>
        <div class="owncard">
          <div class="card bg-white w-100 h-100 setcard">
            <div class="card-header d-flex ai-center">
              <div class="fs-xl flex-1 px-2 d-flex">
                <div class="iconfont icon-back text-pink-1 backown" @click="back"></div>
                <div class="owntou">
                  <div class="ownicon">
                    <!-- <el-avatar class="oicon" :src="this.picurl"></el-avatar> -->
                    <el-upload
                      class="avatar-uploader ownup"
                      :action="$http.defaults.baseURL + '/upload'"
                      :headers="getAuthHeaders()"
                      :show-file-list="false"
                      :on-success="afterUpload"
                    >
                      <el-avatar
                      v-if="this.adminusersCats.icon"
                        v-model="adminusersCats.icon"
                        :src="adminusersCats.icon"
                        class="avatar oicon"
                      ></el-avatar>
                       <el-avatar v-else class="oicon" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>

                    </el-upload>
                  </div>
                </div>

                <div class="oexit" @click="exit">
                  <div class="exit text-red">注销</div>
                </div>
              </div>
            </div>

            <div class="solid2"></div>
            <div class="owninfo">
              <div class="oname">
                <strong class="infotext">账号：</strong>
                {{this.adminusersCats.username}}
              </div>
              <div class="oname">
                <strong class="infotext">用户名：</strong>
                <input type="text" v-model="adminusersCats.name" />
              </div>
              <div class="opassword">
                <strong class="infotext">密码 ：</strong>
                <input type="text" placeholder="请输入新密码" v-model="adminusersCats.password" />
              </div>
              <div class="odescription">
                <strong class="infotext">描述：</strong>
                <input type="textarea" v-model="adminusersCats.description" />
              </div>
            </div>

            <div class="save" @click="settinguser">
              <router-link tag="div" :to="'/owner'" class="osave">保存</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bgown"></div>
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
      picurl: require("../images/6.jpg"),
      adminusersCats: {}
    };
  },
  methods: {
    afterUpload(res) {
      this.$set(this.adminusersCats, "icon", res.url);
    },
    async settinguser() {
      this.$http.put(
        "adminusers/" + this.adminusersCats._id,
        this.adminusersCats
      );
      this.$message({
        type: "success",
        message: "修改成功"
      });
      this.fetchAdminUsersCats();
    },
    async exit() {
      this.$confirm("是否确定要注销账号?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(async () => {
          await this.$http.delete(
            "adminusers/" + this.adminusersCats._id,
            this.adminusersCats
          );
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          console.log("delete");
          localStorage.clear();
          this.$router.push("/login");
          this.fetchAdminUsersCats();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    back() {
      this.$router.go(-1); //返回上一层
    },
    async fetchAdminUsersCats() {
      var data1 = localStorage.getItem("user");
      var data2 = JSON.parse(data1);
      const res = await this.$http.get("adminusers/" + data2.username);
      this.adminusersCats = res.data;
      this.picurl = this.adminusersCats.icon;
    }
  },
  components: {
    Bottombar,
    TopBar
  },
  mounted() {},
  created() {
    this.fetchAdminUsersCats();
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";
.setcard {
  background: white;
  border-radius: 10px;
  width: 100%;
  height: 450px;
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

.oexit {
  width: 50px;
  height: 20px;
  margin-top: 80px;
  margin-left: -25px;
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
.backown {
  font-size: 40px;
  width: 40px;
  padding-top: 40px;
}

.owntou {
  width: 100px;
  margin: 0px 85px;
}
.oicon {
  width: 90px;
  height: 90px;
  border: 3px solid $border-color;
  margin-top: 10px;
}

.owninfo {
  margin: 20px auto;
  width: 80%;
  height: 51%;
  border: 1px solid #ffc0cb;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(255, 182, 193, 0.6);
}

.oname {
  margin: 20px 20px;
}
.opassword {
  margin: 20px 20px;
}
.odescription {
  margin: 20px 20px;
}

.save {
  background: rgba(255, 192, 203, 0.9);
  color: white;
  margin: 20px auto;
  width: 50%;
  height: 50px;
  border: 2px solid #ffc0cb;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 700;
}

.osave {
  margin: 15px auto;
  text-align: center;
}

input {
  outline-style: none;
  border: 0px;
  border: 1px dashed #ffc0cb;
  border-radius: 3px;
  padding: 4px 4px;
  width: 170px;
  font-size: 15px;
  font-family: "Courier New", Courier, monospace;
}

input:focus {
  border-color: #ffb6c1;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(255, 182, 193, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(255, 182, 193, 0.6);
}


.solid2 {
  border-bottom: 1px solid #ffb6c1;
  width: 90%;
  margin-top: 10px;
  margin-left: 15px;
}
.dashed2 {
  border-bottom: 1px dashed white;
  width: 80%;
  margin-top: 10px;
  margin-left: 0px;
  margin-bottom: 15px;
}
</style>