import{ defineStore} from 'pinia';
import api from '../api/resquest.js'

import { ref } from 'vue'
export const usePersonalStore = defineStore("PersonalID",{
	state: () =>({	
			personalArr:[]
	}),
	
	actions:{
			async getPersonal(){
				try{
					const response = await api.get("/user/me");
					console.log("个人信息="+response.data[0])
					this.personalArr = response.data;
					console.log("个人数据="+response.data[0].id)
					uni.setStorage({
						key: 'storage_id',
						data: response.data[0].id,
						success: function() {
							console.log('success');	
						},
					});
				} catch(error){
					console.error(error);
				}
			}
		}
	
}) 