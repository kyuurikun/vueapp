import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import actions from './actions';
import mutations from './mutations';

export const store= new Vuex.Store({
	state:{
		goodsList:localStorage["goodsList"]?JSON.parse(localStorage["goodsList"]): []  
	},
	getters:{
		sum:state=>{
			var total=0;
            state.goodsList.forEach((item)=>{
                if(item.select){
                    total+=item.price*item.number
                }             
            })
            return total
		},
		goddsNumber:state=>{
			return state.goodsList.length
		}
	},
	modules:{
		mutations
	},
	actions
})