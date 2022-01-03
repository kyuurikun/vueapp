<template>
    <div>
        <header class="top_bar">
                <h3 class="cartname"></h3>
                <a onclick="window.history.go(-1)" class="el-icon-back"></a>
        </header>
      <ul>
	    <li class="car-list" v-for="item in orderDatas" v-bind:key="item.id">
	    	<div class="car-list__img">
	    		<img v-lazy="item.product_img_url" alt="" class="product_skill_item_cion lazy-img-fadein">
	    	</div>
	    	<div class="car-list__detail">
	    		<p class="car-list__detail__title">{{item.product_name}}</p>
	    		<p class="car-list__detail__number">数量：<span>{{item.ocount}}</span></p>
	    		<p class="car-list__detail__price">单价：<span>￥{{item.price}}</span></p>
	    		<p class="car-list__detail__sum">小计：<span>￥{{item.price*item.ocount}}</span></p>
	    	</div> 
			<div class="car-list_type">
                <p class="car-list_detail_type">{{item.type}}</p>
			</div> 	    		
	    </li>
	    </ul>
   </div>
</template>
<<script>
export default {
    data(){
        return{
            userid:"", 
            orderDatas:[]
        }
    },

mounted(){
    this.getdata();
},

methods: {
    findPosition(id){
            return this.goodsList.findIndex(item=>{
                return item.id==id
             })
        },
    
    getdata(){
			let _this = this;
			var userinfo = window.sessionStorage.getItem('userInfo');
            let userinFo = JSON.parse(userinfo)
            let userid = userinFo.user_id;
            console.log(userid);
            _this.$http.get('/orders',{
                params:{
					uId: userid
				}
            }).then((res) => {
				_this.orderDatas = res.data;
				console.log(_this.orderDatas);
			},(err)=>{
				console.log(err);
			})
		},
    
},
}
</script>

<style scoped lang="scss">
	@import '../base/css/base.scss';
   .top_bar{
	   position: relative;
   }
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
   
</style>