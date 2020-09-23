import * as api from '@/api'

export default {
    namespaced: true,

    state: {
        cards: []
    },

    getters: {
        getCard: ({cards}) => cardId => cards.find(card=>card.id===cardId),
        getCards: ({cards}) => boardListId => cards.filter( card => card.boardListId == boardListId ),
    },
    mutations: {
        updateCards: (state, data) =>{
            state.cards = [...state.cards, ...data]
        },
        addCard: (state, data) => {
            state.cards = [...state.cards, ...data]
        },
        updateCard: (state, data) => {
            state.cards = state.cards.map(card=>{
                if(card.id === data.id) {
                    return {...card,...data}
                }
                return card
            })
        },
        addAttachment: (state, data) => {
            state.cards = state.cards.map(card=>
                {
                    if(card.id===data.boardListCardId) {
                        return {
                            ...card,
                            attachments: [...card.attachments, data]
                        }
                    }
                    return card
                })
        },
        removeAttachment: (state, data) => {
            state.cards= state.cards.map(card=>{
                if (card.id === data.cardId) {
                    return {
                        ...card,
                        attachments: card.attachments.filter(i=> i.id!=data.id)
                    }
                
                }
                return card
            })
        },
        setCover: (state, data) => {
            state.cards = state.cards.map(card=>{
                if (card.id===data.cardId){
                    return {
                        ...card,
                        attachments: card.attachments.map(attachment => {
                            return {
                                ...attachment,
                                isCover: attachment.id == data.id
                            }
                        })
                    }
                }
                return card
            })
        },
        removeCover: (state, data) => {
            state.cards = state.cards.map( card => {
                if (card.id == data.cardId) {
                    return {
                        ...card,
                        attachments: card.attachments.map( attachment => {
                            return {
                                ...attachment,
                                isCover: false
                            }
                        } )
                    }
                }
                return card;
            } );
        }
    },
    actions: {
        getCards: async ({commit}, boardListId) => {
            try {
                let rs = await api.getCards(boardListId)
                commit('updateCards',rs.data)
            } catch (error) {
                console.log('')
                throw error
            }
        },
        postCard: async ({commit}, data) => {
            try {
                let rs = await api.postCard(data)
                commit('addCard', rs.data)
            } catch (error) {
                console.log('')
                throw error
            }
        },

        editCard: async ({commit}, data) => {
            try {
                let rs = await api.putCard(data)
                commit('updateCard', rs.data)
                return rs
            } catch (error) {
                console.log('')
                throw error
            }
        },
        
        uploadAttachment: async ({commit}, data) => {
            try {
                let rs = await api.uploadAttachment(data)
                commit('addAttachment', rs.data)
                return rs
            } catch (error) {
                console.log('')
                throw error
            }
        },

        removeAttachment: async ({commit}, data)  => {
            try {
                let rs = await api.removeAttachment(data);

                commit('removeAttachment', data);

                return rs;
            } catch (e) {
                console.log('')
                throw e;
            }
        },

        setCover: async ({commit}, data) => {
            try {
                let rs = await api.setCover(data);

                commit('setCover', data);

                return rs;
            } catch (e) {
                console.log('')
                throw e;
            }
        },
        removeCover: async ({commit}, data) => {
            try {
                let rs = await api.removeCover(data);

                commit('removeCover', data);

                return rs;
            } catch (e) {
                console.log('')
                throw e;
            }
        }
    }
}