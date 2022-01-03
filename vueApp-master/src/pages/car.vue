<template>
   <div class="car-list-container">
	    <ul>
	    	<li class="car-list" v-for="(item, index) in carDatas" v-bind:key="item.id">
	    		<div class="car-list__img">
	    			<img v-lazy="item.product_img_url" alt="" class="product_skill_item_cion lazy-img-fadein">
	    		</div>
	    		<div class="car-list__detail">
	    			<p class="car-list__detail__title">{{item.product_name}}</p>
	    			<p class="car-list__detail__number">数量：<el-input-number v-model="item.num" name="num" @change="handleChange(index)" :min="1" :max="10" label="描述文字"></el-input-number></p>
	    			<p class="car-list__detail__price">单价：<span>￥{{item.product_uprice}}</span></p>
	    			<p class="car-list__detail__sum">小计：<span>￥{{item.product_uprice*item.num}}</span></p>
	    		</div>
	    		<div class="car-list__operate">
	    			<span class="iconfont icon-shanchu delete-goods" @click="del(index)"></span>
	    		</div>	   	    		
	    	</li>
	    </ul>
	    <div class="car-foot-nav">
	    	<button class="sum-price">总额：￥{{sum}}</button>
	    	<router-link :to='{name:"index"}' class="continue-shopping" tag="button">继续购物</router-link>
	    	<button class="to-pay" @click="addorders()">下单</button>
	    </div>
   </div>
</template>

<script>
export default {
    name: 'car',
    data(){
        return {      
		   carDatas: [],
		   userid:"",
		   sum:0,
        }
	},
	mounted(){
		this.getdata();
	},
   
    methods:{
        findPosition(id){
            return this.goodsList.findIndex(item=>{
                return item.id==id
             })
		},

        handleChange(index){
			let _this=this;
			let product_id = _this.carDatas[index].product_id;
			let num = _this.carDatas[index].num
			_this.$http.post('/changenum',{
				 number: num,
				 pid: product_id
			}).then((res) => {
				if (res.status == 0){
					alert('服务器出错');
				}
				else if(res.status == 20){
					end()
				}
			}),(err) => {
				console.log(err);
			}
				_this.calcSum();
		},

		getdata(){
			let _this = this;
			var userinfo = window.sessionStorage.getItem('userInfo');
            let userinFo = JSON.parse(userinfo)
			let userid = userinFo.user_id;
			console.log(userid);
			_this.$http.get('/cart',{
                params:{
					uId: userid
				}
            }).then((res) => {
				_this.carDatas = res.data;
				console.log(_this.carDatas);
			},(err)=>{
				console.log(err);
			})
		},

		del(index){
			let _this=this;
			let product_id = _this.carDatas[index].product_id;
			console.log(product_id);
			_this.$http.post('/delcart',{
				pid: product_id
			}).then((res) =>{
				if(res.status == 0){
					alert('删除失败');
				}
			})
		this.$router.go(0);
		},

		addorders(){
			let _this=this;
			var userinfo = window.sessionStorage.getItem('userInfo');
			let userinFo = JSON.parse(userinfo);
			let carDatas = _this.carDatas;
			console.log(carDatas);
			let userid = userinFo.user_id;
            let productid = carDatas[0].product_id;
			let cartid = carDatas[0].cart_id;
			let count = carDatas[0].goods_num;
			let uprice = carDatas[0].product_uprice;
			let img = carDatas[0].product_img_url;
			let name = carDatas[0].product_name;
			_this.$http.post('/addorders',{
				uid: userid,
				pid: productid,
				cid: cartid,
				ocount: count,
				pic: img,
				pname: name,
				price: uprice
			}).then((res)=>{
				if(res.data.status == 0){
					alert('下单失败');
				}else{
					alert('下单成功');
				}
			})
		this.$router.go(0);
		},
		
		calcSum:function(){
			let _this=this;
			_this.sum = 0;
			var carDatas = this.carDatas;
			_this.carDatas.forEach(item => {
				this.sum += item.product_uprice*item.num
			});
		}
	},

		
	
};
</script>

<style scoped lang="scss">
	@import '../base/css/base.scss';
   .car-list-container >ul{padding-bottom:1.11rem;}
   .car-list{
   		padding: 0.3125rem;
   		position: relative;
   		border-bottom: 0.0312rem solid #ddd;;
   		@include flex-center;
   		.car-list__img{
   			width:2rem;
	   		height: 2.8rem;
	   		img{
				width: 100%;
				height: 100%;
	   		}
   		}
   		.car-list__detail{
   			flex:1;
   			padding:0 0.35rem;
   			p{
   				@include fz(12px);
   				padding:0.0312rem 0;
   				color: #888;
   				@include t-overflow(2);
   				span{
   					color:#77b59c;
   				}
   				&.car-list__detail__title{
					padding-bottom: 0.08rem;
   				}

   				&.car-list__detail__number{
   					button{
   						width: 0.6344rem;
   						height: 0.6344rem;
   						@include fz(14px);	
   					    border: 1px solid #aaa;
   					    background: #fff;
   						color: #666;
   						text-align: center;
   						vertical-align: middle;
   						&.number--decrease{

   						}
   					}
   					input{
   						border: 1px solid #aaa;
   						border-left: none;
   						border-right: none;
   						box-sizing: border-box;
   						width:1rem;
   						height: 0.6344rem;
   						text-align: center;
   						vertical-align: middle;
   						color: #666;

   					}
   				}
   			}
   		}
   		.car-list__operate{
   			width:0.5rem;
   			.delete-goods{
	   			@include fz(20px);
	   			color:#bbb;
	   			position: absolute;
	   			top:0.3125rem;
	   			right:0.3125rem;
	   		}
	   		label{
	   			position: absolute;
	   			bottom:0.3125rem;
	   			right:0.3125rem;
	   			input{
	   				display: none;
	   				&:checked+span{
	   					background: url(../assets/select.png) no-repeat center/cover;	
	   				}
	   			}
	   			span{
	   				display: inline-block;
	   				width: 0.525rem;
	   				height: 0.525rem;	
	   				border: 1px solid #aaa;	
	   			}
	   		}
   		}		
   }
   
   .car-foot-nav{
   	    position: fixed;
   	    bottom:0;
   	    width: 100%;
   	    border-top: 0.0156rem;
   	    @include flex-center;
   	    button{
   	    	flex:1;
   	    	height: 1.11rem;
   	    	border: none;
   	    	@include fz(15px);
   	    	&.sum-price{
				background: #fff;
				@include fz(14px);
				width:40%;
				flex:none;
				color:#77b59c;
   	    	}
   	    	&.continue-shopping{
				background: orange;
				color: #fff;
   	    	}
   	    	&.to-pay{
				background: red;
				color: #fff;
   	    	}

   	    }
   }
</style>
