import * as api from '@/api'

export default {
    namespaced: true,
    state: {
        lists:[]    
    },
    getters:{
        getLists: ({lists}) => boardId => lists.filter(list=>list.boardId == boardId),
        getList: ({lists}) => listId => lists.find(list=>list.id===listId)
    },
    actions: {
        getLists: async ({commit}, boardId) =>{
            try {
                let res = await api.getLists(boardId)

                commit('updateLists', res.data)
                console.log('getLists',boardId,res.data)
                return res 
            }catch(e){
                console.log('')
                throw e
            }
        },
        postList: async ({commit}, data) => {
            try {
                let rs = await api.postList(data)
                commit('addList', rs)
                return rs
            } catch (e) {
                console.log('')
                throw e
            }
        },
        editList: async ({commit},data)=>{
            try {
                let rs= await api.putList(data)
                commit('updateList', data)
                return rs
            } catch (error) {
                console.log('')
                throw error
            }
        },
        test: async (_, data)=> {
            setTimeout(()=>{
                console.log('test',data)
            },0)
            
        }
    },
    mutations: {
        updateLists: (state, data)=>{
            state.lists = [...state.lists, ...data]
        },
        addList: (state, data)=>{
            state.lists = [...state.lists, data]
        },
        updateList: (state, data)=>{
            state.lists = state.lists.map(list=>{
                if (list.id === data.id) {
                    return {...list,...data}
                }
                return list
            })
        }
    }
}