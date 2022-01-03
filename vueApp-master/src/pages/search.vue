<template>
    <div>
        <div id="search">
            <div>
                <input type="search" name="searchtext" class="goods_search_content" v-model="keyword" placeholder="请输入搜索的内容">
                <span class="iconfont icon-shanchu" @click="clearSearchText"></span>
            </div>
            <button @click="goSearch">搜索</button>
        </div>  
		<main class="main_goods_box">
	        <ul>
	            <li class="goods_item" v-for="item in mDatas">
	                <router-link :to="'/detail/'+item.product_id" class="goods_item_link">
	                    <img v-lazy="item.product_img_url" alt="" class="goods_item_pic">
	                    <div class="goods_right">
	                        <div class="pp_name">
	                            <span>
	                                {{item.product_name}}
	                            </span>
	                        </div>
	                        <div class="price_box">
	                            <span>￥</span>
	                            <span>{{item.product_uprice}}</span>
	                            <span>.00</span>
	                        </div>
	                        <div class="pinglun_box">
	                            <span>{{item.product_comment_num}}条评价</span>
	                            <span>{{item.shop_name}}</span>
	                        </div>
	                    </div>
	                </router-link>
	            </li>
	          
	        </ul>
    	</main>
    </div>
</template>

<script>
	export default{
		data(){
			return {
				keyword:'',
				mDatas:[]
			}
		},
		methods:{
			goSearch(event){
				let _this = this;
				if(_this.keyword == ''){
					alert('请输入商品名称');
				}else{
					_this.$http.get('/search',{
						params:{
							kw:_this.keyword,
							hot:'',
							priceUp:'',
							priceDown:''
						}
						}).then((res)=>{
							_this.mDatas = res.data;
							console.log(_this.mDatas);
						},(err)=>{
							console.log(err);
						});
					}
				
				 window.event? window.event.returnValue = false : event.preventDefault();
            },
            
            clearSearchText(){
                this.searchtext="";
            },

			getbyHot(){
				let _this = this;
				if(_this.keyword == ''){
					alert('请输入商品名称');
				}else{
					_this.$http.get('/search',{
						params:{
							kw:_this.keyword,
							hot:'hot',
							priceUp:'',
							priceDown:''
						}
						}).then((res)=>{
							_this.mDatas = res.data;
							console.log(_this.mDatas);
						},(err)=>{
							console.log(err);
						});
					}
			},
			getByPriceUp(){
				let _this = this;
				if(_this.keyword == ''){
					alert('请输入商品名称');
				}else{
					_this.$http.get('/search',{
						params:{
							kw:_this.keyword,
							hot:'hot',
							priceUp:'priceUp',
							priceDown:''
						}
						}).then((res)=>{
							_this.mDatas = res.data;
							console.log(_this.mDatas);
						},(err)=>{
							console.log(err);
						});
					}
			},
			getByPriceDown(){
				let _this = this;
				if(_this.keyword == ''){
					alert('请输入商品名称');
				}else{
					_this.$http.get('/search',{
						params:{
							kw:_this.keyword,
							hot:'hot',
							priceUp:'',
							priceDown:'priceDown'
						}
						}).then((res)=>{
							_this.mDatas = res.data;
							console.log(_this.mDatas);
						},(err)=>{
							console.log(err);
						});
					}
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '../base/css/base.scss';
    .goods_item_pic{
        font-size: 16px;
    }
    
	#scroll{
        top:1.11rem;
        bottom:1.11rem;
    }

    #search{
        background: $mainColor;      
        padding:0.2rem 1.8rem 0.2rem 0.5rem;
        position: relative;
        div{
            position: relative;
            span{
                position: absolute;
                right:0;top:50%;
                @include fz(16px);
                transform:translateY(-50%);
                color: #888;
            }
        }
        input{
            width:100%;
            background:#fff;
            border: none;
            height: 0.7rem;
            padding-left: 0.4rem;
            vertical-align: middle;
        }
        button{
            position: absolute;
            right:0;
            top:50%;
            margin-top: -0.35rem;
            width:1.5rem;
            height: 0.7rem;
            line-height: 0.7rem;
            text-align: center; 
            background:none;
            border: none;
            color: #fff;
            vertical-align: middle;
            @include fz(14px);
        }
    }

    #saerchingLoading{
        position: fixed;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
    }
</style>