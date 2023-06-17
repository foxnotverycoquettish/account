<template>
	<view>
		<view class="login-container">
			<h2>登录</h2>
			<u-form class="login-form" ref="loginForm" :model="loginData.loginValue"  :error-type="errorType">
				<u-form-item prop="phone">
					<u-input v-model="loginData.loginValue.phone" placeholder="请输入手机号"></u-input>
				</u-form-item>
				<u-form-item prop="code" v-show="showCode">
					<u-input v-model="loginData.loginValue.code" placeholder="请输入验证码"></u-input>
					<u-button class="send-code" :disabled="isCountingDown" @click="sendVerificationCode()">
						{{ countDownText }}
					</u-button>
				</u-form-item>
				<u-form-item prop="password" v-show="showPassword">
					<u-input type="password" v-model="loginData.loginValue.password" placeholder="密码"></u-input>
				</u-form-item>
				<u-button style="width: 98%; margin-top: 32px;" type="primary" @click="login()">登录</u-button>
			</u-form>
			<text v-show="showCode">未注册的手机号验证过后将自动注册</text>

			<u-button class="password" @click="changeLogin">{{change}}</u-button>
		</view>
	</view>
</template>

<script setup>
	import { ref,reactive} from 'vue';
	import api from '../../../common/api/resquest.js';
	import { useClassStore } from '../../../common/stores/className.js';
	import { usePersonalStore  } from '../../../common/stores/personal_center.js'
	import { storeToRefs } from 'pinia';
	import { onLoad, onReady } from '@dcloudio/uni-app';

	const errorType = ref(['toast','border-bottom'])
	const loginForm = ref();
	const loginData = reactive({
		loginValue: {
			phone: '',
			code: '',
			password: ''
		},
		rules: {
			phone: [{
				required: true,
				message: '手机号不能为空',
				// 可以单个或者同时写两个触发验证方式 
				trigger: ['change', 'blur']
			}]
		}
	});
	onReady(() => {
			loginForm.value.setRules(loginData.rules);
		});
	

	const change = ref('密码登录')
	const showCode = ref(true)
	const showPassword = ref(false)

	const countDownText = ref('发送验证码');
	const isCountingDown = ref(false);
	const classStore = useClassStore();

	const usePersonal = usePersonalStore();
	const { getPersonal } = usePersonal

	const sendVerificationCode = (e) => {
		loginForm.value.validate(valid => {
					if (valid) {
						if (!isCountingDown.value) {
							// 发送验证码的逻辑
							api
								.post(`/user/code?phone=${loginData.loginValue.phone}`)
								.then(() => {
									startCountDown();
								})
								.catch((error) => {
									console.error("网络异常" + error);
								});
						}
					} else {
						console.log('验证失败');
					}
				});
		
	};

	const startCountDown = () => {
		isCountingDown.value = true;
		let count = 60;
		const timer = setInterval(() => {
			count--;
			if (count > 0) {
				countDownText.value = `${count}秒后重发`;
			} else {
				clearInterval(timer);
				isCountingDown.value = false;
				countDownText.value = '发送验证码';
			}
		}, 1000);
	};

	const login = () => {
		// 登录的逻辑
		api.post('/user/login', loginData.loginValue)
			.then((res) => {
				if (res.success == true) {
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
				} else {
					uni.showToast({
						title: res.errorMsg,
						duration: 1800,
						icon: 'error'
					});
				}


			})
			.catch((error) => {
				console.error(error);
			});
	};

	// 账号登录
	const register = () => {
		uni.navigateTo({
			url: '/pages/me/login/register',
		});
	};

	//去掉原生导航栏
	// uni.hideBackHome

	//密码登录
	const changeLogin = () => {
		if (showCode.value == true) {
			showCode.value = false
			showPassword.value = true
			change.value = '验证码登录'
		} else {
			showCode.value = true
			showPassword.value = false
			change.value = '密码登录'
		}

	}
	
	
</script>

<style>
	.login-container {
		text-align: center;
		margin: 20% 7% 0px 7%;
	}

	.login-form {
		margin-top: 34px;
	}

	.password {
		width: 60%;
		margin-top: 80%;
	}
</style>