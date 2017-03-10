<template>
    <div id="td_active" class="container">
        <comp-header :header="header"></comp-header>
        <div class="td_banner">
            <img :src="item.pic" />
        </div>
        <div class="td_xq_cot">
            <h2 class="clearfix">
                <i class="td_irc_icon1"></i>
                <span class="td_xq_cot_txt1" v-html="item.title"></span>
            </h2>
            <p class="td_xq_cot_txt2" v-html="item.content">

            </p>
            <div class="td_btn1">试驾兑换</div>
        </div>
        <div class="td_xq_cot">
            <h2 class="clearfix">
                <i class="td_irc_icon1"></i>
                <span class="td_xq_cot_txt1">活动细节</span>
            </h2>
            <p class="td_xq_cot_txt2" v-html="item.detail">

            </p>
        </div>
    </div>
</template>

<script>
    import CompHeader from './header.vue'
    export default {
        name: 'td_active',
        data() {
            return {
                item: [],
                header: {
                    title: "试驾活动",
                    login: "../../src/assets/images/share_icon2.png",
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
            // GET /someUrl
            that.axios.get('http://bankhome.iwocar.com/ad_detail_get', { params: { ad_id: ad_id, type: '1' } }).then(response => {
                // get body data
                response = response.data;
                that.item = response.detail
                response.detail.content = response.detail.content.replace(/height:[0-9]*px; width:[0-9]*px/, "width: 13.3rem");
                response.detail.detail = response.detail.detail.replace(/height:[0-9]*px; width:[0-9]*px/, "width: 13.3rem");
            }, response => {
                // error callback
            });
            that.axios.get('http://bankhome.iwocar.com/ad_get', { params: { banks_id: '3', page: 'index', spot_type: 'gn' } }).then(response => {
                // get body data
                response = response.data;
                that.picImgs = response.list
            }, response => {
                // error callback
            })

        },
        methods: {
        }
    }

</script>


<style>
    * {
        padding: 0;
        margin: 0;
    }
    
    html {
        font-size: 20px;
        font-family: "Microsoft YaHei";
        background-color: #f2f2f2;
    }
    
    .td_banner {
        width: 16rem;
        height: 12.75rem;
        margin-top: 2.15rem;
    }
    
    .td_banner img {
        width: 16rem;
        height: 12.75rem;
    }
    
    img {
        vertical-align: top;
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
        font-size: 0.37rem;
        line-height: 1rem;
        color: #494949;
        margin-top: 0.5rem;
    }
    
    .td_btn1 {
        width: 7.5rem;
        height: 1.5rem;
        background: #00aaf6;
        text-align: center;
        line-height: 1.5rem;
        color: #fff;
        font-size: 0.75rem;
        border-radius: 0.3rem;
        margin: 0 auto;
        margin-top: 0.75rem;
    }
</style>