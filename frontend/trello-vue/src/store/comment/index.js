import * as api from '@/api'

export default {
    namespaced: true,

    state: {

    },
    actions: {
        getComments: async (_, params) => {

            return api.getComments(params);

        },

        postComment: async (_, data) => {
            return api.postComment(data);
        }

    }
}