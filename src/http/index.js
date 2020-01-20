/**axios封装
 */
import axios from "axios";
import QS from "qs";
import cookie from "../utils/cookie";
import router from "../router";
import { Indicator, Toast } from 'mint-ui';
const { VUE_APP_URL } = process.env;
// 环境的切换
if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = VUE_APP_URL;
} else if (process.env.NODE_ENV === "debug") {
  axios.defaults.baseURL = VUE_APP_URL;
} else if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = VUE_APP_URL;
}

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
// axios.defaults.withCredentials = true;
// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // const token = store.state.token;
    // token && (config.headers.Authorization = token);
      Indicator.open();
      return config;
  },
  error => {
    return Promise.error(error);
  }
);

// 响应拦截器
axios.interceptors.response.use( 
  response => {
    Indicator.close();
    if (response.status === 200) {
      if (response.data) {
        switch (response.data.error_code) {
          case 100001:
            // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
            router.replace({
              path: 'login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
            break;
          case 100002:
            // 结果页
            router.replace({
              path: '/result',
            });
            break;
        }
      }
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  error => {
    this.$toast(error.error_reason);
    return Promise.reject(error.response_data);
  }
);

//格式化请求参数
const getParams = params => {
  let uId = localStorage.getItem('uId');
  if(uId){
    params.user_id = uId;
  }
  return params;
};
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params ? getParams(params) : {}
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, QS.stringify(params ? getParams(params) : {}))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
