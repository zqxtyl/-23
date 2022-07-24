import request from '@/utils/request'

export const getCommont=params=>{
    return request({
        url:'/v1_0/comments',
        params
    })
}