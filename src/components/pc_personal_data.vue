<template>
    <div id="PersonCenter" class="container">
        <comp-header :header="header"></comp-header>
       <!--编辑头像-->
			<div class="bj_hd_pic">
				<a href="javascript:;">
					<div class="hd_pic">
						<img src="../../src/assets/images/pic_header.jpg"/>
					</div>
					<p>编辑头像</p>
				</a>
			</div>
			<!--个人中心列表-->
			<ul class="pc_list pc_list2">
				<li>
					<a href="javascript:;" class="clearfix">
						<i class="pc_icon"></i>
						<span>昵称</span>
						<!--<div class="pc_person_xx" contenteditable="true" v-model="nickname"> {{nickname}} </div>-->
						<input type="text" class="pc_person_xx" style="text-align: right" v-model="nickname" v-bind:value="nickname">
					</a>
				</li>
				<li>
					<a @click="showMoreMsg_rg" class="clearfix">
						<i class="pc_icon2"></i>
						<span>修改密码</span>
						<i class="lk_icon"></i>
					</a>
				</li>
			</ul>
			<!--退出登录-->
			<div class="ad_adds" id="logout" @click="logout">退出登录</div>
    </div>
</template>

<script>
 
    import CompHeader from './header.vue'
    export default {
        name: 'PersonCenter',
        data() {
            return {
                nickname: "",
                header: {
                    title: "个人中心",
                    back: true
                }
            }
        },
        components: {
            CompHeader,
        },
        created() {
          
        },
        methods: {
           logout:function(){
			  localStorage.setItem('api_token', null);
			   localStorage.setItem('nickname', null); 
			    localStorage.setItem('api_token', null);
				var banks_id=localStorage.getItem('banks_id');
				 const path = '/home?banks_id='+ banks_id;
                this.$router.push({path: path})

		   },
			 showMoreMsg_rg: function () {
                const path = '/login/rg_forget'
                this.$router.push({path: path})
              },
            saveUserData:function(){
					var vm = this;
                   this.axios.post('http://bankall.iwocar.com/user_login', qs.stringify({ phone: this.phone, password: this.password, type: '1' })).then(response => {
						// get body data
						response = response.data;
						if (response.status == 1) {
						localStorage.setItem('api_token', response.user.api_token);
						localStorage.setItem('phone', this.phone);
						localStorage.setItem('nickname', response.user.nickname);
							this.$router.push({path:"/home"})
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
             
        }
    }

</script>

<style>
/*个人资料*/
.bj_hd_pic{
	width:16rem;
	margin-top:2.15rem;
	padding:0.3rem 0 0.5rem 0;
	background-color: #FFFFFF;
}
.bj_hd_pic{
	width:100%;
	display: block;
	height:100%;
}
.hd_pic{
	width:2.75rem;
	height:2.75rem;
	margin:0 auto;
}
.hd_pic img{
	width:2.75rem;
	height:2.75rem;
	margin:0 auto;
}
.bj_hd_pic p{
	text-align:center;
	margin-top:0.5rem;
}
.pc_icon{
	width:1.5rem;
	height:1.5rem;
	background-image: url(../../src/assets/images/pc_icon2.png);
	background-repeat: no-repeat;
	background-size: contain;
	float:left;
	margin-right:0.45rem;
	margin-left:0.3rem;
}
.pc_icon2{
	width:1.5rem;
	height:1.5rem;
	background-image: url(../../src/assets/images/pc_icon.png);
	background-repeat: no-repeat;
	background-size: contain;
	float:left;
	margin-right:0.45rem;
	margin-left:0.3rem;
}
.pc_person_xx{
	float:right;
	line-height: 1.5rem;
	margin-right:1.35rem;
}
.pc_news{
	font-size:0.65rem;
	/*padding:0 0.5rem;*/
	margin-top:2.15rem;
}
.pc_news li{
	padding:0.5rem 0.5rem;
	border-bottom: 1px solid #d9d9d9;
}
.pc_news li p{
	padding:0 0.5rem;
	line-height:1rem;
}
.pc_news_txt1{
	text-align: right;
	margin-top:0.3rem;
}
.pc_list2{
	margin-top:1px;
}
.pc_list li{
	width:16rem;
	margin-bottom: 1px;
	background-color: #fff;
}
.pc_list li a{
	display:block;
	width:100%;
	padding:0.4rem 0;
}
.pc_list li a span{
	display:block;
	height:1.5rem;
	line-height:1.5rem;
	font-size:0.65rem;
	float: left;
}
.ad_adds {
    width: 16rem;
    height: 2.1rem;
    background-color: #00abf3;
    text-align: center;
    line-height: 2.1rem;
    color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    font-size: 0.7rem;
}
.lk_icon {
    width: 1.5rem;
    height: 1.5rem;
    background-image: url(../../src/assets/images/lk_icon.png);
    background-repeat: no-repeat;
    background-size: contain;
    float: right;
    margin-right: 0.45rem;
}
</style>