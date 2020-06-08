<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="basic">
        <el-tab-pane label="基本内容" name="basic">
          <el-form-item label="所属分类">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="详情">
            <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="评论" name="comment">
          <el-button size="small" @click="model.comments.push({})">
            <i class="el-icon-plus"></i>
            添加评论
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="12" v-for="(item,index) in model.comments" :key="index">
              <el-form-item label="用户">
                <el-select filterable v-model="item.adminUser">
                  <el-option
                    v-for="adminuser in adminUsers"
                    :key="adminuser._id"
                    :value="adminuser._id"
                    :label="adminuser.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="评论">
                <el-input v-model="item.comment" type="textarea"></el-input>
              </el-form-item>
               <el-form-item label="删除" v-show="false">
                  <el-select v-model="item.is">
                    <el-option
                      value = true
                      label = true
                    ></el-option>
                     <el-option
                      value = false
                      label = false
                    ></el-option>
                  </el-select>
              </el-form-item>

              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="item.backcomments.push({})"
                style="margin-left:120px;margin-bottom:20px;"
              ></el-button>
              <el-row type="flex" style="flex-wrap:wrap;">
                <el-col :md="12" v-for="(item,index) in item.backcomments" :key="index">
                  <el-form-item label="用户">
                    <el-select filterable v-model="item.adminUser">
                      <el-option
                        v-for="adminuser in adminUsers1"
                        :key="adminuser._id"
                        :value="adminuser._id"
                        :label="adminuser.name"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="回复">
                    <el-input v-model="item.comment" type="textarea"></el-input>
                  </el-form-item>
                   <el-form-item label="删除" v-show="false">
                  <el-select v-model="item.is">
                    <el-option
                      value = true
                      label = true
                    ></el-option>
                     <el-option
                      value = false
                      label = false
                    ></el-option>
                  </el-select>
              </el-form-item>
                  <el-form-item>
                    <el-button
                      size="small"
                      type="danger"
                      @click="item.backcomments.splice(index,1)"
                    >删除回复</el-button>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item>
                <el-button size="small" type="danger" @click="model.comments.splice(index,1)">删除评论</el-button>
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
import { VueEditor } from "vue2-editor";
// import axios from 'axios'

// Vue.prototype.$ajax = axios

export default {
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {
        comments: [],
        backcomments:[],
      },
      categories: [],
      adminUsers: [],
      adminUsers1: []
    };
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save() {
      console.log("save");
      // let res;
      console.log(this.model);

      if (this.id) {
        await this.$http.put("rest/articles/" + this.id, this.model);
      } else {
        await this.$http.post("rest/articles", this.model);
      }

      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get("rest/articles/" + this.id);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get("rest/categories");
      this.categories = res.data;
    },
    async fetchAdminUsers() {
      const res = await this.$http.get("rest/admin_users");
      this.adminUsers = res.data;
      this.adminUsers1 = res.data;
    }
  },
  created() {
    this.fetchCategories();
    this.fetchAdminUsers();
    this.id && this.fetch();
  }
};
</script>
