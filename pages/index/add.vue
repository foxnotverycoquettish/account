<template>
	<view class="main">
		<u-form :model="data.formData" ref="form" >
			<u-form-item label="用户" prop="name" label-position="top" >
				<u-input 
				v-model.lazy.trim="data.formData.name" 
				placeholder="请输入姓名"
				>
				</u-input>
			</u-form-item>
			<u-form-item label="礼金" prop="money" label-position="top">
				<u-input 
				v-model.lazy.trim="data.formData.money" 
				type="number" 
				placeholder="请输入礼金"
				>
				</u-input>
			</u-form-item>
			<u-form-item label="礼品" prop="gift" label-position="top">
				<u-input 
				v-model.lazy.trim="data.formData.gift" 
				placeholder="请输入礼品名称"
				>
				</u-input>
			</u-form-item>
			<u-form-item label="电话" prop="phone" label-position="top">
				<u-input
				 v-model.lazy.trim="data.formData.phone" 
				 type="tel" 
				 placeholder="请输入电话"
				 >
				 </u-input>
			</u-form-item>
			<u-form-item label="地址" prop="address" label-position="top">
				<u-input v-model.lazy.trim="data.formData.address" placeholder="请输入地址"></u-input>
			</u-form-item>
			<u-form-item label="备注" prop="remark" label-position="top">
				<u-input 
				v-model.lazy.trim="data.formData.remark" 
				type="textarea" 
				placeholder="请输入备注"
				border
				height="100rpx"
				:auto-height="autoHeight"
				>
				</u-input>
			</u-form-item>
		</u-form>
	</view>
	<view class="s-card">
		<button type="primary" @click="submit()" class="submit" >提交</button>
	</view>
</template>

<script setup>
	import { reactive,ref, onMounted } from 'vue';
	import { onLoad, onReady } from '@dcloudio/uni-app';
	import api from '../../common/api/resquest.js';
	import { useHomeStore } from '../../common/stores/home.js';
	
		
	const form = ref();	
	const autoHeight = ref(false);
	
	
	const data = reactive({
		formData: {
			name: '',
			money: '',
			gift: '',
			phone: '',
			remark: '',
			address: '',
			modelId: '',
			userId:''
		},
		rules: {
			name:[{
				required: true, 
				message: '请输入姓名', 
				// 可以单个或者同时写两个触发验证方式 
				trigger: ['change','blur'],
			}],
			money: [{
				required: true,
				message: '请输入礼金', 
				// 可以单个或者同时写两个触发验证方式 
				trigger: ['change','blur'],
			}],
			
			address: [{
				required: true,
				message: '请输入地址', 
				// 可以单个或者同时写两个触发验证方式 
				trigger: ['change','blur'],
			}]
		},
		
	});

	//读取home.vue传来的mid
	onLoad((option)=>{
		let mid = JSON.parse(decodeURIComponent(option.obj));
		data.formData.modelId = mid
		console.log("home传过的mid="+data.formData.modelId)
	})
	
	//读取userId
	onMounted(()=>{
		const userId = uni.getStorageSync("storage_id")
		if(userId != ''){
			data.formData.userId = userId
		}
	})
	
	
	//提交数据
	const homeStore = useHomeStore();
	const { getTableData } = homeStore;
	const submit = (e) => {
			form.value.validate(valid => {
				if (valid) {
					console.log('验证通过');
					if(data.formData != ''){
						//如果数据不为提交数据给服务器
						api.post("/data/addPeople",data.formData).then(()=>{
							uni.showModal({
								title:'提交成功'	
							})
							//跳转返回上一页
							uni.navigateBack()
							
						})
						.catch(()=>{
							uni.showModal({
								title:'提交失败',
								duration: 1800,
								icon:'error'
							})
						})
					}
				} else {
					console.log('验证失败');
				}
			});
		}
	
	onReady(() => {
			 form.value.setRules(data.rules);
		});
		
	
</script>

<style>
	.main {
		margin: 3% 3% 0px 3%;
		 
	}
	
	.s-card {
		width: 100%;
		height: 60px;
		position: fixed;
		z-index: 9999;
		bottom: 0%;
		padding-top: 7px;
		box-shadow: 15px 0px 0px rgba(0, 0, 0, 0.3);
		background-color: white;
	}
	
	.submit {
		width: 87%;
		height: 80%;
	}
	
</style>
