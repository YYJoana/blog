import request from "@/utils/request";

export function submitComment(data) {
  return request({
    url: "/api/message",
    method: "post",
    data,
  });
}

export function getComment(page = 1, limit = 10) {
  return request({
    url: "/api/message",
    method: "get",
    params: {
      page,
      limit,
    },
  });
}

export function delComment(id) {
  return request({
    url: `/api/message/${id}`,
    method: "delete",
  });
}
