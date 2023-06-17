<template>
	<view class="main">
		<view class="search-body" v-if="isShow">
			<!-- 搜索历史 -->
			<view class="word-container">
				<view class="word-container_header">
					<text class="word-container_header-text">搜索历史</text>
					<u-icon name="trash"></u-icon>
				</view>
				<view class="word-container_center">
					<view class="word-container_center-main" v-for="i in 8">
						<text class="word-container_header-text">王二</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 搜索类容 -->
		<view class="search-container" v-if="isShowContainer">
			<view class="word-container_body">
				<view v-for="(value, index) in tableData" :key="index">
					<view class="a-card" @click="toDetail(index)">
						<view class="a-card-top">
							<h3 style="padding-left: 3%;">{{value.name}}</h3>
							<text>{{value.createTime}}</text>
						</view>
						<u-line color="info" margin="8px 0px 15px 0px" border-style="dashed" />

						<view>
							<view class="card-money">
								<text>礼金</text>
								<view class="number">
									<h3>
										<u-icon name="rmb" size="34" />
										{{value.money}}
									</h3>
								</view>
							</view>

							<view style="margin-bottom: 6px;">
								<text style="margin-right: 5%;">礼品</text>
								<text>{{value.gift}}</text>
							</view>

							<view>
								<text style="margin-right: 5%;">电话</text>
								<text>{{value.phone}}</text>
							</view>

							<u-line color="info" margin="8px 0px 8px 0px" />
							<view>
								<text style="margin-right: 5%;">地址</text>
								<text class="out-of-range">{{value.address}}</text>
								<span style="position:absolute; right: 7%;">
									<u-icon name="arrow-right"></u-icon>
								</span>

							</view>

							<u-line color="info" margin="5px 0px 5px 0px" />
							<view>
								<text style="margin-right: 5%;">备注</text>
								<text class="out-of-range">{{value.remark}}</text>
								<span style="position:absolute; right: 7%;">
									<u-icon name="arrow-right"></u-icon>
								</span>
							</view>
						</view>
					</view>
				</view>
			</view>
			<text>正在加载......</text>
		</view>
		
	</view>
</template>

<script setup>
	import { reactive,ref } from "vue"
	import {onNavigationBarSearchInputChanged,onNavigationBarSearchInputConfirmed } from '@dcloudio/uni-app';
	import api from '../../../common/api/resquest.js'
		
	
	
		
		
	

	const isShow = ref(true)
	const isShowContainer = ref(false)
	const tableData = ref()
	// const tableData = ref(
	// 	[{
	// 			name: "古灵",
	// 			money: 300,
	// 			createTime: "2020-3-24 22:00",
	// 			gift: "苹果",
	// 			phone: "13272802504",
	// 			address: "北京市中关村桃园大道1000号 A栋318",
	// 			remark: '上海北京小张经常来玩的'
	// 		},

	// 		{
	// 			name: "古灵",
	// 			money: 300,
	// 			time: "2020-3-24 22:00",
	// 			gift: "苹果",
	// 			phone: "13272802504",
	// 			address: "北京市中关村桃园大道1000号 A栋318",
	// 			remark: '上海北京小张经常来玩的'
	// 		},

	// 		{
	// 			name: "古灵",
	// 			money: 300,
	// 			time: "2020-3-24 22:00",
	// 			gift: "苹果",
	// 			phone: "13272802504",
	// 			address: "北京市中关村桃园大道1000号 A栋318",
	// 			remark: '上海北京小张经常来玩的'
	// 		},

	// 		{
	// 			name: "古二",
	// 			money: 300,
	// 			time: "2020-3-24 22:00",
	// 			gift: "苹果",
	// 			phone: "13272802504",
	// 			address: "北京市中关村桃园大道1000号 A栋318",
	// 			remark: '上海北京小张经常来玩的'
	// 		},

	// 		{
	// 			name: "古三",
	// 			money: 300,
	// 			time: "2020-3-24 22:00",
	// 			gift: "苹果",
	// 			phone: "13272802504",
	// 			address: "北京市中关村桃园大道1000号 A栋318",
	// 			remark: '上海北京小张经常来玩的'
	// 		}
	// 	]
	// )


	// 监听搜索框类容
	onNavigationBarSearchInputChanged((e) => {
		if (e.text != "") {
			isShow.value = false
			isShowContainer.value = true
			
		} else {
			isShow.value = true
			isShowContainer.value = false
		}
	})

	//确认监听类容
	const userId = uni.getStorageSync("storage_id")
	onNavigationBarSearchInputConfirmed( async(e) => {
		console.log("搜索事件" + e.text)
		if(e.text !=""){
			try{
				const res = await api.get("/data/search?text="+e.text.trim()+"&userId="+userId)
				tableData.value = res.data
				console.log("搜索值="+res.data)
			}catch(e){
				//TODO handle the exception
				console.log("请求异常")
			}
			
		}
	})
</script>

<style>
	.main {
		margin: 3% 3% 0px 3%;
	}

	.search-body {
		height: 140px;
	/* 	background-color: aqua; */
	box-shadow: 0 0px 2px rgba(0, 0, 0, 0.2);
	border-radius: 12px;

		overflow: hidden;
	}

	.word-container {
		height: 30px;
		/* background-color: aqua; */
	}

	.word-container_header {
		display: flex;
		height: 30px;
		padding: 3px;
		font-size: 18px;
		justify-content: space-between;
	}

	.word-container_center-main {
		height: auto;
		width: auto;
		display: inline-block;
		margin: 5px;
		box-shadow: 0 0px 2px rgba(0, 0, 0, 0.2);
		border-radius: 12px;
		padding: 7px;
	}


	/* 搜索体 */
	.search-container {
		display: flex;
		margin: 5%;
		justify-content: space-around;
		flex-flow: row wrap;
	}

	.a-card {
		width: 340px;
		height: 266px;
		display: flex;
		margin-bottom: 10px;
		margin-top: 10px;
		flex-direction: column;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		border-radius: 8px;
		overflow: hidden;
		padding: 5% 3% 2% 3%;
	}

	.a-card-top {
		display: flex;
		justify-content: space-between;
	}

	.card-money {
		text-align: center;
		margin-bottom: 32px;
	}

	.number {
		margin: 2%;
	}

	.out-of-range {
		display: inline-block;
		width: 250px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>