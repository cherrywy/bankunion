<template>
	<div id="register" class="container">
		<div class="login_box">
				<i class="back_icon" onclick="javascript:window.history.back(); return false"></i>
				<p class="lg_tit">修改登录密码</p>
			</div>
			<ul class="lg_list">
				<li class="clearfix">
					<i class="lg_icon1"></i>
					<div class="lg_cot1">
						<input type="tel" v-model="phone" disabled="disabled" v-bind:value="phone" placeholder="请输入您的手机号" class="lg_phone"/>
					</div>
				</li>
				<li class="clearfix lg_top">
					<i class="lg_icon2"></i>
					<div class="lg_cot2">
						<input type="tel" placeholder="请输入验证码" v-model="vcode" class="lg_code" id="lg_code1"/>
						<input type="button" v-bind:value="code_text" v-model="code_text" class="lg-yzm" id="btn" v-on:click="getCode">
					</div>
				</li>
				<li class="clearfix lg_top">
					<i class="lg_icon3"></i>
					<div class="lg_cot2">
						<input type="password" v-model="password" placeholder="请输入新密码" class="lg_code" id="lg_code2"/>
					</div>
				</li>
				<li class="clearfix lg_top">
					<i class="lg_icon4"></i>
					<div class="lg_cot2">
						<input type="password" v-model="repeatPassword" placeholder="请输入密码" class="lg_code" id="lg_code3"/>
					</div>
				</li>
			</ul>
			<button class="sm_loging" id="btn2" v-on:click="getReg">确定</button>
	</div>
</template>

<script>
	import CompHeader from '../header.vue'
	import qs from 'querystring'

	export default {
		name: 'register',
		data() {
			return {
				item: [],
				phone: "",
				vcode: "",
				suCode: "",
				password: "",
				repeatPassword: "",
				code_text: '获取验证码',
				wait: 60
			}
		},
		components: {
			CompHeader,
		},
		methods: {
			getCode: function () {
				var vm = this;
				var reg = /^[1][34578][0-9]{9}$/;
				if (reg.test(vm.phone)) {
					// console.log(this);
					vm.time();
					this.axios.get('http://bankall.iwocar.com/send_vcode', { params: { phone: this.phone } }).then(response => {
						// get body data
						response = response.data;
						this.suCode = response.vcode;
					}, response => {
						// error callback
					})

				} else {
					//提示
					this.$toast({
						message: '请检查手机号！',
						position: 'middle',
						duration: 2000
					});
				}
			},
			time: function () {
				var vm = this;
				var oBtn = document.getElementById('btn');
				if (vm.wait == 0) {
					vm.code_text = "获取验证码";
					oBtn.removeAttribute("disabled");
					vm.wait = 60;
					oBtn.style.backgroundColor = '#00abf3';
				} else {
					vm.code_text = vm.wait + "s";
					vm.wait--;
					oBtn.style.backgroundColor = '#999999';
					oBtn.setAttribute("disabled", true);
					setTimeout(function () {
						vm.time();
					}, 1000);
				}
			},
			getReg: function () {
				// var vm = this;
				var reg = /^[1][34578][0-9]{9}$/;
				if (reg.test(this.phone)) {
					this.axios.post('http://bankall.iwocar.com/user_register',qs.stringify({ phone:this.phone, 
					password:this.password, check_password:this.repeatPassword, vcode:this.vcode })).then(response => {
						// get body data
						response = response.data;
						if (response.status == 1) {
							localStorage.setItem('api_token', response.user.api_token);
							localStorage.setItem('phone',this.phone);
							 this.$toast({
								message: '注册成功',
								position: 'middle',
								duration: 2000
							});
							setTimeout(function () {
								window.location = '/TestDrive';
							}, 500);
						} else {
							//提示
							 this.$toast({
								message: '注册失败，请重新注册！',
								position: 'middle',
								duration: 2000
							});
						}

					});

				} else {
					//提示
					this.$toast({
						message: '手机号不正确',
						position: 'middle',
						duration: 2000
					});
					this.phone.focus();
					return false;
				}
			}
		}
	}

</script>


<style>
	body {
		background: #fff;
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
		background-image: url(../../../src/assets/images/lg_icon1.png);
		background-repeat: no-repeat;
		background-size: contain;
		float: left;
		margin-left: 0.4rem;
	}
	.lg_cot1 {
		width: 12.85rem;
		height: 2rem;
		float: left;
		background-image: url(../../../src/assets/images/lg_bg.png);
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
		background-image: url(../../../src/assets/images/lg_icon2.png);
		background-repeat: no-repeat;
		background-size: contain;
		float: left;
		margin-left: 0.4rem;
	}
	.lg_icon3 {
		width: 2rem;
		height: 2rem;
		background-image: url(../../../src/assets/images/suo2.png);
		background-repeat: no-repeat;
		background-size: contain;
		float: left;
		margin-left: 0.4rem;
	}
	.lg_icon4 {
		width: 2rem;
		height: 2rem;
		background-image: url(../../../src/assets/images/suo1.png);
		background-repeat: no-repeat;
		background-size: contain;
		float: left;
		margin-left: 0.4rem;
	}

	.lg_cot2 {
		width: 12.85rem;
		height: 2rem;
		float: left;
		background-image: url(../../../src/assets/images/lg_bg.png);
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
		background-color: #00abf3;
		text-align: center;
		line-height: 1.6rem;
		color: #fff;
		font-size: 0.75rem;
		border-radius: 0.3rem;
		margin: 0 auto;
		margin-top: 3.5rem;
	}
</style>