<template>
	<div class="m_r">
		<header class="top_bar">
		   <a onclick="window.history.go(-1)" class="el-icon-back"></a>
		</header>
		<main class="user_login_box">
		    <div class="login_dialog">
		        <div class="_username">
		            <el-input type="text" name="oldpwd" placeholder="请输入原密码" class="user_input" v-model="oldpwd" show-password></el-input>
		        </div>
		        <div class="_username u_passwd">
		            <el-input type="password" name="newpwd" placeholder="请输入新密码" class="user_input" v-model="newpwd" show-password></el-input>
		        </div>
		        <div class="_username u_passwd">
		            <el-input type="password" name="newpwd_ag" placeholder="请再次输入新密码" class="user_input" v-model="newpwd_ag" show-password></el-input>
		        </div>
		        <div class="login_box">
		            <a @click="goSearch()" class="btn_login">修改</a>
		        </div>
		    </div>
		</main>
	</div>
</template>
<script>
export default {
    data() {
      return {
          oldpwd:'',
          newpwd: '',
          newpwd_ag: ''
        }
    },
    methods: {
      goSearch(){
        let _this = this;
        let uObj = JSON.parse(window.sessionStorage.userInfo);
		let userid = uObj.user_id;
		let oldpwd = _this.oldpwd;
		let newpwd = _this.newpwd;
				if(_this.oldpwd ==''){
					alert('请输入原密码');
				}else if(_this.newpwd == '' || _this.newpwd_ag == ''){
					alert('请输入新密码');
				}else if(_this.newpwd !== _this.newpwd_ag){
					alert('两次输入的密码不一致');
				}else{
					_this.$http.post('/changepwd',{
                  uId : userid,
                  opwd : oldpwd,
                  npwd : newpwd
				}).then((res)=>{
					if(res.status == 200){
						_this.changeInfo = res.data;
						if(_this.changeInfo.status == 1){
							//change success, go to this login page
							alert('修改成功')
							window.history.go(-1);
						}else if(_this.changeInfo.status == -2){
							alert('原密码不正确');
						}
						else{
							alert('失败');
						}
					}else{
						alert('出现错误');
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


</style>