
import request from '@/utils/request'
import storage from '@/utils/storage'

export const getChannel =()=>{
    return request({
        url:'/v1_0/user/channels'
    })
}


//获取我的频道列表
export const getAllChannel =()=>{
    return request({
        url:'/v1_0/channels'
    })
}

const HEIMA_TOUTIAO_CHANNELS='HEIMA_TOUTIAO_CHANNELS'
export const getMyChannelsByLocal=()=>storage.get(HEIMA_TOUTIAO_CHANNELS)

export const setMyChannelToLocal=(channel)=>
storage.set(HEIMA_TOUTIAO_CHANNELS,channel)

//删除
export const delMyChannel=target=>{
    return request({
        url:`/v1_0/user/channels/${target}`,
        method:'delete'
    })
}

//添加频道
export const addMyChannel=(id,seq)=>{
    return request({
        url:'/v1_0/user/channels',
        method:'patch',
        data:{
            channels:[{id,seq}]
        }
    })
}
