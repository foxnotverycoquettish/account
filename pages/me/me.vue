<template>
	<view class="main">
		<!-- 账户头像 -->
		<view class="i-head" @click="login()">
			<u-avatar :src="src" size="large"></u-avatar>
			<span class="i-head-center" v-for="(value,index) in tableHeader" :key="index">
				<h3>{{ value.nickName }}</h3>
				<text>{{value.phone }}</text>
			</span>

			<span class="i-head-right">
				<text>{{ loginName }}</text>
				<u-icon name="arrow-right"></u-icon>
			</span>
		</view>

		<!-- 主页类容 -->
		<view class="content">
			<u-cell-group :border="border = false">
				<u-cell-item icon="account" title="个人信息" :arrow="true" arrow-direction="left" @click="personal()">
				</u-cell-item>

				<u-cell-item icon="account" title="账号信息" :arrow="true" arrow-direction="left">
				</u-cell-item>

				<u-cell-item icon="share-fill" title="设置家人共享" :arrow="true" arrow-direction="left">
				</u-cell-item>
			</u-cell-group>
		</view>

		<view class="content">
			<u-cell-group :border="border = false">

				<u-cell-item icon="question-circle" title="帮助与客服" :arrow="true" arrow-direction="left">
				</u-cell-item>
				
				<u-cell-item icon="setting" title="关于" :arrow="true" arrow-direction="left" ></u-cell-item>
				
				<u-cell-item icon="setting" 
				title="设置" 
				:arrow="true" 
				arrow-direction="left" 
				:border-bottom="bottom = false"
				@click="seting()"
				 >
				</u-cell-item>
			</u-cell-group>
		</view>
		
	</view>
</template>

<script setup>
	import { ref, reactive,watch,onMounted } from 'vue';
	import { usePersonalStore } from '../../common/stores/personal_center.js';
	import { storeToRefs } from 'pinia';
	import { onLoad, onReady } from '@dcloudio/uni-app';
	import { useInterruptStore } from '../../common/stores/login_interrupt.js';
	

	const loginName = ref("去登录")
	// const tableHeader = reactive({
	// 	nickName: '未登录',
	// 	phone:'15523414563',
	// })
	
	const personalStore = usePersonalStore();
	const { personalArr } = storeToRefs(personalStore);
	console.log("个人中心数据="+personalArr)
	const tableHeader = ref(personalArr);
	
	
	const interruptStore = useInterruptStore();
	const { loginInterrupt } = interruptStore;
	
	watch(tableHeader,()=>{
		if(tableHeader.value != ''){
			loginName.value = '恭喜发财'
		}
	})
	
	
	
	
	//跳转到个人信息
	// function personal() {
	// 	uni.navigateTo({
	// 		url:
	// 	})
	// }

	// 跳转到登录界面
	function login() {
		uni.navigateTo({
			url: "/pages/me/login/login"
		})
	}

	//跳转到设置界面
	function seting() {
		loginInterrupt("/pages/me/set/set")
		// uni.navigateTo({
		// 	url: "/pages/me/set/set"
		// })
	}
</script>

<style>
	.main {
		margin: 3% 3% 0px 3%;
		/* background-color: rgb(248, 248, 248); */
	}

	.i-head {
		height: 100px;
		background-color: cyan;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		border-radius: 12px;
		overflow: hidden;
		padding: 4%;

	}

	.i-head-center {
		width: 50%;
		display: inline-block;
		margin-left: 5%;
		position: relative;
		top: -14%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

	}

	.i-head-right {
		display: inline-block;
		position: relative;
		left: 7%;
		top: -20px;
		
	}

	.content {
		height: auto;
		box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
		border-radius: 20px;
		overflow: hidden;
		padding: 3%;
		margin-top: 7%;
	}
</style>