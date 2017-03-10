<template>
	<div id="login" class="container">
		<div class="login_box">
				<p class="lg_tit2" v-on:click="forgetPassword">忘记密码</p>
				<p class="lg_tit3">登录</p>
			</div>
			<ul class="lg_list">
				<li class="clearfix">
					<i class="lg_icon1"></i>
					<div class="lg_cot1">
						<input type="tel" v-model="phone" placeholder="请输入您的手机号" class="lg_phone"/>
					</div>
				</li>
				<li class="clearfix lg_top">
					<i class="lg_icon3"></i>
					<div class="lg_cot2">
						<input type="password" v-model="password" placeholder="请输入您的密码" class="lg_code"/>
					</div>
				</li>
			</ul>
			<p class="login-other clearfix">
				<a href="../login/lg_short_message.html"class="mm-login">短信登录</a>
				<a @click="register" class="zc-login">注册用户</a>
			</p>
			<button class="sm_loging" id="btn2" v-on:click="getLogin">登录</button>
	</div>
</template>

<script>
  
import CompHeader from '../header.vue'
import qs from 'querystring'

	export default {
		name: 'login',
		data() {
			return {
				item: [],
				header: {
					back: true
				},
				phone: "",
				password: ""
			}
		},
		components: {
			CompHeader,
		},
		methods: {
			getLogin: function () {
				//获取验证码
				// var this = this;
				//手机号判断
				var reg = /^[1][34578][0-9]{9}$/;
				if (reg.test(this.phone)) {
					this.axios.post('http://bankall.iwocar.com/user_login', qs.stringify({ phone: this.phone, password: this.password, type: '1' })).then(response => {
						// get body data
						response = response.data;
						if (response.status == 1) {
						localStorage.setItem('api_token', response.user.api_token);
						localStorage.setItem('phone', this.phone);
						localStorage.setItem('nickname', response.user.nickname);
						var banks_id=localStorage.getItem('banks_id');
				        const path = '/home?banks_id='+ banks_id;
						this.$router.push({path:path})
						} else {
							//提示
							this.$toast({
								message: '提示登录失败，请重新登录，或忘记密码',
								position: 'middle',
								duration: 2000
							});
						}
					}, response => {
						// error callback
					})


				}
			
		},
			forgetPassword: function () {
				 this.$router.push({path:"/login/rg_forget"})
				
			},
				register: function () {
				 this.$router.push({path:"/login/register"})
				
			}
		}
	}

</script>


<style>
	.mint-field-other {
		top: 50%;
		left: 0;
		position: absolute;
		margin: 0 1rem;
		margin-top: -0.75rem;
		width: 1.5rem;
	}



	.mint-field-other img {
		width: 1.5rem;
		height: 1.5rem;
	}



	.mint-field-core {
		margin-left: 3rem;
		font-family: Microsoft YaHei;
	}
	/*登陆*/


	.login_box {
		width: 14.6rem;
		padding: 0 0.7rem;
	}


	.lg_tit {
		font-size: 1.25rem;
		margin-top: 3.75rem;
	}


	.lg_list {
		margin-top: 1.75rem;
	}

	.lg_icon1 {
		width: 2rem;
		height: 2rem;
		background-image: url(http://bankhome.iwocar.com/images/lg_icon1.png);
		background-repeat: no-repeat;
		background-size: contain;
		float: left;
		margin-left: 0.4rem;
	}


	.lg_cot1 {
		width: 12.85rem;
		height: 2rem;
		float: left;
		background-image: url(http://bankhome.iwocar.com/images/lg_bg.png);
		background-repeat: no-repeat;
		background-size: contain;
		position: relative;
	}


	.lg_phone {
		width: 8rem;
		height: 2rem;
		position: absolute;
		top: -0.3rem;
		left: 0;
		padding-left: 0.5rem;
		font-size: 0.7rem;
		font-family: "微软雅黑";
	}


	.lg_icon2 {
		width: 2rem;
		height: 2rem;
		background-image: url(http://bankhome.iwocar.com/images/lg_icon2.png);
		background-repeat: no-repeat;
		background-size: contain;
		float: left;
		margin-left: 0.4rem;
	}


	.lg_icon3 {
		width: 2rem;
		height: 2rem;
		background-image: url(http://bankhome.iwocar.com/images/suo2.png);
		background-repeat: no-repeat;
		background-size: contain;
		float: left;
		margin-left: 0.4rem;
	}


	.lg_icon4 {
		width: 2rem;
		height: 2rem;
		background-image: url(http://bankhome.iwocar.com/images/suo1.png);
		background-repeat: no-repeat;
		background-size: contain;
		float: left;
		margin-left: 0.4rem;
	}


	.lg_cot2 {
		width: 12.85rem;
		height: 2rem;
		float: left;
		background-image: url(http://bankhome.iwocar.com/images/lg_bg.png);
		background-repeat: no-repeat;
		background-size: contain;
		position: relative;
	}


	.lg_code {
		width: 7rem;
		height: 2rem;
		position: absolute;
		top: -0.3rem;
		left: 0;
		padding-left: 0.5rem;
		font-size: 0.7rem;
		font-family: "微软雅黑";
		z-index: 5;
	}


	.lg_code2 {
		width: 8rem;
		height: 2rem;
		position: absolute;
		top: -0.3rem;
		left: 0;
		padding-left: 0.5rem;
		font-size: 0.7rem;
		font-family: "微软雅黑";
		display: none;
	}


	.lg-yzm {
		width: 3.9rem;
		height: 1.65rem;
		background: #00abf3;
		position: absolute;
		top: -0.3rem;
		right: 0.7rem;
		border-radius: 0.3rem;
		font-size: 0.5rem;
		text-align: center;
		line-height: 1.65rem;
		color: #fff;
		font-family: "微软雅黑";
	}


	.lg_list .lg_top {
		margin-top: 1.75rem;
		margin-bottom: 0.6rem;
	}


	.login-other {
		width: 14rem;
		padding: 0 1rem;
	}


	.mm-login {
		float: left;
		font-size: 0.6rem;
	}


	.zc-login {
		float: right;
		font-size: 0.6rem;
	}


	.sm_loging {
		display: block;
		width: 7.5rem;
		height: 1.6rem;
		background-color: #999999;
		text-align: center;
		line-height: 1.6rem;
		color: #fff;
		font-size: 0.75rem;
		border-radius: 0.3rem;
		margin: 0 auto;
		margin-top: 3.5rem;
	}
	/*密码登陆*/


	.lg_tit2 {
		font-size: 0.6rem;
		text-align: right;
		margin-top: 2rem;
	}


	.lg_tit3 {
		font-size: 1.25rem;
		margin-top: 1.1rem;
	}


	.lg_cot2 i {
		width: 2rem;
		height: 2rem;
		background-image: url(http://bankhome.iwocar.com/images/eye.png);
		background-repeat: no-repeat;
		background-size: contain;
		position: absolute;
		top: -0.3rem;
		right: 0.3rem;
	}


	.lg_cot2 .eye {
		width: 2rem;
		height: 2rem;
		background-image: url(http://bankhome.iwocar.com/images/eye2.png);
		background-repeat: no-repeat;
		background-size: contain;
		position: absolute;
		top: -0.3rem;
		right: 0.3rem;
	}
</style>