<template>
    <div id="TestDrive" class="container">
        <div class="sy_box">
		 <comp-header :header="header"></comp-header>
			  <mt-swipe :auto="4000" class="image-group">
            <mt-swipe-item  v-for="banner in banners" class="mt-swipe-item">
                       <a v-if="banner.url" :href="banner.url">
							<img v-bind:src="banner.src">
		            	</a>
						<a v-if="banner.type>= 0" @click="showMoreMsg_td( banner.action_id )">

							<img v-bind:src="banner.src">
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
					<a v-else="tj_head.action_id"  @click="showMoreMsg_td( tj_head.action_id)">
						<img v-bind:src="tj_head.src">
						<i class="bp_icon"></i>
					</a>
				</li>
				<li class="cf_pro2">
					<a v-if="tj_left.url" :href="tj_left.url">
						<img v-bind:src="tj_left.src">
						<i class="bp_icon"></i>
					</a>
					<a v-else="tj_left.action_id" @click="showMoreMsg_td(tj_left.action_id)">
						<img v-bind:src="tj_left.src">
						<i class="bp_icon"></i>
					</a>
				</li>
				<li class="cf_pro3">
					<a v-if="tj_right.url" :href="tj_right.url">
						<img v-bind:src="tj_right.src">
						<i class="bp_icon"></i>
					</a>
					<a v-else="tj_right.action_id" @click="showMoreMsg_td( tj_right.action_id )">
						<img v-bind:src="tj_right.src">
						<i class="bp_icon"></i>
					</a>
				</li>
			</ul>
			<!--所有试驾-->
			<div class="all_pro">
				<h2>所有试驾</h2>
			</div>
			<!--试驾列表-->
			<ul class="all_pro_cot2">
				<li v-for="list in lists">
					<a @click="showMoreMsg_td(list.action_id )">
						<img v-bind:src="list.src">
					</a>
				</li>
			</ul>
		</div>
    </div>
</template>

<script>
    import CompHeader from './header.vue'
    export default {
        name: 'TestDrive',
        data() {
            return {
                banners:[],
                tj_head:[],
			    tj_left:[],
			    tj_right:[],
                lists:{},
                header: {
                    title: "试驾活动",
                    login: "../../src/assets/images/ct_icon.png",
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
            that.axios.get('http://bankall.iwocar.com/ad_get', { params: { banks_id: banks_id,page:'td', spot_type:'banner' } }).then(response => {
                // get body data
                response = response.data;
                that.banners = response.list
            
            }, response => {
                // error callback
            });
              that.axios.get('http://bankall.iwocar.com/ad_get', { params: { banks_id: banks_id,page:'td', spot_type:'tj' } }).then(response => {
                // get body data
                response = response.data;
                var test = response.list
					for (var value in test) {
						if(value == 1) {
							that.tj_head = test[value];
						} else if(value == 2) {
							that.tj_left = test[value];
						} else {
							that.tj_right = test[value];
						}
					}
            }, response => {
                // error callback
            });
             that.axios.get('http://bankall.iwocar.com/ad_get', { params: { banks_id: banks_id,page:'td', spot_type:'list' } }).then(response => {
                // get body data
                response = response.data;
                that.lists = response.list
					
            }, response => {
                // error callback
            })

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
    .clearfix:after {
        display: block;
        content: '';
        clear: both;
    }
    /*试驾活动*/
    
    .td_banner {
        width: 16rem;
        height: 12.75rem;
        margin-top: 2.15rem;
    }
    
    .td_banner img {
        width: 16rem;
        height: 12.75rem;
    }
    
    .td_xq_cot {
        margin-top: 0.5rem;
        width: 16rem;
        padding: 0.75rem 0;
        background-color: #fff;
    }
    
    .td_irc_icon1 {
        width: 0.5rem;
        height: 0.5rem;
        background-image: url(../../src/assets/images/irc_icon.png);
        background-repeat: no-repeat;
        background-size: contain;
        float: left;
        margin-top: 0.2rem;
        margin-left: 0.65rem;
        margin-right: 0.3rem;
    }
    
    .td_xq_cot_txt1 {
        font-size: 0.75rem;
        color: #494949;
    }
    
    .td_xq_cot_txt2 {
        width: 13.3rem;
        padding: 0 1.35rem;
        font-size: 0.5rem;
        line-height: 1rem;
        color: #494949;
        margin-top: 0.5rem;
    }
    
    .td_btn1 {
        display: block;
        width: 7.5rem;
        height: 1.5rem;
        text-align: center;
        line-height: 1.5rem;
        font-size: 0.75rem;
        margin: 0 auto;
        margin-top: 0.75rem;
    }
</style>