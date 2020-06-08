<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}视频</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
				<el-select v-model="model.categories" multiple>
					<el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
				</el-select>
			</el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="视频">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
          @change="changeVideo"
        >
          <video
            v-if="model.vision"
            :src="model.vision"
            class="vision mt-2"
            style="width:440px;height:230px"
          ></video>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="视频详情">
						<el-input type="textarea" v-model="model.description"></el-input>
					</el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
Vue.prototype.$axios = axios;
import Vue from "vue";

export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      categories: []
    };
  },
  methods: {
    afterUpload(res) {
      this.$set(this.model, "vision", res.url);
    },
    async save() {
      console.log("save");
      if (this.id) {
        await this.$http.put("rest/videos/" + this.id, this.model);
      } else {
        await this.$http.post("rest/videos", this.model);
      }

      this.$router.push("/videos/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get("rest/videos/" + this.id);
      this.model = res.data;
    },
    async fetchCategories() {
				const res = await this.$http.get('rest/categories');
				this.categories = res.data;
		}
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  }
};
</script>


