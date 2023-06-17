<template>
	<view>
		<u-button @click="exit()">退出</u-button>
	</view>
</template>

<script setup>
	//退出账号
	function exit() {
		console.log("点击了退出")
		try {
			uni.removeStorageSync("storage_key");
			uni.removeStorage({
				key: 'storage_key',
				success: function(res) {
					console.log('success');
					uni.redirectTo({
						url: "/pages/me/login/login"
					})
				}
			});
		} catch (e) {
			console.log("退出异常")
		}
	}
</script>

<style>

</style>