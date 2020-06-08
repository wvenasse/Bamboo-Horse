import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Videoes from '../views/Videoes.vue'
import Hots from '../views/Hots.vue'
import Article from '../views/Article.vue'
import Person from '../views/Person.vue'
import Video from '../views/Video.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Category from '../views/Category.vue'
import Owner from '../views/Owner.vue'
import Setting from '../views/Setting.vue'
import AllArticle from '../views/AllArticle.vue'
import AllPerson from '../views/AllPerson.vue'
import AllVideo from '../views/AllVideo.vue'
import LikeArticle from '../views/LikeArticle.vue'
import LikePerson from '../views/LikePerson.vue'
import LikeVideo from '../views/LikeVideo.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{isPublic:true},
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta:{isPublic:true}
    },
    {
      path: '/',
      name: 'main',
      component:Main,
      children:[
        {
          path:'/',
          name:'home',
          component:Home
        },
        {
          path:'/articles/:id',
          name:'article',
          component:Article,
          props:true
        },
      ]
    },
    {
      path:'/persons/:id',
      name:'person',
      component:Person,
      props:true
    },
    {
      path:'/videos/:id',
      name:'video',
      component:Video,
      props:true
    },
    {
      path:'/category',
      name:'category',
      component:Category,
    },
    {
      path:'/videoes',
      name:'videoes',
      component:Videoes,
    },
    {
      path:'/hots',
      name:'hots',
      component:Hots,
    },
    {
      path:'/allarticle',
      name:'allarticle',
      component:AllArticle
    },
    {
      path:'/allperson',
      name:'allperson',
      component:AllPerson
    },
    {
      path:'/allvideo',
      name:'allvideo',
      component:AllVideo
    },

    {
      path:'/likearticle',
      name:'likearticle',
      component:LikeArticle
    },
    {
      path:'/likeperson',
      name:'likeperson',
      component:LikePerson
    },
    {
      path:'/likevideo',
      name:'likevideo',
      component:LikeVideo
    },

    {
      path:'/owner',
      name:'owner',
      component:Owner,
    },
    {
      path:'/setting',
      name:'setting',
      component:Setting,
    },
    {
      path: '/about',
      name: 'About',
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  ]

const router = new VueRouter({
  routes
})
router.beforeEach((to,from,next) => {
	if (!to.meta.isPublic && !localStorage.token) {
		return next('/login');
	}
	next();
});
export default router




