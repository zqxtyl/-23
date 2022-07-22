import request from "@/utils/request";

//搜索建议
export const getSearchSuggestion = (q) => {
  return request({
    method: "GET",
    url: "/v1_0/suggestion",
    params: {
      q,
    },
  });
};

//搜索结果
export const getSearchRusult = params => {
  return request({
    url: "/v1_0/search",
    method:'get',
    params
  });
};
