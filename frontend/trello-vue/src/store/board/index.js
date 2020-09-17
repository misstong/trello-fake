import {getBoards, getBoard, addBoard } from '@/api';


export default {
    namespaced: true,

    state: {
        inited: null,

        boards: null
    },
    getters:{
        getBoard: ({boards}) => id => Array.isArray(boards)?boards.find(board=>board.id==id) :null
    },
    actions:{
        getBoards: async ({commit}) => {
            try{
                console.log('getboards....')
                let rs = await getBoards()
                console.log('after getboards')
                commit('updateBoards', rs.data)
                return rs
            } catch(e){
                console.log('')
                throw e
            }
        },

        getBoard: async ({commit}, id) =>{
            try{
                let rs= await getBoard(id);
                commit('addBoard',rs.data)
                return rs
            } catch(e){
                console.log('')
                throw e
            }
        },
        postBoard: async ({commit}, data) => {
            try{
                let rs= await addBoard(data);
                commit('addBoard',rs.data)
                return rs
            } catch(e){
                console.log('')
                throw e
            }
        }
    },
    mutations: {
        addBoard(state, data) {
            // return {
            //     ...state,
            //     boards: [
            //         ...state.boards,data
            //     ]
            // }
            if (state.boards ===null) {
                state.boards = []
            }
            state.boards = [...state.boards, data];
        },
        updateBoards(state, data) {
            state.boards = data
            state.inited = true
        }
    }
}