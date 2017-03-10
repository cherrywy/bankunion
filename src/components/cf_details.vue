<template>
    <div id="cf_details" class="container">
        <comp-header :header="header"></comp-header>
        <div class="td_banner">
            <img :src="item.pic" />
            <a href="http://home.iwocar.com/video/video.html?url=${url}" class="cf_vd">
                <img src="../../src/assets/images/cf_vd_icon.png" />
            </a>
        </div>

        <!--众筹产品详情-->
        <div class="cf_pro_cots">
            <p class="cf_pro_cots_txt1">{{ item.title }}</p>
            <p class="cf_pro_cots_txt2">{{ item.intro }}</p>
            <p class="cf_pro_cots_txt3">第{{ item.now_round }}轮</p>
            <mt-progress :value="number_id" :bar-height="5" class="xs_bt">
                <div class="num_show" slot="start">{{number_id}}%</div>
            </mt-progress>
            <div class="xs_p_t clearfix">
                <p class="xs_p_t_txt1"><span class="hui_txt1">支持人数</span><span class="he_txt1">{{ item.round_people }}人</span></p>
                <p class="xs_p_t_txt2"><span class="hui_txt1">剩余时间</span><span class="he_txt1">{{ item.date }}天</span></p>
            </div>
        </div>
        <!--信息-->
        <div class="fb_mesg" v-if="item.if_author">
            <div class="fb_header">
                <img v-bind:src="item.author_pic">
            </div>
            <p class="fb_header_txt1">{{ item.author_name }}</p>
            <p class="fb_header_txt2">{{ item.author_intro }}</p>
        </div>
        <mt-navbar v-model="selected">
            <mt-tab-item id="detail">详情</mt-tab-item>
            <mt-tab-item id="progress">进展</mt-tab-item>
            <mt-tab-item id="rating">规则</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="detail">
                <div v-html="item.content"></div>
            </mt-tab-container-item>
            <mt-tab-container-item id="progress">
                <div class="time-xs" v-if="winners == ''">
                    <span>活动当前没有进展</span>
                </div>
                <div v-for="winner in item.winner">
                    <span class="time-xs_txt1">第{{winner.win_num}}轮</span>
                    <i class="time-xs_txt2"></i>
                    <span class="time-xs_txt3">{{ winner.create_time | moment }}</span><br>
                    <span class="time-xs_txt4">中奖人员</span><br>
                    <span class="time-xs_txt5">{{ winner.phone }}</span>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="rating">
                <p class="xxk_xq_b_gz">
                    <span>1.本次活动时间：{{item.action_start_time_formate}} 至 {{item.action_end_time_formate}}</span><br>
                    <span>2.本次活动，参加商品总数{{item.rounds}}</span><br>
                    <span>3.单次参加活动需要积分{{item.jifen}}</span><br>
                    <span v-if="item.xiangou == 0">4.本活动无限购次数</span><br>
                    <span v-if="item.xiangou != 0">4.单轮活动限购{{item.xiangou}}次</span>
                    <span>
						5.重复参与
						<template v-if="item.youhui">
						每轮参与优惠：{{item.youhui_rate}}% <br>
						最高优惠至：{{item.youhui_floor}}% <br>
						</template>
						<template v-else>
						无优惠
						</template>
						</span><br>
                    <span>
		                6.本次活动，中奖后，产品
						<template v-if="item.express">
						不包邮，邮寄费用{{item.express}}元，中奖以后{{item.express_long}}天后发送物流
						</template>
						<template v-else>
						快递费用由活动方负责
						</template>						
					</span>
                </p>
            </mt-tab-container-item>
        </mt-tab-container>
        <!--底部-->
        <div class="cf_xq_footer clearfix">
            <div class="xx_tx" v-if="item.notice == 1"  style="background-image:url(../../src/assets/images/tx2.png)"></div>
            <div class="xx_tx" v-else style="background-image:url(../../src/assets/images/tx.png)"></div>
            <div v-on:click="greet" class="xx_tx2">去众筹(积分 {{ item.jifen }})</div>
        </div>
    </div>
</template>

<script>
    import CompHeader from './header.vue'
    export default {
        name: 'cf_details',
        data() {
            return {
                item: [],
                winners: [],
                number_id:1,
                url: [],
                selected: "detail",
                header: {
                    title: "汽车手机掌控系统",
                    login: "../../src/assets/images/share_icon2.png",
                    back: true
                }
            }
        },
        components: {
            CompHeader,
        },
        created() {
            var action_id = window.localStorage.getItem("action_id_cf")
            var that = this;
            // GET /someUrl
            that.axios.get('http://bankhome.iwocar.com/ad_detail_get', { params: { ad_id: action_id, type: '0' } }).then(response => {
                // get body data
                response = response.data;
                that.item = response.detail
                that.winners = that.item.winner;
                that.number_id = parseInt(that.item.round_people / that.item.round_num * 100);
                that.url = that.item.video;
                that.item.content = that.item.content.replace(/height:[0-9]*px; width:[0-9]*px/, "");

            }, response => {
                // error callback
            })

        },
        methods: {
            greet: function () {
                var api_token =  window.localStorage.getItem('api_token');
                if (typeof (api_token) == 'undefined' || api_token == 'null') {
                      const path = '/login/login/'
                       this.$router.push({path: path})
                } else {
                     const path = '/zc_pay'
                     this.$router.push({path: path})
                }
            }
        }
    }

</script>


