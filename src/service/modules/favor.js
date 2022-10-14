import PRequest from "../request";

export function getFavorList() {
  return PRequest.get({
    url: "/favor/list",
  });
}
export function getHistoryList() {
  return PRequest.get({
    url: "/favor/history",
  });
}
