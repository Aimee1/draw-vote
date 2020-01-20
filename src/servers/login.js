import { post } from "../http";

const Login = "/api/vote/login";

const apis = {
  // 获取用户信息
  login(params) {
    return post(Login,params);
  }
};
export default apis;
