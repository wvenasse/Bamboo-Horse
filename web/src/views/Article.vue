<template>
  <div class="page-article" v-if="model">
    <div class="topbar bg-pink-1 py-2 px-3 d-flex ai-center text-white">
      <div class="d-flex py-3 px-20">
        <div class="iconfont icon-back text-white" @click="back"></div>
        <strong class="flex-grow-1 text-white pl-2">{{model.title}}</strong>
        <div class="text-white fs-xxs er">
          <router-link class="morea" :to="'/allarticle'" tag="div">更多资讯 &gt;&gt;</router-link>
        </div>
      </div>
    </div>

    <div class="addlike">
        <like>
          <i @click="onBtnClicked" v-show="!isLike" class="iconfont icon-favorite fa1"></i>
          <i @click="onBtnClicked" v-show="isLike" class="iconfont icon-favorite fa2"></i>
        </like>
    </div>

    <div v-html="model.body" class="px-3 body fs-lg"></div>

    <!-- 时间 -->
    <div class="fs-xs mb-2" style="padding-left: 200px;" @click="quxiao">{{model.updatedAt}}</div>

    <div class="addcomment" >
      <comment>
        <i @click="AddCom" class="iconfont icon-linedesign-01 text-white"></i>
      </comment>
    </div>
    <!-- 评论 -->
    <div class="px-3 border-top py-3">
      <div class="d-flex ai-center">
        <i class="iconfont icon-menu1"></i>
        <strong class="fs-lg ml-1">相关评论</strong>
      </div>
      <div class="pt-2 fs-lg">
        <div class="py-1" tag="div" v-for="(item,index) in model.comments" :key="index">
          <el-avatar class="oicon" :src="item.adminUser.icon"></el-avatar>
          <div class="comuser text-white-1">
            {{item.adminUser.name}}
            <div class="deletecom" v-show="item.is" @click="deletecom(item._id)">删除</div>
            <div class="backcom" @click="AddBack(index,item.adminUser.name)">回复</div>
          </div>
          <div class="comcom">{{item.comment}}</div>
          <div v-if="item.backcomments">
            <div class="dash4 mt-2"></div>
          </div>
          <div class="py-1 backcomm" tag="div" v-for="item1 in item.backcomments" :key="item1._id">
            <el-avatar class="oicon" :src="item1.adminUser.icon"></el-avatar>
            <div class="comuser text-white-1">
              {{item1.adminUser.name}}
              <div class="deletecom1" v-show="item1.is" @click="deletecom1(item1._id)">删除</div>
            </div>
            <div class="comcom">{{item1.comment}}</div>
            <div class="dash3 mt-2"></div>
          </div>
        </div>
      </div>

      <!-- 输入框 -->
      <div id="shurukuang">

      
      <div v-show="isCom" class="subcomm d-flex">
        <textarea v-model="comment" type="textarea" warp="hard" ref="focusTextarea"/>
        <button class="subu text-white" @click="SubCom">发送</button>
      </div>
      <div v-show="isBack" class="subcomm d-flex" style="position:relative;">
        <textarea v-model="backcomment" type="textarea" warp="hard" :placeholder="backname" ref="focusTextarea"/>
        <button class="subu text-white" @click="SubBack">发送</button>
      </div>
    </div>
    </div>

    <div class="px-3 border-top py-3">
      <div class="d-flex ai-center">
        <i class="iconfont icon-menu1"></i>
        <strong class="fs-lg ml-1">相关资讯</strong>
      </div>
      <div class="pt-2 fs-lg">
        <router-link
          class="py-1"
          tag="div"
          :to="'/articles/'+item._id"
          v-for="item in model.related"
          :key="item._id"
        >{{item.title}}</router-link>
      </div>
    </div>

  </div>
</template>

<script>
import Like from "../components/Like.vue";
import Comment from "../components/Comment.vue";

