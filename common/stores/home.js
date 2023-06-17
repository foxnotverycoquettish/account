import{ defineStore} from 'pinia';
import api from '../api/resquest.js'

export const useHomeStore = defineStore('HomeId', {
	state: () => ({
		tableDataStore: [],
	}),

	getters: {
		totalMoney(state) {
			return state.tableDataStore.reduce((prev, curr) => prev + curr.money, 0);
		},
		totalPerson(state) {
			return state.tableDataStore.length;
		},
	},
	
	
	

	actions: {
		async getTableData(option) {
			try {
				const res = await api.get("data/show?modelId=" + option);
				this.tableDataStore = res.data
				console.log("useHomeStore的数1=" + res.data)

			} catch (e) {
				//TODO handle the exception
			}
		}

	}
})