<template>
    <div id="TestDrive" class="container">
        <div class="sy_box">
		 <comp-header :header="header"></comp-header>
			<!--我的我的众筹-->
			<ul class="cf_ms_cot">
				<li class="clearfix" v-for="item in items">
					<div class="cf_pro_pic1">
						<img v-bind:src="item.pic" />
						<p class="cf_bt"></p>
						<p v-if="item.win_status == 0" class="cf_bt_txt">未揭晓</p>
						<p v-if="item.win_status == 1" class="cf_bt_txt">已揭晓</p>
						<i v-if="item.status == 4" class="cf_icon_j"></i>
						<i v-if="item.status != 4" class="cf_icon_j2"></i>
					</div>
					<div class="cf_ms_cots">
						<p>
							<span class="cf_ms_cots_txt1">【第{{item.join_round}}轮】{{item.title}}</span>
							<span class="cf_ms_cots_txt2" >本轮已参与<b>{{item.join_people}}</b>人</span><br>
							<span v-if="item.win_status == 0" class="cf_ms_cots_txt3">获得者：未揭晓</span>
							<span v-if="item.win_status == 1" class="cf_ms_cots_txt2">获得者：<a :href="'cf_mine_details.html?ad_id'+item.ad_id&'round'+item.join_round">点击查看</a></span><br>
							<span class="cf_ms_cots_txt4">参与时间：{{item.join_time}}</span><br>
						</p>
					</div>
				</li>
			</ul>
		</div>
    </div>
</template>

<script>
    import CompHeader from '../header.vue'
    export default {
        name: 'TestDrive',
        data() {
            return {
                items: [],
                header: {
                    title: "我的众筹",
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
             var banks_id =  window.localStorage.getItem('banks_id');
              var api_token =  window.localStorage.getItem('api_token');
            that.axios.get('http://bankall.iwocar.com/user_actions', { params: { banks_id: banks_id,api_token:api_token, type:0 } }).then(response => {
                // get body data
                response = response.data;
                that.items = response.list
            
            }, response => {
                // error callback
            });

        },
        methods: {
              showMoreMsg_td: function (str) {
                window.localStorage.setItem("action_id_td",str)
                const path = '/TDactive/' + str
                this.$router.push({path: path})
              }
           
        }
    }

</script>


<style>
    /*我的众筹*/
.cf_ms_cot{
	margin-top:2.15rem;
	/*padding:0.75rem 0.6rem;*/
	/*border-bottom: 1px solid #d9d9d9;*/
}
.cf_ms_cot li{
	/*margin-top:2.15rem;
	padding:0.75rem 0.6rem;*/
	padding: 0.5rem 0.6rem;
	border-bottom: 1px solid #d9d9d9;
}
.cf_pro_pic1 img{
	width:6.65rem;
	height:5.25rem;
}
.cf_ms_cots{
	width:7.5rem;
	height:5.25rem;
	float:right;
	/*background-color: #CCCCCC;*/
}
.cf_ms_cots p{
	line-height:0.9rem;
	font-size:0.5rem;
	color:#494949;
}
.cf_pro_pic1{
	width:6.65rem;
	height:5.25rem;
	float:left;
	position: relative;
}
.cf_pro_pic1 .cf_bt{
	width:100%;
	height:0.85rem;
	background-color: #fff;
	opacity: 0.3;
	position:absolute;
	bottom:0;
	left:0;
	z-index: 4;
	color:#fff;
}
.cf_pro_pic1 .cf_bt_txt{
	width:100%;
	height:0.85rem;
	position:absolute;
	bottom:0;
	left:0;
	z-index: 5;
	color:#fff;
	text-align:center;
	line-height: 0.85rem;
}
.cf_ms_cots .cf_ms_cots_txt1{
	display: -webkit-box;
	-webkit-box-orient:
	vertical;-webkit-line-clamp: 2;
	overflow: hidden;
	/*background:#ccc;*/
	font-size: 0.65rem;
	line-height:0.9rem;

}
.cf_icon_j{
	width:1.925rem;
	height:1.775rem;
	background-image: url(../../../src/assets/images/cf_icon_j.png);
	background-repeat: no-repeat;
	background-size: contain;
	position:absolute;
	top:0;
	left:0;
}

.cf_ms_cots .cf_ms_cots_txt2 a{
	color:#ff0000;
}
.cf_icon_j2{
	width:1.925rem;
	height:1.775rem;
	background-image: url(../../../src/assets/images/cf_icon_j2.png);
	background-repeat: no-repeat;
	background-size: contain;
	position:absolute;
	top:0;
	left:0;
}
.cf_vd{
	width:2.3rem;
	height:2.3rem;
	position:absolute;
	bottom:0.65rem;
	left:0.65rem;
	z-index: 99;
}
.cf_vd a{
	display:block;
	width:100%;
	height:100%;
}
.cf_vd img{
	width:2.3rem;
	height:2.3rem
}
.cf_mine_detial_txt{
	font-size: 0.65rem;
	line-height:3rem;
	padding:0 0.65rem;
	color:#999;
	border-bottom: 1px solid #D9D9D9;
}
.cf_mine_detial_txt2{
	font-size: 0.65rem;
	line-height:3rem;
	padding:0 0.65rem;
	color:#999;
	/*border-bottom: 1px solid #D9D9D9;*/
}
.cf_btn{
	width:16rem;
	height:2.125rem;
	background-color: #00aaf6;
	text-align:center;
	line-height:2.125rem;
	color:#fff;
	font-size:0.7rem;
	position: fixed;
	bottom:0;
	left:0;
}
</style>