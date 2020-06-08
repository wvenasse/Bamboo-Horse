import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import PersonEdit from '../views/PersonEdit.vue'
import PersonList from '../views/PersonList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

import VideoEdit from '../views/VideoEdit.vue'
import VideoList from '../views/VideoList.vue'

Vue.use(VueRouter)


const routes = [
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta:{isPublic:true}
	},
	{
		path: '/',
		name: 'main',
		component: Main,
		children: [{
			path: '/categories/create',
			component: CategoryEdit
		},{
			path: '/categories/edit/:id',
			component: CategoryEdit,
			props: true
		},{
			path: '/categories/list',
			component: CategoryList
		},
		
		{
			path: '/items/create',
			component: ItemEdit
		},{
			path: '/items/edit/:id',
			component: ItemEdit,
			props: true
		},{
			path: '/items/list',
			component: ItemList
		},
		
		{
			path: '/persons/create',
			component: PersonEdit
		},{
			path: '/persons/edit/:id',
			component: PersonEdit,
			props: true
		},{
			path: '/persons/list',
			component: PersonList
		},
		
		{
			path: '/articles/create',
			component: ArticleEdit
		},{
			path: '/articles/edit/:id',
			component: ArticleEdit,
			props: true
		},{
			path: '/articles/list',
			component: ArticleList
		},
		
		{
			path: '/ads/create',
			component: AdEdit
		},{
			path: '/ads/edit/:id',
			component: AdEdit,
			props: true
		},{
			path: '/ads/list',
			component: AdList
		},

		{
			path: '/admin_users/create',
			component: AdminUserEdit
		},{
			path: '/admin_users/edit/:id',
			component: AdminUserEdit,
			props: true
		},{
			path: '/admin_users/list',
			component: AdminUserList
		},

		{
			path: '/videos/create',
			component: VideoEdit
		},{
			path: '/videos/edit/:id',
			component: VideoEdit,
			props: true
		},{
			path: '/videos/list',
			component: VideoList
		}]
	}]

const router = new VueRouter({
	routes
})

router.beforeEach((to,from,next) => {
	if (!to.meta.isPublic && !localStorage.token) {
		return next('/login');
	}
	next();
})


export default router
