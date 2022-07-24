import request from "@/utils/request";

//获取新闻详情
export const getArticles = (articleId) => {
  return request({
    url: `/v1_0/articles/${articleId}`,
    method: "GET",
  });
};
//关注
export const getUser = (target) => {
  return request({
    method: 'POST',
    url:`/v1_0/user/followings`,
    data:{
      target
    }
  })
};
//取消
export const getNoUser = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
};

//收藏
export const getShou = (target) => {
  return request({
    url: "/v1_0/article/collections",
    method: "post",
    data: {
      target,
    },
  });
};
//取消收藏
export const deleteShou=target=>{
    return request({
        url:`/v1_0/article/collections/${target}`,
        method:'delete'
    })
}
//点赞
export const Like=target=>{
  return request({
    url:'/v1_0/article/likings',
    method:'post',
    data:{
      target
    }
  })
}
//取消点赞
export const deleteLike=target=>{
  return request({
    url:`/v1_0/article/likings/${target}`,
    method:'delete'
  })
}
//发布
export const addPublish=data=>{
  return request({
    url:'/v1_0/comments',
    method:'post',
    data
  })
}
