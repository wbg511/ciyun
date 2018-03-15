import { Toast } from 'antd-mobile';
import axios from 'axios'
import qs from 'qs'
axios.defaults.timeout = 30000;//30秒处理火箭蛙返回很慢
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://devinspection.love-health.com.cn/portal/insp/';///portal/insp/ http://devinspection.love-health.com.cn/portal/insp/

// http request 拦截器
axios.interceptors.request.use((config) => {
  Toast.loading('', 0, '', true)
  return config;
}, (error) => {
  Toast.fail('接口故障,稍后再试！', 3, '', true)
  return Promise.reject(error);
});

//http response 拦截器
axios.interceptors.response.use((res) => {
  Toast.hide();
  return res;
}, (error) => {
  console.log(error);
  if (error.response) {
    Toast.fail('网络异常，请稍后重试！', 3, '', true)
    switch (error.response.status) {
      case 500:
        console.log("502处理")
      case 404:
        console.log("404处理")
    }
  } else {
    Toast.fail('网络异常，请稍后重试！', 3, '', true)
    return false;
  }
  return Promise.reject(error);
});

export default axios;
