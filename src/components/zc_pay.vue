<template>
    <div id="TestDrive" class="container">
        <div class="sy_box">
		 <comp-header :header="header"></comp-header>
			<!--地址详细信息-->
			<div class="set_cot">
				<a v-if="address.id" v-on:click="pageUpdate">
					<p>
						<span>收货人：<b>{{ address.receive_name }}</b></span><br>
						<span>联系电话：<b>{{ address.receive_phone }}</b></span><br>
						<span>收货地址：<b>{{ address.address }}</b></span><br>
					</p>
					<i class="set_link"></i>
				</a>
				<a v-else href="../address/ad_adds.html">
					<p>
						<span>收货人：<b>{{ address.receive_name }}</b></span><br>
						<span>联系电话：<b>{{ address.receive_phone }}</b></span><br>
						<span>收货地址：<b>{{ address.address }}</b></span><br>
					</p>
					<i class="set_link"></i>
				</a>
			</div>
			<!--产品信息-->
			<div class="set_pro clearfix">
				<img v-bind:src="item.pic">
				<div class="set_pro_cot">
					<p class="set_pro_cot_txt1">{{item.title}}</p>
					<p class="set_pro_cot_txt2"><b class="set_jf_dj">{{item.jifen}}</b>积分</p>
				</div>
			</div>
			<!--结算按钮-->
			<div class="set_btn">
				<div class="set_btn1">合计：<em class="set_jf">{{item.jifen}}</em><b> 积分</b></div>
				<div v-on:click="greet" class="set_btn2">去支付</div>
			</div>
		</div>
    </div>
</template>

<script>
    import CompHeader from './header.vue'
    import qs from 'querystring'
    export default {
        name: 'TestDrive',
        data() {
            return {
                item:[],
				address:[],
                header: {
                    title: "结算中心",
                    // login: "../../src/assets/images/ct_icon.png",
                    back: true
                }
            }
        },
        components: {
            CompHeader,
        },
        created() {
            var that = this;
            var action_id = window.localStorage.getItem("action_id_cf");
             var api_token = window.localStorage.getItem("api_token")
            console.log( action_id );
            
            that.axios.get('http://bankall.iwocar.com/ad_detail_get', { params: {ad_id: action_id,type:0} }).then(response => {
                // get body data
                response = response.data;
                that.items = response.detail
            
            }, response => {
                // error callback
            });
             that.axios.get('http://bankall.iwocar.com/address_get', { params: {api_token:api_token,type:2} }).then(response => {
                // get body data
                response = response.data;
                that.address = response.list
                   
            //    window.localStorage.setItem("address_id",that.address.id)
            }, response => {
                // error callback
            });
         
                 

        },
        methods: {
            
             pageUpdate: function() {
                 
					location.href="../address/address.html?action_id="+action_id;
				},
				backUpdate: function() {
					location.href="../CrowdFunding/cf_details.html?action_id="+action_id;
				},
                greet: function () {
                        var action_id = window.localStorage.getItem("action_id_cf")
                        var address_id = window.localStorage.getItem("address_id")
                        var api_token = window.localStorage.getItem("api_token")
                        this.axios.post('http://bankall.iwocar.com/user_login', qs.stringify({ ad_id: action_id,type:0,address_id:address_id,buy_num:1,api_token:api_token })).then(response => {
						// get body data
						response = response.data;
                        if(data.status == 1 ) {
								location.href="settlement_over.html";
							} else {
								//提示
							this.$toast({
								message: '支付失败',
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
/*众筹结算*/
.exg_adress{
	width:16rem;
	height:2.1rem;
	
}
.exg_adress_txt1{
	font-size:0.65rem;
	line-height:2.1rem;
	float: left;
}

.exg_adress_txt2{
	color: #808080;
	font-size:0.5rem;
	line-height:2.1rem;
	float: right;
	margin-right:1rem;
}

.set_link2{
	width:1.5rem;
	height:1.5rem;
	background-image: url(../../src/assets/images/set_link_icon.png);
	background-repeat: no-repeat;
	background-size: contain;
	position:absolute;
	top:0.55rem;
	right:0.55rem;
}

</style>