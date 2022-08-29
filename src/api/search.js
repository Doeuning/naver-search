import { instance } from "./index";

function getSearch(params) {
  return instance.get(`/blog?`, { params: params });
}
export { getSearch };
