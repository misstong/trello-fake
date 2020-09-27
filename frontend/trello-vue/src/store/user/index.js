import { login, register } from "../../api"


export default {
    namespaced: true,
    state: {
        info: null
    },
    mutations: {
        updateUserInfo: (state, data) =>{
            state.info = data;
            localStorage.setItem('user',JSON.stringify(data))
        },
        initUserInfo: state=>{
            try {
                let data = JSON.parse(localStorage.getItem('user'))
                state.info = data
            } catch (error) {
                console.log(error)
            }
        },
        removeUserInfo: (state) => {
            state.info = null;
            localStorage.removeItem('user');
        }
    },
    actions: {
        register: async (_ , data) => {
            return register(data)
        },
        login: async ({commit},data) => {
            try {
                let ret = await login(data)
                commit('updateUserInfo', {
                    id: ret.data.id,
                    name: ret.data.name,
                    authorization: ret.headers.authorization
                })
                return ret
            } catch(e) { console.log('');throw e}

            
        },
        logout: async ({commit}) => {
            commit('removeUserInfo');
        }
    }
}