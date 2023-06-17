// 该文件为request.js

import axios from 'axios';
import axiosAdapterUniapp from 'axios-adapter-uniapp'


// 创建一个自定义的 Axios 实例
const instance = axios.create({
	baseURL: 'http://localhost:8089/account/api', // 设置基础URL
	
	timeout: 5000, // 设置请求超时时间
	crossDomain: true, //允许跨域
	adapter: axiosAdapterUniapp, //配置适配器 adapter: axiosAdapterUniapp,
	headers: {
		Authorization: "Bearer [token]", // 设置默认请求头
	},
});

// 添加请求拦截器
instance.interceptors.request.use(
	(config) => {
		// 在发送请求之前做一些处理，例如添加认证信息或修改请求数据
		const value = uni.getStorageSync("storage_key");
		config.headers['Authorization'] = value;
		return config;
	},
	(error) => {
		// 处理请求错误
		return Promise.reject(error);
	}
);

// 添加响应拦截器
instance.interceptors.response.use(
	(response) => {
		// 在接收到响应数据之前做一些处理
		return response.data;
	},
	(error) => {
		// 处理响应错误
		return Promise.reject(error);
	}
);

export default instance;
