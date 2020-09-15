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

            
        }
    }
}