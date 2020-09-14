import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = ()=> import('../views/Home.vue')
const Register = () => import('../views/Register.vue')

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
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL || '',
    routes
}
)

export default router;