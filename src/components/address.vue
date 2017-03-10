<template>
    <div id="address" class="container">
        <comp-header :header="header"></comp-header>

        <!--个人中心banner-->
        <div class="meg">

            <mt-field placeholder="请输入名称" v-model="username">
                <img src="../../src/assets/images/ad_name.png">
            </mt-field>

            <mt-field placeholder="请输入手机号" type="tel" v-model="phone">
                <img src="../../src/assets/images/ad_phone.png">
            </mt-field>
            <mt-field placeholder="请输入收货地址" v-model="address">
                <img src="../../src/assets/images/ad_adress_icon.png" >
            </mt-field>
            <mt-field placeholder="请输入邮编" v-model="postcode">
                <img src="../../src/assets/images/ad_email.png">
            </mt-field>

            <div class="set_mr clearfix">
                <i class="ad_yes_no"></i>
                <span>设为默认地址</span>
            </div>
        </div>
              <mt-button type="primary" @click="addressPost">确定</mt-button>

    </div>
</template>

<script>
    import CompHeader from './header.vue'
    import qs from 'querystring'
    export default {
        name: 'address',
        data() {
            return {
                username: [],
				phone: [],
				address: [],
				postcode: [],
				addstatus: [],
                header: {
                    title: "添加收货地址",
                    back: true
                },

            }
        },
        components: {
            CompHeader,
        },
        created() {
            var that = this;
            var ad_id= window.localStorage.getItem("action_id_td")
           

        },
        methods: {
            addressPost: function () {
                var api_token =localStorage.getItem('api_token'); 
					var vm = this;
					var reg = /^[1][34578][0-9]{9}$/;
					var postcodeReg = /^[1-9][0-9]{5}$/;
					if (!vm.username){
						//提示
                        	this.$toast({
								message: '用户名未填写',
								position: 'middle',
								duration: 2000
							});
					} else if ( !reg.test(vm.phone)) {
                        this.$toast({
								message: '手机号不正确',
								position: 'middle',
								duration: 2000
							});
	
					} else if (!vm.address) {
                        this.$toast({
								message: '地址未填写',
								position: 'middle',
								duration: 2000
							});
					} else if (!vm.postcode) {
                        this.$toast({
								message: '邮编未填写',
								position: 'middle',
								duration: 2000
							});
										
					} else if ( !postcodeReg.test(vm.postcode)) {
                        this.$toast({
								message: '邮编格式不正确',
								position: 'middle',
								duration: 2000
							});
						
					} else {
                   this.axios.post('http://bankall.iwocar.com/address_post', qs.stringify({   
                     api_token :api_token,
					 receive_name :vm.username,
					 receive_phone :vm.phone,
					 address :vm.address,
					 postcode :vm.postcode,
					 type :1,
					 status: vm.addstatus       
                     })).then(response => {
						// get body data
						response = response.data;
							if(response.status == 1) {
                              this.$toast({
								message: '地址添加成功',
								position: 'middle',
								duration: 2000
							});
						
							setTimeout(function(){
									
								var url = document.referrer;
								parent.location.href=url;
									
									},1000);
								} else {
                                     this.$toast({
								message: '地址添加失败',
								position: 'middle',
								duration: 2000
							});
							setTimeout(function(){
                                        const path = '/ad_Administration'
                                         this.$router.push({path: path})
								},1000);
							}
					}, response => {
						// error callback
					})
						
					}
				}

        }
    }

</script>

<style>
.mint-button--normal {
    display: inline-block;
    padding: 0 12px;
    width: 100%;
    bottom: 0;
    position: absolute;
}
    .meg {
        margin-top: 2.15rem;
        background: #eee;
    }
    
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
    
    .set_mr {
        background: transparent;
        text-align: center;
        line-height: 2.5rem;
        font-size: 0.5rem;
        border-bottom: 1px solid #d9d9d9;
        position: relative;
        height: 2.5rem;
    }
    
    .set_mr i {
        width: 0.75rem;
        height: 0.75rem;
        background-image: url(../../src/assets/images/ad_no.png);
        background-repeat: no-repeat;
        background-size: contain;
        position: absolute;
        top: 1.05rem;
        left: 5.5rem;
    }
    
    .set_mr .ad_yes_no {
        width: 0.75rem;
        height: 0.75rem;
        background-image: url(../../src/assets/images/ad_yes.png);
        background-repeat: no-repeat;
        background-size: contain;
        position: absolute;
        top: 0.9rem;
        left: 5.5rem;
    }
</style>