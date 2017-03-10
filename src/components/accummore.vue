<template>
  <mt-loadmore class="loadmore" :top-method="loadTop" @top-status-change="handleTopChange">
   	<ul >
					<li v-for="list in lists">
						<a class="more-content">
							<img v-bind:src="list.src">
							<div >
								<h2  >{{list.title}}</h2>
								<p><span>{{list.jifen}}</span> 积分</p>
								<p >第{{list.now_round}}轮</p>
								<!--<div class="hd_bt"></div>-->
								<div  >
									<div >{{parseInt(list.round_people/list.round_num*100)}}%</div>
								</div>
								<div >
									<i ></i>
									<span ><b>{{ list.round_people }}</b>人</span>
									<i ></i>
									<span ><b>{{ list.date }}</b>天</span>
								</div>
							</div>
						</a>
					</li>
				</ul>
    <div slot="top" class="mint-loadmore-top">
      <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
      <span v-show="topStatus === 'loading'">Loading...</span>
    </div>
  </mt-loadmore>
</template>
<script>
  export default {
    data() {
      return {
        topStatus: '',
        lists:{},
        // ...
      };
    },
     created() {
      var that = this;

      // GET /someUrl
        that.axios.get('http://bankhome.iwocar.com/ad_get', { params: { banks_id: '3', page:'cf',	spot_type:'list'} }).then(response => {
        // get body data
        response = response.body;
        that.lists = response.list
        // console.log(response.list+"???????");
      }, response => {
        // error callback
      });
    

    },
    methods: {
      handleTopChange(status) {
        this.topStatus = status;
      },
      // ...
    },
    // ...
  };
</script>
<style>
.loadmore{
  width:100%;
}
li{
      list-style-type: none;

}
.more-content{
  width:100%;
  display: flex;
   flex-direction: row;
}
.more-content img{
  width:500px;
  height:300px;
  margin: 20px;
}
.more-content h2 {
    width: 368px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 20px;
    color: #494949;
    line-height: 20px;
    border-bottom: none;
}
</style>