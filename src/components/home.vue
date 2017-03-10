<template>
    <div class="container">
        <comp-header :header="header"></comp-header>
        <mt-swipe :auto="4000" class="image-group">
            <mt-swipe-item v-for="item in images" class="mt-swipe-item">

                <a v-if="item.url" :href="item.url">

                    <img v-bind:src="item.src">
                </a>
                <a v-if="item.type == 1"  @click="showMoreMsg_td(item.action_id)">
                    <img v-bind:src="item.src">
                </a>
                <a v-if="item.type == 0" @click="showMoreMsg_cf(item.action_id)">
                      <img v-bind:src="item.src">
                </a>
            </mt-swipe-item>
        </mt-swipe>
        <div class="footer-index">

            <!--积分众筹活动-->
            <div class="sy_jfzc">
                <a  @click="showMoreMsg_ac">
                    <img v-bind:src="events.src">
                </a>
            </div>
            <!--首页底部活动-->
            <div class="ys_footer clearfix">
                <div class="sy_lt">
                    <a @click="showMoreMsg_te" >
                        <img v-bind:src="dirve.src">
                    </a>
                </div>
                <div class="sy_rt">
                    <a @click="showMoreMsg_wa">
                        <img v-bind:src="translate.src">
                    </a>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    import CompHeader from './header.vue'
    export default {
        data() {
            return {
                header: {
                    title: "汽车频道",
                    login: "../../src/assets/images/ct_icon.png",
                    back: false
                },
                images: {},
                picImgs: {},
                events: {},
                dirve: {},
                translate: {},
                banks_id: ''
            }
        },
        components: {
            CompHeader,
        },
        mounted: function () {
            this.$nextTick(function () {
                var that = this;
                that.banks_id = that.$route.query.banks_id;
            
                window.localStorage.setItem("banks_id", that.banks_id);
                

                var banks_id =  window.localStorage.getItem('banks_id');

                 that.axios.get('http://bankhome.iwocar.com/ad_get', { params: { banks_id: banks_id, page: 'index', spot_type: 'banner' } }).then(response => {
                        // get body data
                        response = response.data;
                        that.images = response.list
                    }, response => {
                        // error callback
                    });
                    that.axios.get('http://bankhome.iwocar.com/ad_get', { params: { banks_id: banks_id, page: 'index', spot_type: 'gn' } }).then(response => {
                        // get body data
                        response = response.data;
                        that.picImgs = response.list
                        for (var value in that.picImgs) {
                            if (value == 1) {
                                that.events = that.picImgs[value];
                            } else if (value == 2) {
                                that.dirve = that.picImgs[value];
                            } else {
                                that.translate = that.picImgs[value];
                            }
                        }
                    }, response => {
                        // error callback
                    })
            })
        },
        methods: {
            showMoreMsg_cf: function (str) {
                window.localStorage.setItem("action_id_cf",str);
                const path = '/CFdetails/' + str
                this.$router.push({path: path})
              },
             showMoreMsg_td: function (str) {
                window.localStorage.setItem("action_id_td",str)
                const path = '/TDactive/' + str
                this.$router.push({path: path})
              },
               showMoreMsg_ac: function () {
                const path = '/accumulate'
                this.$router.push({path: path})
              },
               showMoreMsg_te: function () {
                const path = '/TestDrive'
                this.$router.push({path: path})
              },
               showMoreMsg_wa: function () {
                const path = '/waiting'
                this.$router.push({path: path})
              },
        }
    }

</script>

<style>
    .image-group {
        margin-top: 2.15rem;
    }

    .comp-foot {
        margin-top: 0.5rem;
    }


    .mint-swipe-items-wrap>div.mt-swipe-item,
    .image-group,
    .image-group img {
        width: 16rem;
        height: 9.4rem;
    }
    /*积分众筹活动*/

    .sy_jfzc {
        width: 16rem;
        height: 5.125rem;
        margin-top: 0.5rem;
    }

    .sy_jfzc a {
        display: block;
        width: 100%;
        height: 100%;
    }


    .sy_jfzc a img {
        width: 16rem;
        height: 5.125rem;
    }
    /*首页底部活动*/





    .ys_footer {
        /*width:16rem;
	height:7.45rem;*/
        margin-top: 0.375rem;
        margin-left: -1px;
    }





    .sy_lt {
        width: 8rem;
        height: 7.45rem;
        float: left;
        border-right: 1px solid #e6e6e6;
    }





    .sy_lt a {
        display: block;
        width: 100%;
        height: 100%;
    }





    .sy_lt a img {
        width: 8rem;
        height: 7.45rem;
    }





    .sy_rt {
        width: 8rem;
        height: 7.45rem;
        float: left;
    }





    .sy_rt a {
        display: block;
        width: 100%;
        height: 100%;
    }





    .sy_rt a img {
        width: 8rem;
        height: 7.45rem;
    }
</style>