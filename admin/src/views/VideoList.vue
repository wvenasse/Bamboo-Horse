<template>
	<div>
		<h1>视频列表</h1>
		<el-table :data="videos">
			<el-table-column prop="_id" label="ID" width="220"></el-table-column>
			<el-table-column prop="name" label="视频名称"></el-table-column>
			<el-table-column prop="vision" label="视频">
				<template slot-scope="scope">
					<video :src="scope.row.vision" style="height:3rem;"> </video>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="180">
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="$router.push('/videos/edit/'+ scope.row._id )">编辑</el-button>
					<el-button type="primary" size="small" @click="remove(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				videos: []
			}
		},
		methods: {
			async fetch() {
				const res = await this.$http.get('rest/videos');
				this.videos = res.data;
			},
			async remove(row) {
				this.$confirm('是否确定要删除该视频? "'  + row.name + '"', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					await this.$http.delete('rest/videos/' + row._id); 
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					console.log("delete");
					this.fetch();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}
		},
		created() {
			this.fetch()
		}
	}
</script>
