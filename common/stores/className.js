
import { defineStore } from 'pinia'
import api from '../api/resquest.js'
import { ref } from 'vue'
export const useClassStore = defineStore("classID",{
	state: () =>({	
			bookStore:[]
	}),
	
	actions:{
			async getClassName(){
				try{
					const userId = uni.getStorageSync("storage_id")
					console.log("getClassName的uid="+userId)
					const response = await api.get("/data/className?userId="+userId);
					this.bookStore = response.data;
					console.log("分页数据=" + response.data);
					console.log("book数据=" + this.bookStore);
				} catch(error){
					console.error(error);
				}
			}
		}
	
}) 




