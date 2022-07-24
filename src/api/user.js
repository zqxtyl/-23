/**
 * 用户相关请求模块
 */
import request from "@/utils/request";
import store from "@/store";

export const login = (mobile, code) => {
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data: {
      mobile,
      code,
    },
  });
};

export const sendCode = (mobile) => {
  return request({
    method: "POST",
    url: `/v1_0/sms/codes/${mobile}`,
  });
};

export const getUserInfo = () => {
  return request({
    url: "/v1_0/user",
  });
};

/**
 * 获取用户个人资料
 */
// 获取指定用户信息
export const getUserProfile = () => {
  return request({
    method: "GET",
    url: "/v1_0/user/profile",
  });
};
/**
 * 更新昵称
 */
 export const updateUserName = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}
