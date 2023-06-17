import {
	defineStore
} from 'pinia';

export const useInterruptStore = defineStore("interruptID", {
	actions: {
		 loginInterrupt(toUrl) {
			try {
				const value = uni.getStorageSync("storage_key");
				if (value != '') {
					uni.navigateTo({
						url: toUrl
					})
				} else {
					uni.navigateTo({
						url: "/pages/me/login/login"
					})
				}
			} catch (e) {
				// error
			}
		}
	}
})