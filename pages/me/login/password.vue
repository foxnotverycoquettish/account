<template>
	<view>
	<view class="login-container">
		<h2>密码登录</h2>
		<u-form class="login-form" ref="loginForm" :model="loginData">
			<u-form-item prop="phone">
				<u-input v-model="loginData.phone" placeholder="请输入手机号"></u-input>
			</u-form-item>
			<u-form-item prop="password">
				<u-input	type="password" v-model="loginData.password" placeholder="密码"></u-input>
			</u-form-item>
			<u-button style="width: 98%; margin-top: 32px;" type="primary" @click="login()">登录</u-button>
		</u-form>
	</view>	
	</view>
</template>

<script setup>
	import { ref,reactive} from 'vue';
	import api from '../../../common/api/resquest.js';
	import { useClassStore } from '../../../common/stores/className.js';
	import { usePersonalStore  } from '../../../common/stores/personal_center.js'
	import { storeToRefs } from 'pinia';
	
	
	const loginData = reactive({
		phone: '',
		password: '',
	});
	
	const classStore = useClassStore();
	const usePersonal = usePersonalStore();
	const { getPersonal } = usePersonal
	
	const login = () => {
		// 登录的逻辑
			api.post('/user/passwordLogin', loginData)
			.then((res) => {
				// 得到随机token
				uni.setStorage({
					key: 'storage_key',
					data: res.data,
					success: function() {
						console.log('success');	
					},
				});
				
				//触发获取个人信息数据
				 getPersonal()
				 
				 
				//触发获取分页数据
				classStore.getClassName()
				
				//跳转返回上一页
				uni.navigateBack()
				
			})
			.catch((error) => {
				console.error(error);
			});
	};
	

</script>

<style>
	.login-container {
		text-align: center;
		margin: 20% 7% 0px 7%;
	}
	.login-form {
		margin-top: 34px;
	}
</style>
