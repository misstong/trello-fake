import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = ()=> import('../views/Home.vue')
const Register = () => import('../views/Register.vue')
const Login = () => import('../views/Login.vue')
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        
    },
    {
        path: '/register',
        name:'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL || '',
    routes
}
)

export default router;