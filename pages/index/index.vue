<template>
	<view class="main-top">
		<!-- 搜索 -->
		<view>
			<u-button style="height: 30px;" @click="toSearch()">
				<u-icon name="search" color="#2979ff" size="28"></u-icon>
				搜索
			</u-button>

			<!-- 标题 -->
			<u-form-item style="padding-left: 3%;">
				<h3>账本</h3>
			</u-form-item>
		</view>

		<!-- 主页类容 -->
		<view class="main-center">
			<!-- 记账本个数 -->
			<view class="u-card" v-for="(value, index) in book" :key="index">
				<view @click="gotoHome(index)">
					<view class="card" @longpress="onLongPress(index,value.mid)" @click="getTableData(value.mid)">
						<!-- 编写卡片类容 -->
						<h4>{{value.className}}</h4>
						<view class="card-content">
							<text style="margin: 4px;">人数:</text>
							<text>{{totalMoney}}</text>
						</view>

						<view class="card-content">
							<text style="margin: 4px;">金额:</text>
							<text>{{totalPerson}}</text>
						</view>
					</view>
					<text class="text">{{value.createTime}}</text>
				</view>
			</view>

			<!-- 添加账本 -->
			<view class="u-card" @click="createBook()">
				<view class="card">
					<u-icon name="plus-circle" size="28"></u-icon>

				</view>
				<text>新建账本.....</text>
			</view>
		</view>

		<u-divider style="margin-top: 7%;">没有更多了</u-divider>

	</view>
</template>

<script setup>
	import {pullRefreshProps} from 'vant';
	import {ref, watch, onMounted,computed } from 'vue';
	import { useClassStore } from '../../common/stores/className.js'
	import { storeToRefs } from 'pinia';
	import { onPullDownRefresh } from '@dcloudio/uni-app';
	import { useHomeStore } from '../../common/stores/home.js';
	import api from '../../common/api/resquest.js';



	//结构useHomeStore
	const homeStore = useHomeStore();
	const { getTableData } = homeStore;

	//获取账本个数
	const classStore = useClassStore();
	const { bookStore } = storeToRefs(classStore)
	const {	getClassName } = classStore;
	const book = ref(bookStore);
	const books = ref([])



	// 使用 Pinia 的计算 getters 来计算总金额和总人数
	// const totalMoney = computed(() => homeStore.totalMoney);
	// const totalPerson = computed(() => homeStore.totalPerson);



	//登录进5秒之后弹出去往登录界面
	const token = uni.getStorageSync("storage_key");
	onMounted(() => {
		if (token == '') {
			setTimeout(() => {
				uni.showModal({
					title: "登录",
					content: "欢迎回来我们一起去登录吧",
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: "/pages/me/login/login"
							})
						} else if (res.cancel) {
							return;
						}
					}
				})
			}, 1500)
		} else {
			return;
		}
	})




	// 长按删除
	function onLongPress(index, mid) {
		uni.showModal({
			title: '删除',
			content: '你确定要删除这个账本吗',
			success: function(res) {
				if (res.confirm) {
					//向服务器发送删除请求
					console.log("账本id=" + mid)
					api.get("/data/deleteBook?mid=" + mid).then(() => {
						book.value.splice(index, 1)
					})

				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		})
	}





	//创建账本
	const userId = uni.getStorageSync("storage_id")

	function createBook() {
		uni.showModal({
			title: '请备注账本名字',
			editable: true,
			placeholderText: '请输入',
			success: function(res) {
				if (res.confirm) {
					if (res.content !== '') {
						console.log(res.content);
						// # 线上创建账本接口
						console.log("用户id=" + userId)
						api.get("data/newBook?note=" + res.content + "&userId=" + userId).then(() => {
							//刷新数据
							getClassName();
						}).catch(() => {
							uni.showToast({
								title: "修改失败,请重试",
								duration: 2000,
								icon: 'error'
							})
						})

						// 本地创建账本接口
						// book.value.push([])
					} else {
						uni.showToast({
							title: '账本名字不能为空',
							duration: 1800,
							icon: 'error'
						})
					}
				} else if (res.cancel) {
					console.log('用户点击了取消')
					return;
				}
			}
		})
	}


	//进入home界面
	function gotoHome(index) {
		uni.navigateTo({
			url: "/pages/index/home?obj=" + encodeURIComponent(JSON.stringify(book.value[index]))
		});
	}

	//跳转到搜索界面
	function toSearch() {
		console.log("搜索")
		uni.navigateTo({
			url: "/pages/index/search/search?",
		});
	}

	//下拉刷新
	onPullDownRefresh(() => {
		console.log('refresh');

		//触发分页数据
		getClassName();

		//停止刷新
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	})
</script>

<style>
	.main-top {
		margin: 3% 3% 0px 3%;
	}

	.main-center {
		display: flex;
		width: 90%;
		margin-top: 5%;
		margin-left: 10px;
		margin-right: 10px;
		justify-content: space-between;
		text-align: center;
		flex-flow: row wrap;
	}

	.u-card {
		margin: 3%;
	}

	.card {
		width: 132px;
		height: 145px;
		display: flex;
		margin-bottom: 5px;
		flex-direction: column;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		border-radius: 8px;
		overflow: hidden;
		padding-top: 11%;
	}

	.text {
		padding-top: 3px;
		font-size: 10px;
		color: rgb(70, 68, 68);
	}

	.card-content {
		margin: 5px;
	}
</style>