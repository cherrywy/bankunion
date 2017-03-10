<template>
	<div id="address" class="container">
		<comp-header :header="header"></comp-header>
		<!--地址管理-->
		<ul class="ad_cot">
			<li v-for="item in items">
				<p class="ad_cot_txt1 clearfix"><span class="ad_usename">{{item.receive_name}}</span><span class="ad_phones">{{item.receive_phone}}</span></p>
				<p class="ad_cot_txt2"><span>{{item.address}}</span> <span>{{item.postcode}}</span></p>
				<p class="ad_cot_txt3 clearfix">
					<i v-if="item.status == 0" v-on:click="defaultAddressUpdate(item.id)" class="ad_default" style="background-image:url(../../src/assets/images/default2.png)"></i>
					<i v-if="item.status == 1" v-on:click="defaultAddressUpdate(item.id)" class="ad_default" style="background-image:url(../../src/assets/images/default.png)"></i>
					<i class="ad_delet" v-on:click="addressDelete(item.id)"></i>
					<i class="ad_edit" v-on:click="addressPost(item.id)"></i>
				</p>
			</li>
		</ul>
		<p class="ad_cot_txt4 clearfix">
			<a @click="showMoreMsg_ad">
				<span>添加收货地址</span>
				<i class="ad_add"></i>
			</a>
		</p>
	</div>
</template>

<script>
	import CompHeader from './header.vue'
	import qs from 'querystring'
	export default {
		name: 'address',
		data() {
			return {
				items: [],
				header: {
					title: "地址管理",
					back: true
				},

			}
		},
		components: {
			CompHeader,
		},
		created() {
	     var that = this;
	     var api_token=window.localStorage.getItem('api_token');
			that.axios.get('http://bankhome.iwocar.com/address_get',
				{
					params:
					{
						api_token:api_token,
						type: '1'
					}
				})
				.then(response => {
					// get body data
					response = response.data;
					that.items = response.list
			

				}, response => {
					// error callback
				})

		},
		methods: {
              showMoreMsg_ad: function () {
                const path = '/address'
                this.$router.push({path: path})
              },

			  defaultAddressUpdate: function (id) {
				   var api_token=window.localStorage.getItem('api_token');
				   
				  this.axios.post('http://bankall.iwocar.com/default_address_update', qs.stringify({
					   api_token:api_token,
						address_id:id 
					})).then(response => {
						self.location.reload();
							// window.location.href=document.referrer;
							// location.replace(document.referrer);
						
					}, response => {
						// error callback
					})
				},
				addressPost: function (id) {
					location.href="./update_adds?id="+id;
				},
				addressDelete: function (id) {
					var api_token=window.localStorage.getItem('api_token');
					window.localStorage.setItem('address_id',id);
					this.axios.post('http://bankall.iwocar.com/address_delete', qs.stringify({
					    api_token:api_token,
						address_id:id 
					})).then(response => {
						self.location.reload();
					}, response => {
						// error callback
					})
				}
		}
	}

</script>

<style>
	/*地址管理*/

	.container {
		background-color: #f2f2f2;
	}

	.ad_cot {
		margin-top: 2.15rem;
	}

	.ad_usename {
		font-size: 0.6rem;
		float: left;
	}

	.ad_phones {
		font-size: 0.5rem;
		float: right;
	}

	.ad_cot li {
		margin-bottom: 0.4rem;
	}

	.ad_cot_txt1 {
		padding: 0 0.5rem;
		background: #fff;
		padding-top: 0.4rem;
	}

	.ad_cot_txt2 {
		font-size: 0.5rem;
		padding: 0.5rem 0.5rem;
		background: #fff;
		margin-bottom: 1px;
		/*padding-top:0.4rem;*/
	}

	.ad_cot_txt3 {
		padding: 0.4rem 0.5rem;
		background: #fff;
	}

	.ad_default {
		width: 3.25rem;
		height: 1.25rem;
		background-image: url(../../src/assets/images/default2.png);
		background-repeat: no-repeat;
		background-size: contain;
		float: left;
	}

	.ad_edit {
		width: 2rem;
		height: 1.25rem;
		background-image: url(../../src/assets/images/edit_icon.png);
		background-repeat: no-repeat;
		background-size: contain;
		float: right;
	}

	.ad_delet {
		width: 2rem;
		height: 1.25rem;
		background-image: url(../../src/assets/images/delet_icon.png);
		background-repeat: no-repeat;
		background-size: contain;
		float: right;
		margin-left: 0.6rem;
	}


	.ad_cot_txt4 {
		width: 15rem;
		height: 1.5rem;
		padding: 0.4rem 0.5rem;
		background: #fff;
		font-size: 0.6rem;
	}

	.ad_cot_txt4 a {
		display: block;
		width: 100%;
		height: 100%;
	}

	.ad_cot_txt4 a span {
		float: left;
		line-height: 1.5rem;
		color: #333;
	}

	.ad_add {
		width: 1.5rem;
		height: 1.5rem;
		background-image: url(../../src/assets/images/ad_add_icon.png);
		background-repeat: no-repeat;
		background-size: contain;
		float: right;
	}
</style>