import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

import user from './user'

export default new Vuex.Store({
    state: {
        server:{
            staticPath: process.env.VUE_APP_SERVER_STATIC_PATH
        }
    },
    mutations:{

    },
    actions:{

    },
    modules: {
        user
    }
})