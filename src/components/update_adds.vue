<template>
    <div id="address" class="container">
        <comp-header :header="header"></comp-header>

      <!--新增地址-->
			<ul class="ad_adress_new">
				<li class="clearfix">
					<i class="ad_name"></i>
					<input type="text" :value="items.receive_name" v-model="name" class="useName"/>
				</li>
				<li class="clearfix">
					<i class="ad_phone"></i>
					<input type="text" :value="items.receive_phone" v-model="phone" class="usePhone"/>
				</li>
				<li class="clearfix">
					<i class="ad_adre"></i>
					<input type="text" :value="items.address" v-model="address" class='useAdress'/>
				</li>
				<li class="clearfix">
					<i class="ad_email"></i>
					<input type="text" :value="items.postcode" v-model="postcode" class="usePost"/>
				</li>
				<li class="set_mr clearfix">
					<i class="ad_yes_no"></i>
					<span>设为默认地址</span>
				</li>	
			</ul>
			<input type="hidden" class="xs_hidden" checked="true" v-model="addstatus" :value="1">
			<div class="ad_adds" v-on:click="addressPost">确定</div>
		</div>
    </div>
</template>

<script>
    import CompHeader from './header.vue'
    import qs from 'querystring'
    export default {
        name: 'address',
        data() {
            return {
               items: [],
				name: "",
				phone: "",
				address: "",
				postcode: "",
				addstatus: "",
                header: {
                    title: "修改收货地址",
                    back: true
                },

            }
        },
        components: {
            CompHeader,
        },
        created() {
            var that = this;
            var api_token =localStorage.getItem('api_token'); 
                  var address_id= that.$route.query.id;

             that.axios.get('http://bankall.iwocar.com/address_get', { params: { api_token: api_token, type:3,address_id:address_id } }).then(response => {
                        // get body data
                        response = response.data;
                        that.items = response.list;
                         that.name = that.items.receive_name;
                          that.address = that.items.address;
                        that.phone = that.items.receive_phone;
                        that.postcode = that.items.postcode;
                    }, response => {
                        // error callback
                    });

        },
        methods: {
            addressPost: function () {
                var api_token =localStorage.getItem('api_token'); 
					var vm = this;
					var reg = /^[1][34578][0-9]{9}$/;
					var postcodeReg = /^[1-9][0-9]{5}$/;
					if (!vm.name){
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
					 receive_name :vm.name,
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
                                        message: '地址修改成功',
                                        position: 'middle',
                                        duration: 2000
                                    });
						     setTimeout(function(){
                                       window.location='/ad_Administration';
								},1000);
								} else {
                                     this.$toast({
								message: '地址修改失败',
								position: 'middle',
								duration: 2000
							});
                            setTimeout(function(){
									
								var url = document.referrer;
								parent.location.href=url;
									
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
/*新增收货地址*/
.ad_adress_new{
	margin-top:2.15rem;
}
.ad_adress_new li{
	background: #fff;
	padding: 0.7rem 0 0.55rem 0;
	margin-bottom: 1px;
	position:relative;
}
.ad_adress_new li input{
	width:12.5rem;
	height:1.5rem;
	float:left;
	font-size:0.7rem;
	font-family: "微软雅黑";
	color:#b2b2b2;
}
.ad_name{
	width:1.5rem;
	height:1.5rem;
	background-image: url(../../src/assets/images/ad_name.png);
	background-repeat: no-repeat;
	background-size: contain;
	float:left;
	margin-left:0.25rem;
}
.ad_phone{
	width:1.5rem;
	height:1.5rem;
	background-image: url(../../src/assets/images/ad_phone.png);
	background-repeat: no-repeat;
	background-size: contain;
	float:left;
	margin-left:0.25rem;
}
.ad_adre{
	width:1.5rem;
	height:1.5rem;
	background-image: url(../../src/assets/images/ad_adress_icon.png);
	background-repeat: no-repeat;
	background-size: contain;
	float:left;
	margin-left:0.25rem;
}
.ad_email{
	width:1.5rem;
	height:1.5rem;
	background-image: url(../../src/assets/images/ad_email.png);
	background-repeat: no-repeat;
	background-size: contain;
	float:left;
	margin-left:0.25rem;
}

.ad_adress_new .set_mr{
	background: transparent;
	text-align:center;
	line-height:1.5rem;
	font-size: 0.5rem;
	border-bottom: 1px solid #d9d9d9;
	position:relative;
}
.ad_adress_new .set_mr i{
	width:0.75rem;
	height:0.75rem;
	background-image: url(../../src/assets/images/ad_no.png);
	background-repeat: no-repeat;
	background-size: contain;
	position:absolute;
	top:1.05rem;
	left:5.5rem;
}
.ad_adress_new .set_mr .ad_yes_no{
	width:0.75rem;
	height:0.75rem;
	background-image: url(../../src/assets/images/ad_yes.png);
	background-repeat: no-repeat;
	background-size: contain;
	position:absolute;
	top:1.05rem;
	left:5.5rem;
}
/*申请试驾列表*/
.ad_sex{
	width:1.5rem;
	height:1.5rem;
	background-image: url(../../src/assets/images/td_sex.png);
	background-repeat: no-repeat;
	background-size: contain;
	float:left;
	margin-left:0.25rem;
}
/*.td_bot{
	width:1.5rem;
	height:1.5rem;
	background-image: url(../../src/assets/images/td_bt.png);
	background-repeat: no-repeat;
	background-size: contain;
	position: absolute;
	top:0.6rem;
	right:0.5rem;
	z-index: 0;
}*/
.ad_adress_new li select{
	width:13.5rem;
	height:1.5rem;
	float:left;
	font-size:0.7rem;
	font-family: "微软雅黑";
	color:#b2b2b2;
	background-image: url(../../src/assets/images/td_bt.png);
	background-repeat: no-repeat;
	background-position: right center;
	background-size: contain; 
}
.ad_adress_new .sd_agree{
	padding:1.7rem 0;
	background: #fff;
	text-align:center;
	line-height:1.5rem;
	font-size: 0.5rem;
	border-bottom: 1px solid #d9d9d9;
	position:relative;
}
.ad_cars{
	width:1.5rem;
	height:1.5rem;
	background-image: url(../../src/assets/images/td_cars.png);
	background-repeat: no-repeat;
	background-size: contain;
	float:left;
	margin-left:0.25rem;
}
.ad_sf_icon{
	width:1.5rem;
	height:1.5rem;
	background-image: url(../../src/assets/images/td_sf.png);
	background-repeat: no-repeat;
	background-size: contain;
	float:left;
	margin-left:0.25rem;
}
.ad_city_iocn{
	width:1.5rem;
	height:1.5rem;
	background-image: url(../../src/assets/images/ad_adress_icon.png);
	background-repeat: no-repeat;
	background-size: contain;
	float:left;
	margin-left:0.25rem;
}
.ad_jxs_icon{
	width:1.5rem;
	height:1.5rem;
	background-image: url(../../src/assets/images/td_jxs.png);
	background-repeat: no-repeat;
	background-size: contain;
	float:left;
	margin-left:0.25rem;
}
.ad_time_icon{
	width:1.5rem;
	height:1.5rem;
	background-image: url(../../src/assets/images/td_time.png);
	background-repeat: no-repeat;
	background-size: contain;
	float:left;
	margin-left:0.25rem;
}
.sd_agree p{
	width:9.9rem;
	margin:0 auto;
}
.sd_agree i{
	width:0.75rem;
	height:0.75rem;
	background-image: url(../../src/assets/images/td_no_agree.png);
	background-repeat: no-repeat;
	background-size: contain;
	float:left;
}
.sd_agree .td_agree{
	width:0.75rem;
	height:0.75rem;
	background-image: url(../../src/assets/images/td_agree.png);
	background-repeat: no-repeat;
	background-size: contain;
	float:left;
	/*margin-right:0.3rem;*/
	/*margin-left:3rem;*/
}
.sd_agree span{
	float:right;
	line-height:0.75rem;
	font-size:0.5rem;
}
    

</style>