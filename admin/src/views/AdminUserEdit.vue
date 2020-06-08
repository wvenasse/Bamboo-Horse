<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}用户</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="basic">
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="账号">
            <el-input v-model="model.username"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.icon" :src="model.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="自我描述">
            <el-input type="textarea" v-model="model.description"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="text" v-model="model.password"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="收藏" name="likes">
          <el-button size="small" @click="model.alikes.push({})">
            <i class="el-icon-plus"></i>
            添加资讯
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="12" v-for="(item,index) in model.alikes" :key="index">
              <el-form-item label="标题">
                <el-select filterable v-model="item.article">
                  <el-option
                    v-for="article in articles"
                    :key="article._id"
                    :value="article._id"
                    :label="article.title"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.alikes.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <el-button size="small" @click="model.plikes.push({})">
            <i class="el-icon-plus"></i>
            添加人物
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="12" v-for="(item,index) in model.plikes" :key="index">
              <el-form-item label="名称">
                <el-select filterable v-model="item.person">
                  <el-option
                    v-for="person in persons"
                    :key="person._id"
                    :value="person._id"
                    :label="person.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.plikes.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <el-button size="small" @click="model.vlikes.push({})">
            <i class="el-icon-plus"></i>
            添加视频
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="12" v-for="(item,index) in model.vlikes" :key="index">
              <el-form-item label="名称">
                <el-select filterable v-model="item.video">
                  <el-option
                    v-for="video in videos"
                    :key="video._id"
                    :value="video._id"
                    :label="video.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.vlikes.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top:1rem;">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      articles: [],
      persons: [],
      videos: [],
      model: {
        alikes: [],
        plikes: [],
        vlikes: []
      }
    };
  },
  methods: {
    afterUpload(res) {
      this.$set(this.model, "icon", res.url);
    },
    async save() {
      console.log("save");
      if (this.id) {
        await this.$http.put("rest/admin_users/" + this.id, this.model);
      } else {
        await this.$http.post("rest/admin_users", this.model);
      }


      this.$router.push("/admin_users/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get("rest/admin_users/" + this.id);
      this.model = res.data;
    },
    async fetchArticles() {
      const res = await this.$http.get("rest/articles");
      this.articles = res.data;
    },
    async fetchPersonns() {
      const res = await this.$http.get("rest/persons");
      this.persons = res.data;
    },
    async fetchVideos() {
      const res = await this.$http.get("rest/videos");
      this.videos = res.data;
    }
  },
  created() {
    this.fetchArticles();
    this.fetchPersonns();
    this.fetchVideos();
    this.id && this.fetch();
  }
};
</script>
