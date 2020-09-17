import axios from 'axios';
import TMessage from '@/components/TMessage/TMessage.js'

axios.defaults.baseURL = process.env.VUE_APP_SERVER_API_PATH;

axios.interceptors.request.use(configs=>{
    try{
        let data = JSON.parse(localStorage.getItem('user'))

        if (data.authorization) {
            configs.headers.common.authorization = data.authorization
        }
    }catch(e) {console.log()}
    return configs
})

axios.interceptors.response.use(response=>{
    return response
},error=>{
    console.log(error)
    let {message, errorDetails} = error.response.data;
    if (errorDetails){
        message = message + ' : ' + errorDetails
    }
    TMessage.error(message)
    throw error
})

export const login = (data) => {
    return axios({
        method:'post',
        url: '/user/login',
        data
    })
}

export const register = (data) => {
    return axios({
        method: 'post',
        url: '/user/register',
        data
    })
} 

export const addBoard = (data) => {
    return axios({
        method:'post',
        url:'/board',
        data
    })
}

export const getBoards = () => {
    return axios({
        url:'/board'
    })
}

export const getBoard = (id) => {
    return axios({
        url: '/board/'+id
    })
}


// export const updateBoard = ()
export const getLists = (boardId) => {
    return axios({
        url:'/list',
        params: {
            boardId
        }
    })
}

export const postList = (data) => {
    return axios({
        url:'/list',
        method:'post',
        data
    })
}

export const putList = (data) => {
    return axios({
        method:'put',
        url:'/list/'+data.id,
        data: {
            boardId: data.boardId,
            name: data.name,
            order: data.order
        }
    })
}

export const getCards = (boardListId) => {
    return axios({
        url:'/card',
        params:{
            boardListId
        }
    })
}

export const postCard = (data) => {
    return axios({
        method:'post',
        url:'/card',
        data
    })
}

export const putCard = data => {
    return axios({
        method: 'put',
        url: '/card/' + data.id,
        data: {
            boardListId: data.boardListId,
            name: data.name,
            description: data.description,
            order: data.order
        }
    })
};

export const uploadAttachment = (data) => {
    let fd = new FormData();
    fd.append('boardListCardId', data.boardListCardId)
    fd.append('attachment', data.file)

    return axios({
        method:'post',
        url:'/card/attachment',
        data: fd
    })
}

export const removeAttachment = data =>{
    return axios({
        url:'/card/attachment/'+data.id,
        method:'delete'
    })
}

export const setCover = data => {
    return axios({
        method:'put',
        url:'/card/attachment/cover/'+data.id
    })
}

export const removeCover = data => {
    return axios({
        method:'delete',
        url:'/card/attachment/cover/'+data.id
    })
}

export const getComments = params => {
    return axios({
        url:'/comment',
        params
    })
}

export const postComment = data => {
    return axios({
        url:'/comment',
        method:'post',
        data
    })
}