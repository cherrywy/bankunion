<template>
    <div id="PersonCenter" class="container">
        <comp-header :header="header"></comp-header>
        <!--个人中心banner-->
        <div class="pc_banner">
            <div class="pic_header">
                <a @click=" showMoreMsg_pd">
                    <img src="../../src/assets/images/pic_header.jpg" />
                    <span>编辑</span>
                </a>

            </div>
            <p>您好<span>{{phone}}</span></p>
        </div>
        <div>
        <mt-cell title="我的众筹" to="/mine/cf_mine" is-link value="">
        <img slot="icon" src="../../src/assets/images/cf_icon.png" width="24" height="24">
        </mt-cell>
        <mt-cell title="我的试驾" to="/mine/td_mine" is-link value="">
        <img slot="icon" src="../../src/assets/images/td_icon.png" width="24" height="24">
        </mt-cell>
        <mt-cell title="消息中心" to="/mine/pc_news" is-link value="">
        <img slot="icon" src="../../src/assets/images/new_icon.png" width="24" height="24">
        </mt-cell>
        <mt-cell title="收货地址" to="/ad_Administration" is-link value="">
        <img slot="icon" src="../../src/assets/images/ad_icon.png" width="24" height="24">
        </mt-cell>
        </div>
    </div>
</template>

<script>
 
    import CompHeader from './header.vue'
    export default {
        name: 'PersonCenter',
        data() {
            return {
                phone:'',
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
          this.phone=localStorage.getItem('phone');
        },
        methods: {
            
              showMoreMsg_pd: function () {
                const path = '/pc_personal_data'
                this.$router.push({path: path})
              },
        }
    }

</script>

<style>
/*个人中心*/
.mint-cell-title img{
    margin: 0 0.5rem;
}
.pc_banner{
	width:16rem;
	height:8.2rem;
	background-image: url(../../src/assets/images/pc_banner.jpg);
	background-repeat: no-repeat;
	background-size: contain;
	margin-top:2.15rem;
	overflow: hidden;
}
.pic_header{
	width:4.75rem;
	height:4.75rem;
	border:0.3rem solid #fff;
	border-radius: 50%;
	margin:0 auto;
	margin-top:1rem;
	overflow: hidden;
}
.pic_header a{
	display:block;
	width:100%;
	height:100%;
	position:relative;
}
.pic_header img{
	width:4.75rem;
	height:4.75rem;
}
.pic_header a span{
	position:absolute;
	top:3.8rem;
	left:1.8rem;
	color:#fff;
	font-size:0.5rem;
	color:#999999;
}
.pc_banner p{
	text-align:center;
	margin-top:0.5rem;
	color:#fff;
	font-size:0.75rem;
}

</style>