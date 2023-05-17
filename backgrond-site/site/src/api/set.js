import request from "@/utils/request";

export function modyfySeting(data) {
  return request({
    url: "/api/setting",
    method: "put",
    data,
  });
}

export function getSeting() {
  return request({
    url: "/api/setting",
    method: "get",
  });
}
