import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = ()=> import('../views/Home.vue')
const Register = () => import('../views/Register.vue')
const Login = () => import('../views/Login.vue')
const Board = () => import('../views/Board.vue')
const Card = () => import('../views/Card.vue')
const NotFound = () => import('../views/NotFound.vue')
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
    },
    {
        path: '/board/:id(\\d+)',
        name: 'Board',
        component: Board,
        children: [
            {
                path: 'list/:listId(\\d+)/card/:cardId(\\d+)',
                name: 'Card',
                component: Card
            }
            
        ]
    },
    {
        path: '*',
        name:'NotFound',
        component: NotFound
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL || '',
    routes
}
)

export default router;