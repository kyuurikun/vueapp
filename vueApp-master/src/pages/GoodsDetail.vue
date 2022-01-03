<template>
	<div class="goods_detail">
		<header class="top_bar">
                <h3 class="cartname"></h3>
                <a onclick="window.history.go(-1)" class="el-icon-back"></a>
                <i class="title">商品详情</i>
                <a href="#" class="el-icon-menu"></a>
        </header>
        <main class="detail_box">
            <section class="banner_box">
                <ul class="banner_child_box">
                    <li class="banner_item" v-for="item in goodsImages">
                        <img v-lazy="item.image_url" alt="" class="banner_pic">
                    </li>
                
                </ul>
                <div class="banner_count">
                        <em id="slide-nub" class="fz18">1</em>
                        <em class="nub-bg">/</em>
                        <em id="slide-sum" class="fz12">5</em>
                </div>

            </section>
            <section class="product_info clearfix">
                <div class="product_left">
                    <p class="p_name">{{goodsData[0].product_name}}</p>
                    <div class="product_pric">
                        <span>￥</span>
                        <span class="rel_price">{{goodsData[0].product_price}}</span>
                        <span>.00</span>
                    </div>
                    <div class="product_right">
                        降价通知
                    </div>
                </div>

            </section>
            <section class="product_intro">
                <p class="pro_det">
                    {{goodsData[0].product_detail}}
                </p>
           </section>
          
        </main>
        <footer class="cart_d_footer">
            <div class="m">
                <ul class="m_box">
                    <li class="m_item">
                        <a href="" class="m_item_link">
                            <em class="m_item_pic"></em>
                            <span class="m_item_name">卖家</span>
                        </a>
                        <a href="" class="m_item_link">
                            <em class="m_item_pic two"></em>
                            <span class="m_item_name">关注</span>
                        </a>
                        <a href="" class="m_item_link">
                            <em class="m_item_pic three"></em>
                            <router-link to="/car">购物车</router-link>
                        </a>
                    </li>
                </ul>
                <div class="btn_box clearfix" >
                    <a @click="addtocar()" class="buy_now">加入购物车</a>
                    <a href="#" class="buybuy">立即购买</a>
                </div>
            </div>
        </footer>
	</div>
</template>
<script>
   export default{
        mounted(){
            this.fetchData(this.$route.params.id);
        },
        data(){
            return {
                cateGoodsAllData:[],
                goodsImages:[],
                goodsData:[],
                userinfo:[],
                mId:"",
                cartid:"",
                userid:""
            }
        },
        watch:{
            $route(to){
                //console.log(to);
                var reg=/detail\/\d+/;
                if(reg.test(to.path)){
                    var categotyId=this.$route.params.id || 0;
                    this.fetchData(categotyId);
                }
            }
        },
        methods:{
            fetchData(id){
                var _this=this;
                
                _this.$http.get('/detail',{
                    params: {
                        mId: id
                    }
                }).then((res)=>{
                    _this.goodsImages = res.data[0];
                    _this.goodsData = res.data[1];
                    window.localStorage.product_id = id;
                    window.localStorage.cart_id = this.goodsData[0].category_id;
                },(err)=>{
                    console.log(err);
                })
            },
            addtocar(){
                let _this=this;
                var userinfo = sessionStorage.getItem('userInfo');
                let userinFo = JSON.parse(userinfo)
                let userid = userinFo.user_id;
                let mId = localStorage.getItem('product_id');  
                let cartid = localStorage.getItem('cart_id');
                _this.$http.post('/addcar',{
                       pId : mId,
                       cId : cartid,
                       uId : userid,
                }).then((res)=>{
                    if(res.status == 0){
                        alert ('服务器出错')
                    }else if (res.status == 10){
                        end()
                    }
                }),(err)=>{
                    console.log(err);
                }
                this.$router.go(0);
            }
        }
    }
</script>
<style>
@import '../assets/css/detail.css';
</style>