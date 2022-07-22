
import request from '@/utils/request'


//获取新闻详情
export const getArticles =articleId=>{
    return request({
        url:`/v1_0/articles/${articleId}`,
        method:'GET'
    })
}