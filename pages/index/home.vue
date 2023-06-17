<template>
	<view class="main">
		
		<view class="main-top">
			<!-- 搜索 -->
			<view>
				<u-button style="height: 30px;" @click="gotoSearch()">
					<u-icon name="search" color="#2979ff" size="28"></u-icon>
					搜索
				</u-button>

				<!-- 标题 -->
				<u-form-item style="padding-left: 3%;">

					<span style="width: 50%; ">
						<text>总金额:</text>
						<text style="margin-left: 4px; font-size: 20px;">{{totalMoney}}</text>
					</span>

					<span style="margin-left: 20%; width: 50%; ">
						<text>总人数:</text>
						<text style="margin-left: 4px; font-size: 20px;">{{totalPerson}}</text>
					</span>

				</u-form-item>
			</view>
		</view>

		<!-- 主题类容 -->
		<view class="main-center">
			<view v-for="(value, index) in tableData" :key="index">
				<view class="a-card" @longpress="onLongPress(index)" @click="toDetail(index)">
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
		<u-loadmore :status="status = statusValue.state " />
	</view>
</template>

<script setup>
	import { ref, watch,computed } from 'vue';
	import { useHomeStore } from '../../common/stores/home.js';
	import { storeToRefs } from 'pinia';
	import api from '../../common/api/resquest.js'
	import { onNavigationBarButtonTap,onTabItemTap,onInit,onReachBottom,onLoad,onPullDownRefresh,onReady} from '@dcloudio/uni-app';


	const homeStore = useHomeStore();
	const { tableDataStore } = storeToRefs(homeStore)
	const { getTableData } = homeStore;
	console.log("home主页数据=" + tableDataStore);
	const tableData = ref(tableDataStore);
	

	/**
	 * 获取总人数与金额
	 */
	 // 使用 Pinia 的计算 getters 来计算总金额和总人数
	  const totalMoney = computed(() => homeStore.totalMoney);
	  const totalPerson = computed(() => homeStore.totalPerson);
	


	//触底加载更多数据
	const statusValue = ref({
		state: 'loadmore'
	})
	onReachBottom(()=>{
		// statusValue.value.state = 'loading'
	})
		
	



	//长按删除文件
	function onLongPress(index) {
		uni.showModal({
			title: "删除",
			content: "你确定删除这个数据吗",
			success: (res) => {
				if (res.confirm) {
					if (tableData.value != '') {
						console.log("不为空的数据="+tableData.value[index].did)
						api.get("/data/deleteData?did="+tableData.value[index].did).then(()=>{
							tableData.value.splice(index, 1)
						})	
					}

				} else if (res.cancel) {
					console.log("点击了取消")
					return;
				}
			}
		})
	}


	// 导航栏处理函数
	const bookmodel = ref({
		mid:'',
		className:''
	})
	onLoad((option)=>{
		var item = JSON.parse(decodeURIComponent(option.obj));
		bookmodel.value = item
		console.log("index传过的mid="+bookmodel.value.className)
	})
	
	onNavigationBarButtonTap((e) => {
		if (e.text == "添加") {
			uni.navigateTo({
				url: "/pages/index/add?obj="+encodeURIComponent(JSON.stringify(bookmodel.value.mid))
			});
		}
	})
	
	
	//动态原生导航栏
	// 页面加载完成后执行
	 onReady(()=>{
		 uni.setNavigationBarTitle({ title:  bookmodel.value.className})
	 }) ;

	
	

	//跳转到搜索界面
	function gotoSearch() {
		console.log("搜索")
		uni.navigateTo({
			url: "/pages/index/search/search",
		});
	}

	// 跳转到详情页
	function toDetail(index) {
		uni.navigateTo({
			url: "/pages/index/detail?obj=" + encodeURIComponent(JSON.stringify(tableData.value[index]))
		});
	}
	
	//下拉刷新
	onPullDownRefresh(() => {
		console.log('refresh');
	
		//触发data数据
		getTableData(bookmodel.value.mid);
	
		//停止刷新
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	})
</script>



<style>
	.main {
		margin: 3% 3% 0px 3%;
	}
	
	
	.main-center {
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