import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginComponent from './components/LoginComponent';
import AdminComponent from './components/AdminComponent';
// const foo = {template:"<v-alert type='error'>Iam foo component</v-alert>"}
// const bar = {template:"<v-alert type='error'>Iam bar component</v-alert>"}
// const user = {template:"<v-alert type='info'>Iam bar {{$route.params.name}}</v-alert>"}
Vue.use(VueRouter)

const routes = [

{ path:'/',
   redirect:'/login',
},
{ path:'/login',
   component:LoginComponent,
   name:'Login',
},
 { path:'/admin',
   component:AdminComponent,
   name:'Admin',
   beforeEnter:(to,from,next)=>{

   	if(localStorage.getItem('token')){

        next()

   	}else{

   	   next('/login')	
   	}
      
      

   }
},

]

export default new VueRouter({routes})