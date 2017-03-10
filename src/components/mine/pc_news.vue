<template>
    <div id="TestDrive" class="container">
        <div class="sy_box">
		 <comp-header :header="header"></comp-header>
			<!--消息内容-->
			<ul class="pc_news">
				<li v-for="item in items">
					<p>{{item.content}}</p>
					<p class="pc_news_txt1">{{item.created_at}}</p>
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
                    title: "消息中心",
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
            
              var api_token =  window.localStorage.getItem('api_token');
            that.axios.get('http://bankall.iwocar.com/notice_get', { params: { api_token:api_token } }).then(response => {
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
.pc_news{
	font-size:0.65rem;
	/*padding:0 0.5rem;*/
	margin-top:2.15rem;
}
.pc_news li{
	padding:0.5rem 0.5rem;
	border-bottom: 1px solid #d9d9d9;
}
.pc_news li p{
	padding:0 0.5rem;
	line-height:1rem;
}
.pc_news_txt1{
	text-align: right;
	margin-top:0.3rem;
}
</style>