<template>
	<view class="main">
		<u-form :model="data.formData" ref="form">
			<u-form-item label="用户" prop="name" label-position="top">
				<u-input v-model.lazy.trim="data.formData.name" placeholder="请输入姓名" :disabled="disabled = boolean">
				</u-input>
			</u-form-item>
			<u-form-item label="礼金" prop="money" label-position="top">
				<u-input v-model.lazy.trim="data.formData.money" type="number" placeholder="请输入礼金"
					:disabled="disabled = boolean">
				</u-input>
			</u-form-item>
			<u-form-item label="礼品" prop="gift" label-position="top">
				<u-input v-model.lazy.trim="data.formData.gift" placeholder="请输入礼品名称" :disabled="disabled = boolean">
				</u-input>
			</u-form-item>
			<u-form-item label="电话" prop="phone" label-position="top">
				<u-input v-model.lazy.trim="data.formData.phone" type="tel" placeholder="请输入电话"
					:disabled="disabled = boolean">
				</u-input>
			</u-form-item>
			<u-form-item label="地址" prop="address" label-position="top">
				<u-input v-model.lazy.trim="data.formData.address" placeholder="请输入地址"
					:disabled="disabled = boolean"></u-input>
			</u-form-item>
			<u-form-item label="备注" prop="remark" label-position="top">
				<u-input v-model.lazy.trim="data.formData.remark" type="textarea" placeholder="请输入备注" border
					height="100rpx" :auto-height="autoHeight" :disabled="disabled = boolean">
				</u-input>
			</u-form-item>
		</u-form>
	</view>
	<view class="s-card">
		<button type="primary" @click="submit()" class="submit">{{button}}</button>
	</view>
</template>

<script setup>
	import { reactive,ref } from 'vue';
	import { onLoad, onReady } from '@dcloudio/uni-app';
	import api from '../../common/api/resquest.js';
	import dayjs from 'dayjs';

	const now = new Date();

	const form = ref();
	const autoHeight = ref(false);
	const boolean = ref(true)
	const button = ref("修改数据")


	const data = reactive({
		formData: {
			name: '古灵',
			money: '123',
			gift: '水果',
			phone: '上大发',
			remark: '飞洒发',
			address: '发顺丰',
			createTime: '发送'
		},
		rules: {
			name: [{
				required: true,
				message: '请输入姓名',
				// 可以单个或者同时写两个触发验证方式 
				trigger: ['change', 'blur'],
			}],
			money: [{
				required: true,
				message: '请输入礼金',
				// 可以单个或者同时写两个触发验证方式 
				trigger: ['change', 'blur'],
			}],

			address: [{
				required: true,
				message: '请输入地址',
				// 可以单个或者同时写两个触发验证方式 
				trigger: ['change', 'blur'],
			}]
		},

	});


	// 监听主页传过来的参数
	onLoad((option) => {
		var item = JSON.parse(decodeURIComponent(option.obj));
		console.log("详情页" + item)
		data.formData = item
		console.log("value" + value.name)
	})

	const submit = (e) => {
		if (boolean.value == true) {
			console.log("修改数据")
			boolean.value = false
			button.value = "保存数据"
			
		} else if (button.value == "保存数据") {
			form.value.validate(valid => {
				if (valid) {
					console.log('验证通过');
					data.formData.createTime = dayjs(now).format('YYYY-MM-DD HH:mm')

					// if(data.formData != ''){
					// 	//如果数据不为提交数据给服务器
					// 	api.post("/data/formData?="+data.formData).then(()=>{
					// 		uni.showModal({
					// 			title:'提交成功'	
					// 		})
					// 	})
					// 	.catch(()=>{
					// 		uni.showModal({
					// 			title:'提交失败',
					// 			duration: 1800,
					// 			icon:'error'
					// 		})
					// 	})
					// }
					
					// 返回上一层
					uni.showToast({
						title:"修改成功",
						duration: 2000
					})
					uni.navigateBack()
				} else {
					console.log('验证失败');
				}
			});
		}

	}

	onReady(() => {
		form.value.setRules(data.rules);
	});

	//获取时间
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