export default {
  props: {
    id: { required: true }
  },
  components: {
    Like,
    Comment
  },
  data() {
    return {
      model: {},
      isLike: false,
      isCom: false,
      isBack: false,
      isdelete: false,
      likeCats: {},
      comment: "",
      backcomment: "",
      backindex: "",
      backname: "",
      nnaammee: ""
    };
  },
  watch: {
    id: "fetch"
  },
  methods: {
    async deletecom(id) {
      this.$confirm("是否确定要删除该评论? ", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(async () => {
          for (let ind in this.model.comments) {
            if (this.model.comments[ind]._id === id) {
              this.model.comments.splice(ind, 1);
            }
          }
          await this.$http.put("articles/" + this.id, this.model);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async deletecom1(id) {
      console.log(this.model);
      console.log(id);

      this.$confirm("是否确定要删除该评论? ", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(async () => {
          for (let co of this.model.comments) {
            for (let ind in co.backcomments) {
              if (co.backcomments[ind]._id === id) {
                co.backcomments.splice(ind, 1);
              }
            }
          }
          await this.$http.put("articles/" + this.id, this.model);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    quxiao() {
      this.isBack = false;
      this.isCom = false;
    },
    async onBtnClicked() {
      this.isLike = !this.isLike;
      if (this.isLike === true) {
        this.likeCats.alikes.push({ article: this.id });
      } else {
        for (let i in this.likeCats.alikes) {
          if (this.likeCats.alikes[i].article._id === this.id) {
            this.likeCats.alikes.splice(i, 1);
          }
        }
      }
      await this.$http.put("adminusers/" + this.likeCats._id, this.likeCats);
    },
    async AddCom() {
      if (this.isBack === true) {
        this.isBack = false;
      }
      this.isCom = true;
    },
    async AddBack(index, name) {
      if (this.isCom === true) {
        this.isCom = false;
      }
      this.backindex = index;
      this.backname = "回复" + name;
      console.log(this.backname);
      this.isBack = true;
    },
    async SubCom() {
      this.isCom = false;
      this.model.comments.push({
        adminUser: this.likeCats._id,
        comment: this.comment
      });
      await this.$http.put("articles/" + this.id, this.model);
      this.comment = "";
      this.fetch();
    },
    async SubBack() {
      this.isBack = false;
      this.model.comments[this.backindex].backcomments.push({
        adminUser: this.likeCats._id,
        comment: this.backcomment
      });
      await this.$http.put("articles/" + this.id, this.model);
      this.backcomment = "";
      this.fetch();
    },
    back() {
      this.$router.go(-1); //返回上一层
    },
    async fetch() {
      const res = await this.$http.get("articles/" + this.id);
      this.model = res.data;
      for (let c of this.model.comments) {
        if (c.adminUser.name === this.nnaammee) {
          c.is = true;
        } else {
          c.is = false;
        }
        for (let b of c.backcomments) {
          if (b.adminUser.name === this.nnaammee) {
            b.is = true;
          } else {
            b.is = false;
          }
        }
      }
    },
    async fetchLikeCats() {
      var data1 = localStorage.getItem("user");
      var data2 = JSON.parse(data1);
      const res = await this.$http.get("likes/" + data2.username);
      this.likeCats = res.data;
      this.nnaammee = this.likeCats.name;
      for (let a of this.likeCats.alikes) {
        if (a.article._id === this.id) {
          this.isLike = true;
          return;
        }
      }
    }
  },
  mounted() {
		this.$refs.focusTextarea.focus();
  },
  created() {
    this.fetchLikeCats();
    this.fetch();
  }
};
</script>
<style lang="scss" >
.page-article {
  height: 100%;
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
  .morea {
    width: 60px;
  }

  .fa1 {
    font-size: 60px;
    color: #000;
  }
  .fa2 {
    font-size: 60px;
    color: #ffb6c1;
  }
  .soli4 {
    margin: 10px auto;
    border-bottom: 3px solid white;
  }
  .dash4 {
    border-bottom: 3px dashed white;
    width: 85%;
    margin-left: 50px;
  }
  .dash3 {
    border-bottom: 1px dashed white;
    width: 100%;
    // margin-left: 50px;
  }
}

.addcomment i {
  font-size: 40px;
  margin-top: -80px;
}

.comuser {
  margin-top: -37px;
  margin-left: 50px;
  margin-bottom: 10px;
  position: absolute;
}

.comcom {
  margin-top: -10px;
  margin-left: 50px;
}

.subcomm {
  margin-top: 10px;
  border: 1px dashed #fff;
  border-radius: 3px;
  height: auto;
  box-shadow: 0 0 25px #cac6c6;
}

.backcom {
  margin-top: -20px;
  margin-left: 255px;
  position: absolute;
  width: 50px;
}
.deletecom {
  margin-top: -20px;
  margin-left: 215px;
  position: absolute;
  width: 50px;
}

.deletecom1 {
  margin-top: -20px;
  margin-left: 205px;
  position: absolute;
  width: 50px;
}

textarea {
  margin: 10px;
  outline-style: none;
  border: 0px;
  border: 1px dashed #ffc0cb;
  border-radius: 3px;
  padding: 5px 5px;
  width: 70%;
  font-size: 15px;
  font-family: "Courier New", Courier, monospace;
  overflow: visible;
  // position:absolute;
  // z-index:9
}

.note{
  position:absolute;
  line-height:20px;
  margin-top:16px;
  margin-left: 18px;
}


.subu {
  border: 0px;
  border: 1px solid #fff;
  background: #ffc0cb;
  width: 20%;
  height: 30px;
  margin-top: 20px;
}

.backcomm {
  width: 80%;
  margin: 10px 50px;
}
</style>

