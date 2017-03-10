<template>
    <div id="TestDrive" class="container">
        <div class="sy_box">
		 <comp-header :header="header"></comp-header>
			<!--我的我的众筹-->
			<ul class="td_ms_cot">
				<li class="clearfix" v-for="item in items">
					<img v-bind:src="item.pic">
					<div class="td_ms_cots">
						<p v-if="item.name">姓名：{{item.name}}</p>
						<p v-if="item.phone">手机号码：{{item.phone}}</p>
                        <div v-for="model in item.models" >
						<p style="white-space: nowrap; overflow:hidden; text-overflow:ellipsis;" :salt="model.car">试驾型号：{{model.car}}</p>
                        </div>
                        <p>{{item.created_at}}</p>
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
                    title: "我的试驾",
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
            that.axios.get('http://bankall.iwocar.com/user_actions', { params: { banks_id: banks_id,api_token:api_token, type:1} }).then(response => {
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
  /*我的试驾*/
.td_ms_cot{
	margin-top:2.15rem;
	padding:0.75rem 0.6rem;
	border-bottom: 1px solid #d9d9d9;
}
.td_ms_cot li img{
	width:7.1rem;
	height:3.7rem;
	float:left;
}
.td_ms_cots{
	width:7rem;
	height:3.75rem;
	float:right;
	/*background-color: #CCCCCC;*/
}
.td_ms_cots p{
	line-height:1rem;
	font-size:0.5rem;
	color:#494949;
}
</style>