<style>
    .container {
        background: #fff;
    }
    
    .clearfix:after {
        display: block;
        content: '';
        clear: both;
    }
    
    .td_banner {
        position: relative;
    }
    
    .cf_vd {
        width: 2.3rem;
        height: 2.3rem;
        position: absolute;
        bottom: 0.65rem;
        left: 0.65rem;
        z-index: 99;
    }
    
    .cf_vd a {
        display: block;
        width: 100%;
        height: 100%;
    }
    
   .td_banner .cf_vd img {
        width: 2.3rem;
        height: 2.3rem
    }
    
    .cf_pro_cots {
        background: #fff;
        padding: 0.8rem 0.6rem;
        border-bottom: 1px solid #e0e0e0;
    }
    
    .cf_pro_cots_txt1 {
        font-size: 0.85rem;
        line-height: 1rem;
    }
    
    .cf_pro_cots_txt2 {
        font-size: 0.6rem;
        color: #999999;
        line-height: 1.1rem;
    }
    
    .cf_pro_cots_txt3 {
        font-size: 0.5rem;
        margin-top: 0.5rem;
    }
    
    .xs_bt {
        width: 85%;
        height: 0.2rem;
        border-radius: 0.2rem;
        margin-top: 0.4rem;
        position: relative;
    }
    
    .num_show {
        position: absolute;
        right: -1.5rem;
        top: -0.7rem;
    }
    
    .xs_tp {
        width: 1.7rem;
        height: 0.6rem;
        background: #508cee;
        border-radius: 0.6rem;
        position: absolute;
        right: 0;
        top: -0.2rem;
        text-align: center;
        line-height: 0.6rem;
        color: #fff;
    }
    
    .xs_p_t {
        margin-top: 0.85rem;
    }
    
    .xs_p_t_txt1 {
        width: 3rem;
        height: 2rem;
        float: left;
        text-align: center;
        margin-left: 1.75rem;
    }
    
    .xs_p_t_txt2 {
        width: 3rem;
        height: 2rem;
        float: left;
        text-align: center;
        margin-left: 5.55rem;
    }
    
    .hui_txt1 {
        display: block;
        color: #999;
        font-size: 0.5rem;
    }
    
    .he_txt1 {
        display: block;
        font-size: 0.75rem;
        margin-top: 0.5rem;
    }
    
    .fb_mesg {
        background: #fff;
        border-bottom: 1px solid #e0e0e0;
        padding-bottom: 0.3rem;
        padding-top: 0.6rem;
    }
    
    .fb_header {
        width: 2.75rem;
        height: 2.75rem;
        margin: 0 auto;
        border-radius: 50%;
    }
    
    .fb_header img {
        width: 2.75rem;
        height: 2.75rem;
    }
    
    .fb_header_txt1 {
        text-align: center;
        font-size: 0.7rem;
        line-height: 1.7rem;
    }
    
    .fb_header_txt2 {
        font-size: 0.6rem;
        line-height: 1.1rem;
        color: #999;
        padding: 0 0.75rem;
    }
    
    .mint-tab-container-item img {
        width: 14.8rem;
        text-align: center;
        margin: 1rem auto;
        display: block;
    }
    
    .mint-tab-container-item {
        height: 21.5rem;
        overflow: auto;
    }
    
    .time-xs span {
        display: block;
        text-align: center;
        margin-top: 2rem;
    }
    
    .xxk_xq_b_gz {
        width: 14.8rem;
        font-size: 0.5rem;
        line-height: 1.1rem;
        margin-left: 1rem;
    }
    .xx_tx{
	width:6.1rem;
	height:2.15rem;
	background-image: url(../../src/assets/images/tx.png);
	background-repeat: no-repeat;
	background-size: contain;
	float:left;
}
.xx_tx2{
	width:9.9rem;
	height:2.15rem;
	background:#508cee;
	color:#fff;
	text-align:center;
	line-height:2.15rem;
	font-size:0.8rem;
	float:left;
}

.xxk_xq_b_gz{
	width:14.8rem;
	font-size:0.5rem;
	line-height:1.1rem;
}

.xxk_xq_b .show{
	display: block;
}

.time-xs{
	width:14.8rem;
	padding:1rem 0;
	
}
.time-xs li{
	display: block;
	width:8.8rem;
	padding:0 3rem;
}
.time-xs .time-xs_txt1{
	font-size:0.65rem;
}
.time-xs li div{
	padding:1rem 0;
	border-left:0.1rem solid #01aaf6;
	position:relative;

}

.time-xs_txt1{
	position:absolute;
	top:-0.7rem;
	left:-2.5rem;
	font-size:0.65rem;
}
.time-xs_txt2{
	width:0.5rem;
	height:0.5rem;
	background-image: url(../../src/assets/images/ad_no.png);
	background-repeat: no-repeat;
	background-size: contain;
	position:absolute;
	top:-0.45rem;
	left:-0.3rem;
}
.time-xs_txt3{
	font-size:0.5rem;
	position:absolute;
	top:-0.5rem;
	left:0.5rem;
}
.time-xs_txt4{
	font-size:0.5rem;
	position:absolute;
	top:0.5rem;
	left:0.5rem;
}
.time-xs_txt5{
	font-size:0.5rem;
	position:absolute;
	top:1.5rem;
	left:0.5rem;
}

/*视频播放*/
.vd_cots{
	width:16rem; 
	height:8.05rem; 
	position:absolute; 
	top:50%; 
	left:0;  
	margin-top:-4rem;
	background: #000;
}
.vd_cots video{
	width:16rem; 
	height:8.05rem; 
}

</style>