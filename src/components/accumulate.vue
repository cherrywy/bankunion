<template>
  <div id="accumulate" class="container">
   <comp-header :header="header"></comp-header>
    <mt-swipe :auto="4000" class="image-group">
      <mt-swipe-item v-for="banner in banners" class="mt-swipe-item">
        <a v-if="banner.url" :href="banner.url">
     
          <img :src="banner.src"/>
        </a>
        <a v-if="banner.type == 0" @click="showMoreMsg_cf(banner.action_id)">
     
          <img :src="banner.src"/>
        </a>
      </mt-swipe-item>
    </mt-swipe>
     <!--众筹产品展示-->
			<ul class="cf_product clearfix">
				<li class="cf_pro1">
					<a v-if="tj_head.url" :href="tj_head.url">
						<img v-bind:src="tj_head.src">
						<i class="bp_icon"></i>
					</a>
					<a v-else="tj_head.action_id" @click="showMoreMsg_cf(tj_head.action_id)">
						<img v-bind:src="tj_head.src">
						<i class="bp_icon"></i>
					</a>
				</li>
				<li class="cf_pro2">
					<a v-if="tj_left.url" :href="tj_left.url ">
						<img v-bind:src="tj_left.src">
						<i class="bp_icon"></i>
					</a>
					<a v-else="tj_left.action_id"  @click="showMoreMsg_cf(tj_left.action_id)">
						<img v-bind:src="tj_left.src">
						<i class="bp_icon"></i>
					</a>
				</li>
				<li class="cf_pro3">
					<a v-if="tj_right.url" :href="tj_right.url">
						<img v-bind:src="tj_right.src">
						<i class="bp_icon"></i>
					</a>
					<a v-else="tj_right.action_id" @click="showMoreMsg_cf(tj_right.action_id )" >
						<img v-bind:src="tj_right.src">
						<i class="bp_icon"></i>
					</a>
				</li>
			</ul>
			<!--所有商品-->
			<div class="all_pro">
				<h2>所有商品</h2>
				<ul class="all_pro_cot">
					<li v-for="list in lists">
						<a   @click="showMoreMsg_cf(list.action_id)"  class="clearfix">
							<img v-bind:src="list.src">
							<div class="all_pro_xx">
								<h2 class="all_pro_tit">{{list.title}}</h2>
								<p class="all_pro_tit2"><span>{{list.jifen}}</span> 积分</p>
								<p class="all_pro_tit3">第{{list.now_round}}轮</p>
                <mt-progress :value="parseInt(list.round_people/list.round_num*100)" :bar-height="5" class="xs_bt">
                <div class="num_show" slot="start">{{parseInt(list.round_people/list.round_num*100)}}%</div>
            </mt-progress>
								<div class="all_pro_tit4">
									<i class="all_pro_tit4_pic1"></i>
									<span class="all_pro_tit4_cot1"><b>{{ list.round_people }}</b>人</span>
									<i class="all_pro_tit4_pic2"></i>
									<span class="all_pro_tit4_cot2"><b>{{ list.date }}</b>天</span>
								</div>
							</div>
						</a>
					</li>
				</ul>
			</div>
  </div>
</template>
<script>
  import CompHeader from './header.vue'

  export default {
     name: 'accumulate',
    data() {
      return {
       header: {
          title: "积分众筹",
          login: "../../src/assets/images/ct_icon.png",
          back: true
        },
        banners: {},
        picImgs:[],
        tj_head:[],
		   	tj_left:[],
		  	tj_right:[],
        lists:[]

      }
    },
     components: {
      CompHeader,

    },
    created() {
      var that = this;

      // GET /someUrl
        that.axios.get('http://bankhome.iwocar.com/ad_get', { params: { banks_id: '3', page:'cf', spot_type: 'banner' } }).then(response => {
        // get body data
        response = response.data;
        that.banners = response.list
      }, response => {
        // error callback
      });
         that.axios.get('http://bankhome.iwocar.com/ad_get', { params: { banks_id: '3', page: 'cf', spot_type:'tj' } }).then(response => {
        // get data data
        response = response.data;
        that.picImgs = response.list
         for (var value in that.picImgs) {
						if(value == 1) {
							 that.tj_head = that.picImgs[value];
						} else if(value == 2) {
							 that.tj_left = that.picImgs[value];
						} else {
							 that.tj_right = that.picImgs[value];
						}
					}
      }, response => {
        // error callback
      });
         that.axios.get('http://bankhome.iwocar.com/ad_get', { params: { banks_id: '3', page: 'cf', spot_type:'list' } }).then(response => {
        // get data data
        response = response.data;
        that.lists = response.list;
        
      }, response => {
        // error callback
      })


    },
    methods: {
            showMoreMsg_cf: function (str) {
			    window.localStorage.setItem("action_id_cf",str);
                const path = '/CFdetails/' + str
                this.$router.push({path: path})
              },
    }
  }

</script>

