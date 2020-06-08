<template>
	<div class="about">
		<h1>{{id ? '编辑' : '新建'}}人物</h1>
		<el-form label-width="120px" @submit.native.prevent="save">
			<el-tabs type="border-card" value="basic">
				<el-tab-pane label="基础信息" name="basic">
					<el-form-item label="名称">
						<el-input v-model="model.name"></el-input>
					</el-form-item>
					<el-form-item label="称号">
						<el-input v-model="model.title"></el-input>
					</el-form-item>
					<el-form-item label="头像">
						<el-upload
							class="avatar-uploader"
							:action="uploadUrl"
							:headers="getAuthHeaders()"
							:show-file-list="false"
							:on-success="res => $set(model,'avatar',res.url)">
							<img v-if="model.avatar" :src="model.avatar" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="Banner">
						<el-upload
							class="avatar-uploader"
							:action="$http.defaults.baseURL + '/upload'"
							:headers="getAuthHeaders()"
							:show-file-list="false"
							:on-success="res => $set(model,'banner',res.url)">
							<img v-if="model.banner" :src="model.banner" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="类型">
						<el-select v-model="model.categories" multiple>
							<el-option v-for="item of categories" :key="item._id"
							:label="item.name" :value="item._id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="original">
						<el-rate style="margin-top:0.6rem;" :max="10" show-score v-model="model.scores.difficult"></el-rate>
					</el-form-item>
					<el-form-item label="vocal">
						<el-rate style="margin-top:0.6rem;" :max="10" show-score v-model="model.scores.skills"></el-rate>
					</el-form-item>
					<el-form-item label="dance">
						<el-rate style="margin-top:0.6rem;" :max="10" show-score v-model="model.scores.attack"></el-rate>
					</el-form-item>
					<el-form-item label="rap">
						<el-rate style="margin-top:0.6rem;" :max="10" show-score v-model="model.scores.survive"></el-rate>
					</el-form-item>
					<el-form-item label="综艺节目">
						<el-select v-model="model.items2" multiple>
							<el-option v-for="item of items" :key="item._id"
							:label="item.name" :value="item._id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="杂志写真">
						<el-select v-model="model.items1" multiple>
							<el-option v-for="item of items" :key="item._id"
							:label="item.name" :value="item._id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="经历">
						<el-input type="textarea" v-model="model.usageTips"></el-input>
					</el-form-item>
					<el-form-item label="获奖">
						<el-input type="textarea" v-model="model.battleTips"></el-input>
					</el-form-item>
					<el-form-item label="评价">
						<el-input type="textarea" v-model="model.teamTips"></el-input>
					</el-form-item>
				</el-tab-pane>
				<el-tab-pane label="作品" name="skills">
					<el-button size="small" @click="model.skills.push({})">
						<i class="el-icon-plus"></i>
						添加作品
					</el-button>
					<el-row type="flex" style="flex-wrap:wrap;">
						<el-col :md="12" v-for="(item,index) in model.skills" :key="index">
							<el-form-item label="名称">
								<el-input v-model="item.name"></el-input>
							</el-form-item>
							<el-form-item label="图标">
								<el-upload
									class="avatar-uploader"
									:action="uploadUrl"
									:headers="getAuthHeaders()"
									:show-file-list="false"
									:on-success="res => $set(item, 'icon', res.url)">
									<img v-if="item.icon" :src="item.icon" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</el-form-item>
							<el-form-item label="时长">
								<el-input v-model="item.delay"></el-input>
							</el-form-item>
							<el-form-item label="销量">
								<el-input v-model="item.cost"></el-input>
							</el-form-item>
							<el-form-item label="描述">
								<el-input v-model="item.description" type="textarea"></el-input>
							</el-form-item>
							<el-form-item label="小提示">
								<el-input v-model="item.tips" type="textarea"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button size="small" type="danger" 
								@click="model.skills.splice(index,1)">删除</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="好友" name="partners">
					<el-button size="small" @click="model.partners.push({})">
						<i class="el-icon-plus"></i>
						添加人物
					</el-button>
					<el-row type="flex" style="flex-wrap:wrap;">
						<el-col :md="12" v-for="(item,index) in model.partners" :key="index">
							<el-form-item label="人物">
								<el-select filterable v-model="item.person">
									<el-option 
									v-for= "person in persons"
									:key="person._id"
									:value="person._id"
									:label="person.name">
									</el-option>
								</el-select>
							</el-form-item>
							
							<el-form-item label="描述">
								<el-input v-model="item.description" type="textarea"></el-input>
							</el-form-item>
							
							<el-form-item>
								<el-button size="small" type="danger" 
								@click="model.partners.splice(index,1)">删除</el-button>
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

<!--accept="image/*"   :action="$http.defaults.baseURL + '/upload'"-->
<script>
	export default {
		props: {
			id: {}
		},
		data() {
			return {
				categories: [],
				items:[],
				persons:[],
				model: {
					name: '',
					avatar: '',
					skills:[],
					partners:[],
					scores: {
						difficult: 0,
						skills: 0,
						attack: 0,
						survive: 0,
					},
				},
				// parents: []
			}
		},
		methods: {
			async save() {
				console.log('save');
				// let res; 
				if (this.id) {
					await this.$http.put('rest/persons/' + this.id, this.model);
					// res = await this.$http.put('categories/'+ this.id,this.model); 
				} else {
					await this.$http.post('rest/persons', this.model);
					// res = await this.$http.post('categories',this.model);
				}

				this.$router.push('/persons/list');
				this.$message({
					type: 'success',
					message: '保存成功'
				})
			},
			async fetch() {
				const res = await this.$http.get('rest/persons/' + this.id);
				this.model = Object.assign({},this.model,res.data);
			},
			async fetchCategories() {
				const res = await this.$http.get('rest/categories');
				this.categories = res.data;
			},
			async fetchItems() {
				const res = await this.$http.get('rest/items');
				this.items = res.data;
			},
			async fetchPersons() {
				const res = await this.$http.get('rest/persons');
				this.persons = res.data;
			},
		},
		created() {
			this.fetchItems();
			this.fetchCategories();
			this.fetchPersons();
			this.id && this.fetch();
		}
	}
</script>

