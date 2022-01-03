<template>
   <div class="my_l">
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="el-icon-back"></a>
		</header>
		<main class="user_login_box">
		    <div class="login_dialog">
		        <div class="_username">
		            <el-input type="text" name="username" placeholder="请输入用户名" class="user_input" v-model="username"/></el-input>
		        </div>
		        <div class="_username u_passwd">
		            <el-input type="password" name="password" placeholder="请输入密码" class="user_input" v-model="password" show-password></el-input>
		        </div>

		        <div class="login_box">
		            <a @click="goLogin()" class="btn_login">登录</a>
		        </div>
		        <div class="go_reg_box">
		            <router-link tag="span" to="/register" class="btn_reg">快速注册</router-link>
		        </div>
		    </div>
		</main>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				username:'',
				password:'',
				userInfo:{}
			}
		},
		methods:{
			goLogin(){
				let _this = this;
				
				if(_this.username ==''){
					alert('请输入用户名');
				}else if(_this.password == ''){
					alert('请输入密码');
				}else{
					_this.$http.post('/login',{
						loginName:_this.username,
						loginPawd:_this.password,
					}).then((res)=>{
						console.log(_this.password);
					if(res.status == 200){
						_this.userInfo = res.data;
						if(_this.userInfo.status == 1){
							//LOGIN success
							window.sessionStorage.userInfo = JSON.stringify(_this.userInfo);
							console.log(_this.$store);
							_this.$store.dispatch('setUserInfo', this.userInfo);
                        let redirect = decodeURIComponent(_this.$route.query.redirect || '/');
                        _this.$router.push({
                            path: redirect
                        });
						this.$router.go(0);
						}else{
							alert(_this.userInfo.msg);
						}
					}else{
						alert('请求出现错误');
					}
						console.log(res);
					},(err)=>{
						console.log(err);
					});
				}
			}
		}
	}
</script>

<style>
body{
    background-color: #F3F5F7;
}

.el-icon-back{
    position: absolute;
    left:15px;
	top:15px;
    font-size: 20px;
}

.user_login_box{
	text-align: center;
    max-width: 500px;
    min-width: 300px;
    margin: 0 auto;
    height: 200px;
    padding-top: 40px;
}

.user_login_box .login_dialog{
    width: 100%;
    height: 100%;
    padding: 10px;

}

.login_dialog ._username{
    height: 50px;
    width: 90%;
    margin-top: 20px;
    border-radius: 2px;
}

._username .user_input{
    width: 100%;
    height: 100%;
    font-size: 16px;
    padding-left: 6px;
}
.login_dialog .u_passwd{
    margin-top: 10px;
}

.login_dialog .login_box{
    height: 40px;
    width: 95%;
    background-color: #67C23A;
    border: 1px solid #fff;
    border-radius: 4px;
    margin-top: 30px;
}


.login_box a{
    font-size: 15px;
    display: block;
    width: 100%;
    height: 100%;
    line-height: 40px;
    text-align: center;
    color: #fff;
}

.go_reg_box{
	position: relative;
	left: -7px;
    display: inline-block;
    color: #aaa;
    height: 20px;
    font-size: 15px;
    line-height: 20px;
    margin-top: 10px;
}

</style>