<style>
 .num_show {
        position: absolute;
        right: -1rem;
        top: -0.7rem;
        font-size:0.2rem;
    }
    .xs_bt {
    width: 80%;
    height: 0.2rem;
    border-radius: 0.2rem;
    margin-top: 0.4rem;
    position: relative;
}
/*众筹产品展示*/
.cf_product{
	margin-top:0.15rem;
}
.cf_pro1{
	width:6.5rem;
	height:6.875rem;
	float:left;
}
.cf_pro1 a{
	display: block;
	width:100%;
	height:100%;
	position: relative;
}
.cf_pro1 a img{
	width:6.5rem;
	height:6.875rem;
}
.cf_pro2{
	width:9.3rem;
	height:3.375rem;
	float:right;
}
.cf_pro2 a{
	display: block;
	width:100%;
	height:100%;
	position: relative;
}
.cf_pro2 a img{
	width:9.3rem;
	height:3.375rem;
}
.cf_pro3{
	width:9.3rem;
	height:3.375rem;
	float:right;
	margin-top:0.15rem;
}
.cf_pro3 a{
	display: block;
	width:100%;
	height:100%;
	position: relative;
}
.cf_pro3 a img{
	width:9.3rem;
	height:3.375rem;
}
.bp_icon{
	width:1.25rem;
	height:1.35rem; 
	background-image: url(../../src/assets/images/bp_icon.png);
	background-repeat: no-repeat;
	background-size: contain;
	position:absolute;
	top:0;
	left:0;
}
.hb_icon{
	width:1.25rem;
	height:1.35rem; 
	background-image: url(../../src/assets/images/hb_icon.png);
	background-repeat: no-repeat;
	background-size: contain;
	position:absolute;
	top:0;
	left:0;
}
/*所有商品*/
.all_pro{
	width:14.8rem;
	margin-top:0.75rem;
	padding:0 0.6rem;
}
.all_pro h2{
	line-height:1.8rem;
	font-size:0.5rem;
	color:#494949;
	/*border-bottom:1px solid #ccc;*/
}
.all_pro_cot li{
	padding:0.5rem 0;
	border-top:1px solid #ccc;
}
.all_pro_cot li a{
	display:block;
	width:100%;
	height:100%;
}
.all_pro_cot li a img{
	width:7.25rem;
	height:5.45rem;
	float:left;
}
.all_pro_cot2 li{
	width:16rem;
	height: 5.15rem;
	margin-bottom:0.25rem;
}
.all_pro_cot2 li a{
	display:block;
	width:100%;
	height: 100%;
}
.all_pro_cot2 li img{
	width:16rem;
	height: 5.15rem;
}

.all_pro_xx{
	width:7rem;
	height:5.5rem;
	/*background:#ccc;*/
	float:right;
	position:relative;
}
.all_pro_xx .all_pro_tit{
	width:7rem;
	white-space:nowrap; 
	overflow:hidden; 
	text-overflow:ellipsis;
	font-size:0.55rem;
	color:#494949;
	line-height:1.85rem;
	border-bottom: none;
}
.all_pro_tit2{
	font-size:0.4rem;
	color:#494949;
}
.all_pro_tit2 span{
	color:#db1c1c;
	font-size:0.6rem;
}
.all_pro_tit3{
	margin-top:0.5rem;
	font-size:0.4rem;
	color:#494949;
}
.hd_bt{
	width:6rem;
	height:0.125rem;
	background:#eee;
	position: absolute;
	top:4rem;
	left:0;
	border-radius: 0.125rem;
}
.hd_tp{
	width:3rem;
	height:0.125rem;
	background: -webkit-linear-gradient(left, #6acafc 0%,#4d8de5 100%);
	background: linear-gradient(to right, #6acafc 0%,#4d8de5 100%);
	position: absolute;
	top:4rem;
	left:0;
	border-radius: 0.125rem;
}
.hd_tt{
	width:1rem;
	height:0.5rem;
	border-radius: 0.2rem;
	background:dodgerblue;
	position:absolute;
	top:-0.1875rem;
	right:-0.8rem;
	color:#fff;
	text-align:center;
	line-height:0.5rem;
	font-size: 0.3rem;
}
.all_pro_tit4_pic1{
	display: block;
	width:0.75rem;
	height:0.75rem;
	background-image: url(../../src/assets/images/per_icon.png);
	background-repeat: no-repeat;
	background-size: contain;
	margin-top:0.8rem;
	float:left;
	margin-left:0.3rem;
}
.all_pro_tit4_cot1{
	margin-top:0.8rem;
	/*display: inline-block;*/
	float:left;
	color:#999;
	margin-left:0.1rem;
  font-size: 0.5rem;
}
.all_pro_tit4_pic2{
	display: block;
	width:0.75rem;
	height:0.75rem;
	background-image: url(../../src/assets/images/time_icon.png);
	background-repeat: no-repeat;
	background-size: contain;
	margin-top:0.8rem;
	float:left;
	margin-left:1rem;
}
.all_pro_tit4_cot2{
	margin-top:0.8rem;
	/*display: inline-block;*/
  float:left;
	color:#999;
	margin-left:0.1rem;
  font-size: 0.5rem;
}
</style>